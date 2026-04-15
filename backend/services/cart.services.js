import pool from "../database/db";

const getCartItems = async (userId) => {
  const result = await pool.query(
    `select * from products as p join cart_items as ci on p.id = ci.product_id where ci.user_id = $1`,
    [userId],
  );
  const cartItems = result.rows;
  return cartItems;
};


export const cartServices = {
    getCartItems,
}
