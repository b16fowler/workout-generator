import pool from "../config/db.js";

export const accountCreated = async (req, res) => {
  console.log(
    `\nATTEMPTING TO ADD ROW IN ANALYTICS FOR NEW USER: ${req.body.user}\n`
  );
  const num_workouts = 0; // Unsure if needed, but wanted same variable type
  const query = `INSERT INTO analytics (username, account_created_on, last_login, num_workouts) VALUES ("${req.body.user}", "${req.body.dateTime}", "${req.body.dateTime}", "${num_workouts}")`;
  try {
    await pool.query(query);
    console.log(
      `[SUCCESS] date and time stamp of account creation inserted into DB for user ${req.body.user}`
    );
    res.json({ success: true });
  } catch (err) {
    console.log(
      "[ERROR] Error inserting date/time stamp into database\n" + err + "\n"
    );
    res.json({ success: false });
  }
  console.log("\nEnd of post handler\n");
};

export const accountLogin = async (req, res) => {
  console.log(
    `\nATTEMPTING TO UPDATE last_login COLUMN FOR USER ${req.body.user}\n`
  );
  const query = `UPDATE analytics SET last_login = "${req.body.dateTime}" WHERE username = "${req.body.user}"`;
  try {
    await pool.query(query);
    console.log(
      `[SUCCESS] date and time stamp of last login update for user: ${req.body.user}`
    );
    res.json({ success: true });
  } catch (err) {
    console.log(
      `[ERROR] Error updating last_login in database for user ${req.body.user}\n` +
        err +
        "\n"
    );
    res.json({ success: false });
  }
  console.log("\nEnd of post handler\n");
};

export const workoutFinished = async (req, res) => {
  console.log(
    `\nATTEMPTING TO UPDATE num_workouts AND last_workout FOR USER: ${req.body.user}\n`
  );
  const query = `UPDATE analytics SET num_workouts = num_workouts + 1, last_workout = "${req.body.dateTime}" WHERE username = "${req.body.usern}"`;
  try {
    await pool.query(query);
    console.log(
      `[SUCCESS] num_workout and last_workout updated for user: ${req.body.user}`
    );
    res.json({ success: true });
  } catch (err) {
    console.log(
      `[ERROR] Error updating num_workouts and last_workout in database for user ${req.body.user}\n` +
        err +
        "\n"
    );
    res.json({ success: false });
  }
  console.log("\nEnd of post handler\n");
};
