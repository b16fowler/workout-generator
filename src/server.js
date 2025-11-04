/**************************************************************************
 * server.js
 **************************************************************************/

import "dotenv/config";
import mysql from "mysql2/promise";
import express from "express";
import cors from "cors";
import multer from "multer";

// Set up server
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());
app.set("trust proxy", true);

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
  res.send(`Server is running\nget request from IP ${req.ip}`);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`\nBackend is listening on port ${PORT}\n`);
});

// Handles get requests of users attempting to login
app.get("/api/login", async (req, res) => {
  console.log(`\nLOGIN ATTEMPT\nUser attempting login from ip: ${req.ip}\n`);
  const rawIP = req.ip || req.socket.remoteAddress;
  console.log("rawIP:\n");
  console.log(rawIP);

  const login_query = "SELECT * FROM logins;";
  try {
    const result = await pool.query(login_query);
    console.log(`[SUCCESS] login query run successfully\n`);
    res.json(result[0]);
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
      console.log(
        `Attempted username "${req.body.user}" already in DB, prompting user to try again\n`
      );
      res.json({
        success: false,
        message: "An account with that username already exists",
      });
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
    console.log("[SUCCESS] Type of account fetched successfully\n");
    res.json({ account: result });
  } catch (err) {
    console.log("[ERROR] Error fetching account information\n" + err + "\n");
  }
  console.log("End of post handler\n");
});

// Handles post requests of users generating a workout (non-image)
app.post("/api/generate", async (req, res) => {
  console.log("\nGENERATE WORKOUT ATTEMPT (exercise info)\n");
  const create_table_query = `SELECT name, type, sets, reps FROM user_exercises WHERE username = "${req.body.user}" AND type IN (${req.body.selectedTypes})`;
  try {
    const result = await pool.query(create_table_query);
    console.log(
      `[SUCCESS] Exercise rows for user ${req.body.user} pulled from DB\n`
    );
    res.json({
      success: true,
      exercises: result,
    });
  } catch (err) {
    console.log(
      `[ERROR] Error fetching user ${req.body.user}'s data\n` + err + "\n"
    );
    res.json({
      success: false,
    });
  }
  console.log("End of post handler\n");
});

