import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",         
  host: "localhost",
  database: "ecommerce",     
  password: "newpassword",
  port: 5432,
});

export default pool;