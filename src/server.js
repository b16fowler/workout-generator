/**************************************************************************
 * server.js
 **************************************************************************/

import "dotenv/config";
import mysql from "mysql2/promise";
import express, { response } from "express";
import cors from "cors";
import multer from "multer";

import fs from "fs";

// Set up server
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

// Middleware for photo uploads
const upload = multer({ storage: multer.memoryStorage() });

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

app.post("/api/add", upload.single("image"), async (req, res) => {
  // buffer object for user's uploaded picture
  const photo = req.file.buffer;
  const info = req.body;

  const sql = "INSERT INTO user_exercises VALUES (?, ?, ?, ?, ?, ?);";
  const values = [info.user, info.name, info.type, info.sets, info.reps, photo];

  try {
    const [result] = await connection.execute(sql, values);
    console.log("[SUCCESS] Image inserted into DB", result);
    res.json({ message: "Photo uploaded successfully." });
  } catch (err) {
    console.log("[ERROR] Error trying to run query", err);
    console.error(err);
  }
  console.log("End of post handler...");
});

// Handles get requests of users attempting to login
app.get("/api/login", async (req, res) => {
  console.log("User attempting login...");
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

// Handles post requests of users generating a workout
app.post("/api/generate", async (req, res) => {
  const create_table_query = `SELECT name, type, sets, reps FROM user_exercises WHERE user = "${req.body.user}" AND type IN (${req.body.selectedTypes})`;

  try {
    const result = await connection.query(create_table_query);
    res.json({
      success: true,
      exercises: result,
    });
  } catch (err) {
    console.error("Error fetching data:\n", err);
  }
});

// Handles post requests of users generating a workout (retrieves images)
app.post("/api/photos", async (req, res) => {
  try {
    const picQuery = `SELECT pic FROM user_exercises WHERE user = "${req.body.user}" AND name = "${req.body.exerciseName}";`;
    const response = await connection.query(picQuery);
    const buffer = response[0][0].pic;
    const blob = new Blob([buffer], { type: "image/png" });

    res.set("Content-Type", blob.type);
    res.send(buffer);
  } catch (err) {
    console.error("Error fetching data:\n", err);
  }
});

// Handles post requests of users loading their exercise table
app.post("/api/create-table", async (req, res) => {
  const create_table_query = `SELECT * FROM user_exercises WHERE user = "${req.body.user}"`;
  try {
    const result = await connection.query(create_table_query);
    res.json({
      success: true,
      exercises: result,
    });
  } catch (err) {
    console.error("Error fetching data:\n", err);
  }
});

// Handles post requests of users adding a new exercise
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
