/**************************************************************************
 * server.js
 **************************************************************************/

import "dotenv/config";
import mysql from "mysql2/promise";

// Test query
const query = "SELECT * FROM table1";

// Create connection for db
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306,
});

// Establish connection
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to RDS:\n", err.code, "\n", err.message);
    return;
  }
  console.log("Connection successful...\n");
});

// Run query
console.log("Testing query\n");
try {
  const [results] = await connection.query(query);
  console.log(results[0]);
} catch (err) {
  console.log("Query error:\n", err);
}

// Close connection
console.log("\nQuery finished. Closing connection...");
connection.end((err) => {
  if (err) {
    console.log("Error closing connection:\n", err);
  }
  console.log("Connection closing successfully");
});
