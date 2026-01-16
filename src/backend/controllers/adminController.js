import pool from "../config/db.js";

export const searchUser = async (req, res) => {
  console.log("SEARCH USER ATTEMPT");
  const searchQuery = `SELECT username FROM logins WHERE username = "${req.body.username}"`;
  try {
    const searchResponse = await pool.query(searchQuery);
    if (searchResponse[0][0].username)
      console.log("searchResponse[0][0].username is not null");
    console.log(`[SUCCESS] User ${req.body.username} exists in database`);
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(
      `[ERROR] Error searching for user ${req.body.username} in database\n` +
        err
    );
    res.json({ success: false });
  }
  console.log("End of post handler\n");
};

export const resetPassword = async (req, res) => {
  console.log("RESET PASSWORD ATTEMPT");
  const resetQuery = `UPDATE logins SET password = "${req.body.username}" WHERE username = "${req.body.username}"`;
  try {
    await pool.query(resetQuery);
    console.log(
      `[SUCCESS] User ${req.body.username}'s password has been reset`
    );
    res.json({ success: true });
  } catch (err) {
    console.log(
      `[ERROR] Error resetting ${req.body.username}'s password\n` + err
    );
    res.json({ success: false });
  }
  console.log("End of post handler\n");
};

export const deleteAccount = async (req, res) => {
  console.log("DELETE ACCOUNT ATTEMPT");
  try {
    await pool.query(
      `DELETE FROM logins WHERE username = "${req.body.username}"`
    );
    await pool.query(
      `DELETE FROM user_exercises WHERE username = "${req.body.username}"`
    );
    await pool.query(
      `DELETE FROM analytics WHERE username = "${req.body.username}"`
    );
    console.log(
      `[SUCCESS] User account ${req.body.username} deleted successfully`
    );
    res.json({ success: true });
  } catch (err) {
    console.log("[ERROR] Error deleting account\n" + err);
    res.json({ success: false });
  }
  console.log("End of poster handler\n");
};

export const accountsTable = async (req, res) => {
  console.log("CREATE ACCOUNTS TABLE ATTEMPT");
  const accountsTableQuery = `SELECT * FROM analytics`;
  try {
    const accountsData = await pool.query(accountsTableQuery);
    console.log("[SUCCESS] accountsTableQuery run successfully");
    res.json({ accountsData: accountsData[0], success: true });
  } catch (err) {
    console.log("[ERROR] Error in selecting accounts from database\n" + err);
    res.json({ success: false });
  }
  console.log("End of get handler\n");
};
