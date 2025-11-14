import pool from "../config/db.js";

export const searchUser = async (req, res) => {
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
};

export const resetPassword = async (req, res) => {
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
};

export const deleteAccount = async (req, res) => {
  console.log("\nDELETE ACCOUNT ATTEMPT\n");
  const deleteLogins = `DELETE FROM logins WHERE username = "${req.body.user}"`;
  const deleteExercises = `DELETE FROM user_exercises WHERE username = "${req.body.user}"`;
  try {
    await pool.query(deleteLogins);
    await pool.query(deleteExercises);
    console.log(
      `[SUCCESS] User account ${req.body.user} deleted successfully\n`
    );
    res.json({ success: true });
  } catch (err) {
    console.log("[ERROR] Error deleting account\n" + err + "\n");
    res.json({ success: false });
  }
  console.log("End of poster handler\n");
};

export const accountsTable = async (req, res) => {
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
};
