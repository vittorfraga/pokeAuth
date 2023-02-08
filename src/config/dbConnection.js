require("dotenv").config();
const { Pool } = require("pg");

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error(`Failed to connect to the database: ${err}`);
    process.exit(1);
  } else {
    console.log("Successfully connected to the database.");
  }
});

module.exports = db;
