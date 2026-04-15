import pool from "../database/db.js";

const getProducts = async () => {
  const result = await pool.query(`Select * from products`);
  const products = result.rows;

  return products;
};

const getProductById = async (id) => {
  const result = await pool.query(
    `SELECT p.*, 
    json_agg(DISTINCT pi.*) AS images, 
    json_agg(DISTINCT ps.*) AS specs
    FROM products AS p
    LEFT JOIN product_images AS pi ON p.id = pi.product_id
    LEFT JOIN product_specs AS ps ON p.id = ps.product_id
    WHERE p.id = $1
    GROUP BY p.id`,
    [id],
  );
  const product = result.rows[0];
  return product;
};

const filterProductsByCategory = async (category) => {
  const result = await pool.query(
    `Select * from products where category = $1`,
    [category],
  );
  const products = result.rows;
  console.log(products);
  return products;
};

const searchProducts = async (name) => {
  const products = await pool.query(
    `Select * from products where name ILIKE $1`,
    [`%${name}%`],
  );
  return products.rows;
};

export const productServices = {
  getProducts,
  getProductById,
  filterProductsByCategory,
  searchProducts,
};
