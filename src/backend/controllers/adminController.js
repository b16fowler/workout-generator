import pool from "../config/db.js";

export const searchUser = async (req, res) => {
  console.log("SEARCH USER ATTEMPT");
  const searchQuery = `SELECT username FROM logins WHERE username = "${req.body.user}"`;
  try {
    const searchResponse = await pool.query(searchQuery);
    if (searchResponse[0][0].username)
      console.log("searchResponse[0][0].username is not null");
    console.log(`[SUCCESS] User ${req.body.user} exists in database`);
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(
      `[ERROR] Error searching for user ${req.body.user} in database\n` + err
    );
    res.json({ success: false });
  }
  console.log("End of post handler\n");
};

export const resetPassword = async (req, res) => {
  console.log("RESET PASSWORD ATTEMPT");
  const resetQuery = `UPDATE logins SET password = "${req.body.user}" WHERE username = "${req.body.user}"`;
  try {
    await pool.query(resetQuery);
    console.log(`[SUCCESS] User ${req.body.user}'s password has been reset`);
    res.json({ success: true });
  } catch (err) {
    console.log(`[ERROR] Error resetting ${req.body.user}'s password\n` + err);
    res.json({ success: false });
  }
  console.log("End of post handler\n");
};

export const deleteAccount = async (req, res) => {
  console.log("DELETE ACCOUNT ATTEMPT");
  try {
    await pool.query(`DELETE FROM logins WHERE username = "${req.body.user}"`);
    await pool.query(
      `DELETE FROM user_exercises WHERE username = "${req.body.user}"`
    );
    await pool.query(
      `DELETE FROM analytics WHERE username = "${req.body.user}"`
    );
    console.log(`[SUCCESS] User account ${req.body.user} deleted successfully`);
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
