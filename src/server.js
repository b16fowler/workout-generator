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
const login_query = "SELECT * FROM logins;";

// Handles get requests of users attempting to login
app.get("/api/login", async (req, res) => {
  try {
    const result = await connection.query(login_query);
    res.json(result[0]);
  } catch (err) {
    console.log("Error found: \n" + err);
  }
});

// Handles posts request of users attempting to create accounts
app.post("/api/create-account", async (req, res) => {
  try {
    // Creates new entry in logins if username is unique
    await connection.query(req.body.query);
    res.json({
      success: true,
    });
  } catch (err) {
    // username already exists
    if (err.code === "ER_DUP_ENTRY") {
      res.json({
        success: false,
        message: "An account with that username already exists",
      });
    }
    console.log("Error found:\n" + err);
  }
});

// Handles post requests of users loading their exercise table
app.post("/api/create-table", async (req, res) => {
  const create_table_query = `SELECT * FROM user_exercises WHERE user = "${req.body.user}"`;
  try {
    const result = await connection.query(create_table_query);
    console.log(result);
    res.json({
      success: true,
      exercises: result,
    });
  } catch (err) {
    console.error("Error fetching data:\n", err);
  }
});

// Handles post requests of users trying to add a new exercise
app.post("/api/add", async (req, res) => {
  try {
    await connection.query(req.body.query);
    res.json({
      success: true,
      message: "New exercise added successfully",
    });
  } catch (err) {
    console.log("Error found:\n" + err);
    res.json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`\nServer is running at http://localhost:${PORT}`);
});
