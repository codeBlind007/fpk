import pool from "../database/db.js";

export async function connectDB() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("DB Connected:", res.rows[0]);
  } catch (err) {
    console.error(err);
  }
}
