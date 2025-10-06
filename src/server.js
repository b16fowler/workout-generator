/**************************************************************************
 * server.js
 **************************************************************************/

import "dotenv/config";
import mysql from "mysql2/promise";
import express, { response } from "express";
import cors from "cors";
import multer from "multer";

// Set up server
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

// Middleware for photo uploads
const upload = multer({ storage: multer.memoryStorage() });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get("/", (req, res) => {
  res.send("Server is running\n");
});

app.listen(PORT, () => {
  console.log(`\nServer is running\n`);
});

// Handles get requests of users attempting to login
app.get("/api/login", async (req, res) => {
  console.log(`\nLOGIN ATTEMPT\nUser attempting login from ip: ${req.ip}\n`);
  const login_query = "SELECT * FROM logins;";
  try {
    const result = await pool.query(login_query);
    res.json(result[0]);
    console.log(`[SUCCESS] login query run successfully\n`);
  } catch (err) {
    console.log(`[ERROR] Error running login query\n` + err + "\n");
  }
  console.log("End of get handler\n");
});

// Handles posts request of users attempting to create accounts
app.post("/api/create-account", async (req, res) => {
  console.log("\nCREATE ACCOUNT ATTEMPT\n");
  try {
    // Creates new entry in logins if username is unique
    await pool.query(req.body.query);
    res.json({ success: true });
    console.log(`[SUCCESS] login information inserted into DB\n`);
  } catch (err) {
    // username already exists
    if (err.code === "ER_DUP_ENTRY") {
      res.json({
        success: false,
        message: "An account with that username already exists",
      });
      console.log(
        `Attempted username "${req.body.user}" already in DB, prompting user to try again\n`
      );
    } else {
      console.log(
        `[ERROR] Error trying to run insert query for user ${req.body.user}\n` +
          err +
          "\n"
      );
    }
  }
  console.log("End of post handler\n");
});

// Handles post requests to check user's account type upon signing in
app.post("/api/check-account-type", async (req, res) => {
  console.log("\nCHECK ACCOUNT TYPE ATTEMPT\n");
  const checkAccountQuery = `SELECT type FROM logins WHERE username = "${req.body.user}";`;
  try {
    const result = await pool.query(checkAccountQuery);
    res.json({ account: result });
    console.log("[SUCCESS] Type of account fetched successfully\n");
  } catch (err) {
    console.log("[ERROR] Error fetching account information\n" + err + "\n");
  }
  console.log("End of post handler\n");
});

// Handles post requests of users generating a work (image)
app.post("/api/add", upload.single("image"), async (req, res) => {
  console.log("\nUPLOAD IMAGE ATTEMPT\n");
  // buffer object for user's uploaded picture
  const photo = req.file.buffer;
  const info = req.body;

  const sql = "INSERT INTO user_exercises VALUES (?, ?, ?, ?, ?, ?);";
  const values = [info.user, info.name, info.type, info.sets, info.reps, photo];

  try {
    const [result] = await pool.execute(sql, values);
    res.json({ message: "Photo uploaded successfully" });
    console.log(`[SUCCESS] Image inserted into DB\n`);
  } catch (err) {
    console.log(`[ERROR] Error trying to run insert query\n` + err + "\n");
  }
  console.log("End of post handler\n");
});

// Handles post requests of users generating a workout (non-image)
app.post("/api/generate", async (req, res) => {
  console.log("\nGENERATE WORKOUT ATTEMPT (exercise info)\n");
  const create_table_query = `SELECT name, type, sets, reps FROM user_exercises WHERE user = "${req.body.user}" AND type IN (${req.body.selectedTypes})`;
  try {
    const result = await pool.query(create_table_query);
    res.json({
      success: true,
      exercises: result,
    });
    console.log(
      `[SUCCESS] Exercise rows for user ${req.body.user} pulled from DB\n`
    );
  } catch (err) {
    console.log(
      `[ERROR] Error fetching user ${req.body.user}'s data\n` + err + "\n"
    );
  }
  console.log("End of post handler\n");
});

