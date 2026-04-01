import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "saas_db",
  password: process.env.DB_PASS || "",
  port: process.env.DB_PORT || 5432,
});

pool.connect()
  .then(() => console.log("PostgreSQL connected ✅"))
  .catch(err => console.log("DB Error:", err.message));
