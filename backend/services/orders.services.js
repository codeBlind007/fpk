import pool from "../database/db.js";

const calculateSummary = async (userId, items) => {
  let totalAmount = 0;
  let detailedItems = [];

  for (let item of items) {
    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error("Quantity must be a positive integer");
    }

    const result = await pool.query(
      `Select id, name, price, stock_quantity from products where id = $1`,
      [item.product_id],
    );

    const product = result.rows[0];

    if (!product) throw new Error("Product not found");

    if (product.stock_quantity < quantity) {
      throw new Error(`Insufficient stock for product ${product.name}`);
    }

    const itemTotal = Number(product.price) * quantity;

    totalAmount += itemTotal;

    detailedItems.push({
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      itemTotal,
    });
  }

  return {
    items: detailedItems,
    totalAmount,
  };
};

const createOrder = async (userId, data) => {
  const { shipping_address, items } = data;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    let totalAmount = 0;

    for (let item of items) {
      const result = await client.query(
        `SELECT id, name, price, stock_quantity FROM products WHERE id = $1`,
        [item.product_id],
      );

      const product = result.rows[0];

      if (!product) throw new Error("Product not found");

      if (product.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      totalAmount += product.price * item.quantity;
    }

    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_amount, shipping_address) 
       VALUES ($1, $2, $3) RETURNING *`,
      [userId, totalAmount, shipping_address],
    );

    const order = orderResult.rows[0];

    for (let item of items) {
      const result = await client.query(
        `SELECT id, price, stock_quantity FROM products WHERE id = $1`,
        [item.product_id],
      );

      const product = result.rows[0];

      // Insert order item
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) 
         VALUES ($1, $2, $3, $4)`,
        [order.id, item.product_id, item.quantity, product.price],
      );

      // Update stock
      await client.query(
        `UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2`,
        [item.quantity, item.product_id],
      );
    }

    await client.query("COMMIT");

    return order;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const fetchOrderById = async (orderId, userId) => {
  const order = await pool.query(
    `select o.id, o.total_amount, o.shipping_address, o.created_at, json_agg(json_build_object('product_id', oi.product_id, 'quantity', oi.quantity, 'price', oi.price_at_purchase)) as items
     from orders o
     join order_items oi on o.id = oi.order_id
     where o.id = $1 and o.user_id = $2
     group by o.id`,
    [orderId, userId],
  );

  return order.rows[0] || null;
};

const orderServices = {
  calculateSummary,
  createOrder,
  fetchOrderById,
};

export default orderServices;
