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

// Create connection for db
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306,
});

// Query options
const login_query = "SELECT * FROM logins";

// Handles (get) requests of users attempting to login
app.get("/api/login", async (req, res) => {
  try {
    const result = await connection.query(login_query);
    res.json(result[0]);
  } catch (err) {
    console.log("Error found: \n" + err);
  }
});

// Handles posts request of users attempting to create accounts
app.post("/api/create", async (req, res) => {
  const { email, password } = req.body;
  const create_query = `INSERT INTO logins VALUES ("${email}", "${password}")`;

  try {
    await connection.query(create_query);
    res.json({
      success: true,
      message: "Account created, you will now be logged in",
    });
  } catch (err) {
    // Email already exists
    if (err.code === "ER_DUP_ENTRY") {
      res.json({
        success: false,
        message: "An account with that email already exists",
      });
    }

    console.log("Error found: \n" + err);
  }
});

app.listen(PORT, () => {
  console.log(`\nServer is running at http://localhost:${PORT}`);
});
