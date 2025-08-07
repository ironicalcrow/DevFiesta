const mysql = require("mysql2/promise");
require("dotenv").config();

const dataConfiguration = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};
const pool = mysql.createPool(dataConfiguration);
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Connected to MySQL database successfully!");
    connection.release();
  } catch (error) {
    console.error("❌ Failed to connect to MySQL database:", error.message);
    process.exit(1); 
  }
};

module.exports = { pool, testConnection };
