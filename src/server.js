/**************************************************************************
 * server.js
 **************************************************************************/

import "dotenv/config";
import mysql from "mysql2/promise";
import express from "express";
import cors from "cors";

// Set up server
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

// Test query
const query = "SELECT * FROM logins";

app.get("/api/hello", async (req, res) => {
  try {
    const result = await connection.query(query);
    res.json(result[0]);
  } catch (err) {
    console.log("Error found: \n" + err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Create connection for db
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306,
});

function get_handle() {
  // Run query
  console.log("Testing query\n");
  try {
    const results = connection.query(query);
    return results;
  } catch (err) {
    console.log("Query error:\n", err);
  }
}

// Close connection
// console.log("\nQuery finished. Closing connection...");
// connection.end((err) => {
//   if (err) {
//     console.log("Error closing connection:\n", err);
//   }
//   console.log("Connection closing successfully");
// });