// Handles post requests of users generating a workout (retrieves images)
app.post("/api/photos", async (req, res) => {
  console.log("\nGENERATE WORKOUT ATTEMPT (exercise image(s))\n");
  try {
    const picQuery = `SELECT pic FROM user_exercises WHERE username = "${req.body.user}" AND name = "${req.body.exerciseName}";`;
    const response = await pool.query(picQuery);
    const buffer = response[0][0].pic;
    const blob = new Blob([buffer], { type: "image/png" });

    console.log(`[SUCCESS] Image for user ${req.body.user} pulled from DB\n`);
    res.set("Content-Type", blob.type);
    res.send(buffer);
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
  const create_table_query = `SELECT * FROM user_exercises WHERE username = "${req.body.user}"`;
  try {
    const result = await pool.query(create_table_query);
    console.log(`[SUCCESS] User ${req.body.user}'s exercises pulled from DB\n`);
    res.json({
      success: true,
      exercises: result,
    });
  } catch (err) {
    console.log(
      `[ERROR] Error fetching user ${req.body.user}'s exercise data\n` +
        err +
        "\n"
    );
  }
  console.log("End of post handler\n");
});

// Handles post requests of users adding an exercise (image)
app.post("/api/add", upload.single("image"), async (req, res) => {
  console.log("\nUPLOAD IMAGE ATTEMPT\n");
  // buffer object for user's uploaded picture
  const photo = req.file.buffer;
  const info = req.body;

  const sql = "INSERT INTO user_exercises VALUES (?, ?, ?, ?, ?, ?);";
  const values = [info.user, info.name, info.type, info.sets, info.reps, photo];

  try {
    await pool.execute(sql, values);
    console.log(`[SUCCESS] Image inserted into DB\n`);
    res.json({ message: "Photo uploaded successfully" });
  } catch (err) {
    console.log(`[ERROR] Error trying to run insert query\n` + err + "\n");
  }
  console.log("End of post handler\n");
});

// Handles post requests of admin searching for user to reset password or delete account
app.post("/api/search", async (req, res) => {
  console.log("\nSEARCH USER ATTEMPT\n");
  const searchQuery = `SELECT username FROM logins WHERE username = "${req.body.user}"`;
  try {
    const searchResponse = await pool.query(searchQuery);
    if (searchResponse[0][0].username)
      console.log("searchResponse[0][0].username is not null");
    console.log(`[SUCCESS] User ${req.body.user} exists in database\n`);
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(
      `[ERROR] Error searching for user ${req.body.user} in database\n` +
        err +
        "\n"
    );
    res.json({ success: false });
  }
  console.log("End of post handler\n");
});

// Handles post requests after admin confirms password reset of a user
app.post("/api/reset", async (req, res) => {
  console.log("\nRESET PASSWORD ATTEMPT\n");
  const resetQuery = `UPDATE logins SET password = "${req.body.user}" WHERE username = "${req.body.user}"`;
  try {
    await pool.query(resetQuery);
    console.log(`[SUCCESS] User ${req.body.user}'s password has been reset\n`);
    res.json({ success: true });
  } catch (err) {
    console.log(
      `[ERROR] Error resetting ${req.body.user}'s password\n` + err + "\n"
    );
    res.json({ success: false });
  }
  console.log("End of post handler\n");
});

// Handles post requests after admin confirms to delete user's account
app.post("/api/delete", async (req, res) => {
  console.log("\nDELETE ACCOUNT ATTEMPT\n");
  const deleteLogins = `DELETE FROM logins WHERE username = "${req.body.user}"`;
  const deleteExercises = `DELETE FROM user_exercises WHERE username = "${req.body.user}"`;
  try {
    await pool.query(deleteLogins);
    await pool.query(deleteExercises);
    console.log("[SUCCESS] User's account deleted successfully\n");
    res.json({ success: true });
  } catch (err) {
    console.log("[ERROR] Error deleting account\n" + err + "\n");
    res.json({ success: false });
  }
  console.log("End of poster handler\n");
});

// Handles get requests of admin viewing table of users
app.get("/api/accounts-table", async (req, res) => {
  console.log("\nCREATE ACCOUNTS TABLE ATTEMPT\n");
  const accountsTableQuery = `SELECT * FROM analytics`;
  try {
    const accountsData = await pool.query(accountsTableQuery);
    console.log("[SUCCESS] accountsTableQuery run successfully\n");
    res.json({ accountsData: accountsData[0], success: true });
  } catch (err) {
    console.log(
      "[ERROR] Error in selecting accounts from database\n" + err + "\n"
    );
    res.json({ success: false });
  }
  console.log("End of get handler\n");
});

// Handles post requests when new account is created
app.post("/api/analytics/account-created", async (req, res) => {
  console.log(
    `\nATTEMPTING TO ADD ROW IN ANALYTICS FOR NEW USER: ${req.body.username}\n`
  );
  const num_workouts = 0; // Unsure if needed, but wanted same variable type
  const query = `INSERT INTO analytics (username, account_created_on, last_login, num_workouts) VALUES ("${req.body.username}", "${req.body.dateTime}", "${req.body.dateTime}", "${num_workouts}")`;
  try {
    await pool.query(query);
    console.log(
      "[SUCCESS] date and time stamp of account creation inserted into DB"
    );
    res.json({ success: true });
  } catch (err) {
    console.log(
      "[ERROR] Error inserting date/time stamp into database\n" + err + "\n"
    );
    res.json({ success: false });
  }
  console.log("\nEnd of post handler\n");
});

// Handles post requests when a user logs into account
app.post("/api/analytics/login", async (req, res) => {
  console.log(
    `\nATTEMPTING TO UPDATE last_login COLUMN FOR USER ${req.body.username}\n`
  );
  const query = `UPDATE analytics SET last_login = "${req.body.dateTime}" WHERE username = "${req.body.username}"`;
  try {
    await pool.query(query);
    console.log(
      `[SUCCESS] date and time stamp of last login update for user: ${req.body.username}`
    );
    res.json({ success: true });
  } catch (err) {
    console.log("[ERROR] Error updating last_login in database\n" + err + "\n");
    res.json({ success: false });
  }
  console.log("\nEnd of post handler\n");
});

// Handles post requests when a user finishes a workout
app.post("/api/analytics/workout-finished", async (req, res) => {
  console.log(
    `\nATTEMPTING TO UPDATE num_workouts AND last_workout FOR USER: ${req.body.username}\n`
  );
  const query = `UPDATE analytics SET num_workouts = num_workouts + 1, last_workout = "${req.body.dateTime}" WHERE username = "${req.body.username}"`;
  try {
    await pool.query(query);
    console.log(
      `[SUCCESS] num_workout and last_workout updated for user: ${req.body.username}`
    );
    res.json({ success: true });
  } catch (err) {
    console.log(
      "[ERROR] Error updating num_workouts and last_workout in database\n" +
        err +
        "\n"
    );
    res.json({ success: false });
  }
});