// Handles post requests of users generating a workout (retrieves images)
app.post("/api/photos", async (req, res) => {
  console.log("\nGENERATE WORKOUT ATTEMPT (exercise image(s))\n");
  try {
    const picQuery = `SELECT pic FROM user_exercises WHERE user = "${req.body.user}" AND name = "${req.body.exerciseName}";`;
    const response = await pool.query(picQuery);
    const buffer = response[0][0].pic;
    const blob = new Blob([buffer], { type: "image/png" });

    res.set("Content-Type", blob.type);
    res.send(buffer);
    console.log(`[SUCCESS] Image for user ${req.body.user} pulled from DB\n`);
  } catch (err) {
    console.log(
      `[ERROR] Error fetching user ${req.body.user}'s exercise image\n` +
        err +
        "\n"
    );
  }
  console.log("End of post handler\n");
});

// Handles post requests of users loading their exercise table
app.post("/api/create-table", async (req, res) => {
  console.log("\nLOAD EXERCISE TABLE ATTEMPT\n");
  const create_table_query = `SELECT * FROM user_exercises WHERE user = "${req.body.user}"`;
  try {
    const result = await pool.query(create_table_query);
    res.json({
      success: true,
      exercises: result,
    });
    console.log(`[SUCCESS] User ${req.body.user}'s exercises pulled from DB\n`);
  } catch (err) {
    console.log(
      `[ERROR] Error fetching  user ${req.body.user}'s exercise data\n` +
        err +
        "\n"
    );
  }
  console.log("End of post handler\n");
});

// Handles post requests of users adding a new exercise
app.post("/api/add", async (req, res) => {
  console.log("\nADD EXERCISE ATTEMPT\n");
  try {
    await pool.query(req.body.query);
    res.json({
      success: true,
      message: "New exercise added successfully",
    });
    console.log(`[SUCCESS] User ${req.body.user}'s exercise added to DB\n`);
  } catch (err) {
    res.json({ success: false });
    console.log(
      `[ERROR] Error posting user ${req.body.user}'s exercise\n` + err + "\n"
    );
  }
  console.log("End of post handler\n");
});

// Handles post requests of admin searching for user to reset password
app.post("/api/search", async (req, res) => {
  console.log("\nSEARCH USER ATTEMPT\n");
  const searchQuery = `SELECT username FROM logins WHERE username = "${req.body.user}"`;
  try {
    await pool.query(searchQuery);
    res.json({
      success: true,
    });
    console.log(`[SUCCESS] User ${req.body.user} exists in database\n`);
  } catch (err) {
    res.json({ success: false });
    console.log(
      `[ERROR] Error searching for user ${req.body.user} in database\n` +
        err +
        "\n"
    );
  }
  console.log("End of post handler\n");
});

// Handles post requests after admin confirms password reset of a user
app.post("/api/reset", async (req, res) => {
  console.log("\nRESET PASSWORD ATTEMPT\n");
  const resetQuery = `UPDATE logins SET password = "${req.body.user}" WHERE username = "${req.body.user}"`;
  try {
    await pool.query(resetQuery);
    res.json({ success: true });
    console.log(`[SUCCESS] User ${req.body.user}'s password has been reset\n`);
  } catch (err) {
    res.json({ success: false });
    console.log(
      `[ERROR] Error resetting ${req.body.user}'s password\n` + err + "\n"
    );
  }
  console.log("End of post handler\n");
});

// Handles get requests of admin viewing table of users
app.get("/api/user-table", async (req, res) => {
  console.log("\nCREATE USER TABLE ATTEMPT\n");
  const userTableQuery = "SELECT username FROM logins;";
  try {
    const userList = await pool.query(userTableQuery);
    res.json({ userList: userList[0], success: true });
    console.log("[SUCCESS] userTableQuery run successfully\n");
  } catch (err) {
    res.json({ success: false });
    console.log(
      "[ERROR] Error in selecting users from database\n" + err + "\n"
    );
  }
  console.log("End of get handler\n");
});
