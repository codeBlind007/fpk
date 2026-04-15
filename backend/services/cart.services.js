import pool from "../database/db.js";

const getCartItems = async (userId) => {
  const result = await pool.query(
    `select * from products as p join cart_items as ci on p.id = ci.product_id where ci.user_id = $1`,
    [userId],
  );
  const cartItems = result.rows;
  return cartItems;
};

const addToCart = async (userId, productId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const stockResult = await client.query(
      `SELECT stock_quantity FROM products WHERE id = $1`,
      [productId]
    );

    const product = stockResult.rows[0];

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock_quantity <= 0) {
      throw new Error("Product is out of stock");
    }

    const result = await client.query(
      `INSERT INTO cart_items (user_id, product_id, quantity)
       VALUES ($1, $2, 1)
       RETURNING *`,
      [userId, productId]
    );

    await client.query("COMMIT");

    return {
      message: "Item added to cart",
      item: result.rows[0],
      alreadyInCart: false
    };

  } catch (err) {
    await client.query("ROLLBACK");

    if (err.code === "23505") {
      return {
        message: "Item already in cart",
        alreadyInCart: true
      };
    }

    throw err;

  } finally {
    client.release();
  }
};

const updateCartItem = async (userId, cartId, quantity) => {
  const product = await pool.query(
    `Select id, product_id from cart_items where user_id = $1 and id = $2`,
    [userId, cartId],
  );
  if (product.rowCount === 0) {
    throw new Error("Item not found in cart");
  }

  const productId = product.rows[0].product_id;

  const stockQuantity = await pool.query(`Select stock_quantity from products where id = $1`, [productId]);

  if (quantity > stockQuantity.rows[0].stock_quantity) {
    throw new Error("Requested quantity exceeds stock");
  }

  const result = await pool.query(
    `update cart_items set quantity = $1 where user_id = $2 and id = $3 returning *`,
    [quantity, userId, cartId],
  );
  const cartItem = result.rows[0];
  return cartItem;
};

const removeFromCart = async (userId, cartId) => {

  const product = await pool.query(
    `Select id from cart_items where user_id = $1 and id = $2`,
    [userId, cartId],
  );

  if(product.rowCount === 0){
    throw new Error("Item not found in cart");
  }

  const result = await pool.query(
    `delete from cart_items where user_id = $1 and id = $2 returning *`,  [userId, cartId]);

  const deletedItem = result.rows[0];
  return deletedItem;
}


const cartSummary = async(userId) => {
  const result = await pool.query(
    `select sum(p.price * ci.quantity) as total_price, sum(ci.quantity) as total_items from products as p join cart_items as ci on p.id = ci.product_id where ci.user_id = $1`,
    [userId],
  );
  const summary = result.rows[0];
  return summary;
}


export const cartServices = {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  cartSummary
};
