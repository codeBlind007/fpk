import pool from "../database/db.js";

const addToWishlist = async (userId, productId) => {
  try {
    const result = await pool.query(
      `INSERT INTO wishlist (user_id, product_id)
       VALUES ($1, $2)
       RETURNING *`,
      [userId, productId],
    );

    return {
      message: "Added to wishlist",
      item: result.rows[0],
      alreadyExists: false,
    };
  } catch (err) {
    if (err.code === "23505") {
      return {
        message: "Already in wishlist",
        alreadyExists: true,
      };
    }

    throw err;
  }
};

const removeFromWishlist = async (userId, productId) => {
  const result = await pool.query(
    `DELETE FROM wishlist 
     WHERE user_id = $1 AND product_id = $2`,
    [userId, productId],
  );

  if (result.rowCount === 0) {
    throw new Error("Item not found in wishlist");
  }
};

const getWishlist = async (userId) => {
  const result = await pool.query(
    `
    SELECT 
      w.product_id,
      w.created_at,

      p.name,
      p.price,

      pi.image_url

    FROM wishlist w
    JOIN products p ON p.id = w.product_id

    LEFT JOIN LATERAL (
      SELECT image_url
      FROM product_images
      WHERE product_id = p.id
      LIMIT 1
    ) pi ON true

    WHERE w.user_id = $1
    ORDER BY w.created_at DESC
    `,
    [userId],
  );

  return result.rows;
};

export const wishlistService = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
