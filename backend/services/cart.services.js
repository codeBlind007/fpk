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

    const normalizedProductId = Number(productId);
    if (!Number.isInteger(normalizedProductId) || normalizedProductId <= 0) {
      throw new Error("Invalid product ID");
    }

    const stockResult = await client.query(
      `SELECT stock_quantity FROM products WHERE id = $1`,
      [normalizedProductId],
    );

    const product = stockResult.rows[0];

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock_quantity <= 0) {
      throw new Error("Product is out of stock");
    }

    const existingCartItemResult = await client.query(
      `SELECT
         COALESCE(SUM(quantity), 0)::int AS total_quantity,
         ARRAY_AGG(id ORDER BY id) AS cart_item_ids
       FROM cart_items
       WHERE user_id = $1 AND product_id = $2`,
      [userId, normalizedProductId],
    );

    const existingCartSummary = existingCartItemResult.rows[0] ?? {
      total_quantity: 0,
      cart_item_ids: null,
    };

    const totalQuantity = Number(existingCartSummary.total_quantity ?? 0);
    const cartItemIds = Array.isArray(existingCartSummary.cart_item_ids)
      ? existingCartSummary.cart_item_ids.filter((id) => typeof id === "number")
      : [];

    if (totalQuantity > 0 && cartItemIds.length > 0) {
      const nextQuantity = totalQuantity + 1;

      if (nextQuantity > product.stock_quantity) {
        throw new Error("Requested quantity exceeds stock");
      }

      const primaryCartItemId = cartItemIds[0];
      const duplicateCartItemIds = cartItemIds.slice(1);

      const updatedResult = await client.query(
        `UPDATE cart_items
         SET quantity = $1, updated_at = NOW()
         WHERE id = $2
         RETURNING *`,
        [nextQuantity, primaryCartItemId],
      );

      if (duplicateCartItemIds.length > 0) {
        await client.query(
          `DELETE FROM cart_items
           WHERE id = ANY($1::int[])`,
          [duplicateCartItemIds],
        );
      }

      await client.query("COMMIT");

      return {
        message: "Item quantity updated in cart",
        item: updatedResult.rows[0],
        alreadyInCart: true,
      };
    }

    const result = await client.query(
      `INSERT INTO cart_items (user_id, product_id, quantity)
       VALUES ($1, $2, 1)
       RETURNING *`,
      [userId, normalizedProductId],
    );

    await client.query("COMMIT");

    return {
      message: "Item added to cart",
      item: result.rows[0],
      alreadyInCart: false,
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const updateCartItem = async (userId, cartId, quantity) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const normalizedQuantity = Number(quantity);
    if (!Number.isInteger(normalizedQuantity) || normalizedQuantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    const cartItemResult = await client.query(
      `SELECT id, product_id
       FROM cart_items
       WHERE user_id = $1 AND id = $2
       FOR UPDATE`,
      [userId, cartId],
    );

    if (cartItemResult.rowCount === 0) {
      throw new Error("Item not found in cart");
    }

    const productId = cartItemResult.rows[0].product_id;

    const stockResult = await client.query(
      `SELECT stock_quantity FROM products WHERE id = $1`,
      [productId],
    );

    const stockQuantity = Number(stockResult.rows[0]?.stock_quantity ?? 0);

    if (normalizedQuantity > stockQuantity) {
      throw new Error("Requested quantity exceeds stock");
    }

    const duplicateRowsResult = await client.query(
      `SELECT id
       FROM cart_items
       WHERE user_id = $1 AND product_id = $2
       ORDER BY id ASC
       FOR UPDATE`,
      [userId, productId],
    );

    const duplicateIds = duplicateRowsResult.rows
      .map((row) => row.id)
      .filter((id) => id !== Number(cartId));

    const updatedResult = await client.query(
      `UPDATE cart_items
       SET quantity = $1, updated_at = NOW()
       WHERE user_id = $2 AND id = $3
       RETURNING *`,
      [normalizedQuantity, userId, cartId],
    );

    if (duplicateIds.length > 0) {
      await client.query(`DELETE FROM cart_items WHERE id = ANY($1::int[])`, [
        duplicateIds,
      ]);
    }

    await client.query("COMMIT");
    return updatedResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const removeFromCart = async (userId, cartId) => {
  const product = await pool.query(
    `Select id from cart_items where user_id = $1 and id = $2`,
    [userId, cartId],
  );

  if (product.rowCount === 0) {
    throw new Error("Item not found in cart");
  }

  const result = await pool.query(
    `delete from cart_items where user_id = $1 and id = $2 returning *`,
    [userId, cartId],
  );

  const deletedItem = result.rows[0];
  return deletedItem;
};

const cartSummary = async (userId) => {
  const result = await pool.query(
    `select sum(p.price * ci.quantity) as total_price, sum(ci.quantity) as total_items from products as p join cart_items as ci on p.id = ci.product_id where ci.user_id = $1`,
    [userId],
  );
  const summary = result.rows[0];
  return summary;
};

export const cartServices = {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  cartSummary,
};
