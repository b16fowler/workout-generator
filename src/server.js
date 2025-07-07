/**************************************************************************
 * server.js
 **************************************************************************/

import "dotenv/config";
import mysql from "mysql2/promise";

const query = "SELECT * FROM table1";

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to RDS:\n", err.code, "\n", err.message);
    return;
  }
  console.log("Connection successful...");
});

console.log("Testing query\n");
try {
  const [results] = await connection.query(query);
  console.log(results[0]);
} catch (err) {
  console.log(err);
}

console.log("\nQuery finished. Closing connection...");
connection.end((err) => {
  if (err) {
    console.log("Error closing connection: ", err);
  }
  console.log("Connection closing successfully");
});
