import pool from "../config/db.js";

export const login = async (req, res) => {
  console.log(`LOGIN ATTEMPT\nUser attempting login from ip: ${req.ip}`);
  const login_query = "SELECT * FROM logins;";
  try {
    const result = await pool.query(login_query);
    console.log(`[SUCCESS] login query run successfully`);
    res.json(result[0]);
  } catch (err) {
    console.log(`[ERROR] Error running login query\n` + err);
    res.json({ success: false });
  }
  console.log("End of get handler\n");
};

export const createAccount = async (req, res) => {
  console.log("CREATE ACCOUNT ATTEMPT");
  try {
    // Creates new entry in logins if username is unique
    await pool.query(req.body.query);
    res.json({ success: true });
    console.log(
      `[SUCCESS] login information for user ${req.body.user} inserted into DB`
    );
  } catch (err) {
    // username already exists
    if (err.code === "ER_DUP_ENTRY") {
      console.log(
        `Attempted username ${req.body.user} already in DB, prompting user to try again`
      );
      res.json({
        success: false,
        message: "An account with that username already exists",
      });
    } else {
      console.log(
        `[ERROR] Error trying to insert login information for ${req.body.user}\n` +
          err
      );
    }
  }
};

export const checkAccountType = async (req, res) => {
  console.log("CHECK ACCOUNT TYPE ATTEMPT");
  const checkAccountQuery = `SELECT type FROM logins WHERE username = "${req.body.user}";`;
  try {
    const result = await pool.query(checkAccountQuery);
    console.log(
      `[SUCCESS] Type of account for user ${req.body.user} fetched successfully`
    );
    res.json({ account: result });
  } catch (err) {
    console.log(
      `[ERROR] Error fetching account information for user ${req.body.user}\n` +
        err
    );
  }
  console.log("End of post handler\n");
};
