import { message } from "antd";
import pool from "../config/db.js";

export const login = async (req, res) => {
  console.log(`LOGIN ATTEMPT\n`);
  const login_query = `SELECT * FROM logins WHERE username = "${req.body.username}" AND password = "${req.body.password}";`;
  try {
    const [result] = await pool.query(login_query);
    console.log(`[SUCCESS] login query run successfully`);
    if (result.length) {
      console.log(
        `[SUCCESS] username "${req.body.username}" and password "${req.body.password}" match login`
      );

      res.send({
        success: true,
        login: true,
        message: "Authentication successful. Logging in",
      });
    } else {
      console.log(
        `[FAILURE] username "${req.body.username}" and password "${req.body.password}" DO NOT match login`
      );
      res.send({
        success: true,
        login: false,
        message: "Username or password incorrect. Please try again",
      });
    }
  } catch (err) {
    console.log(`[ERROR] Error running login query\n` + err);
    res.send({
      success: false,
      login: false,
      message: "An error has occurred. Please try again",
    });
  }
  console.log("End of post handler\n");
};

export const createAccount = async (req, res) => {
  console.log("CREATE ACCOUNT ATTEMPT");
  const query = `INSERT INTO logins VALUES ("${req.body.username}", "${req.body.password}", "user");`;
  try {
    // Creates new entry in logins if username is unique
    await pool.query(query);
    res.send({
      success: true,
      account_created: true,
      message: "Account created successfully! Logging you in now",
    });
    console.log(
      `[SUCCESS] login information for user "${req.body.username}" inserted into DB`
    );
  } catch (err) {
    // username already exists
    if (err.code === "ER_DUP_ENTRY") {
      console.log(
        `[FAILURE] Attempted username "${req.body.username}" already in DB, prompting user to try again`
      );
      res.send({
        success: false,
        account_created: false,
        message: "An account with that username already exists",
      });
    } else {
      console.log(
        `[ERROR] Error trying to insert login information for "${req.body.username}"\n` +
          err
      );
      res.send({
        success: false,
        account_created: false,
        message: "An unexpected error occurred. Please try again",
      });
    }
  }
  console.log("End of post handler\n");
};

export const checkAccountType = async (req, res) => {
  console.log("CHECK ACCOUNT TYPE ATTEMPT");
  const checkAccountQuery = `SELECT type FROM logins WHERE username = "${req.body.username}";`;
  try {
    const account = await pool.query(checkAccountQuery);
    console.log(
      `[SUCCESS] Type of account for user "${req.body.username}" fetched successfully`
    );
    res.send({ success: true, account: account });
  } catch (err) {
    console.log(
      `[ERROR] Error fetching account information for user "${req.body.username}"\n` +
        err
    );
    res.send({ success: false });
  }
  console.log("End of post handler\n");
};
