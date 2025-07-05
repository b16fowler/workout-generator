/**************************************************************************
 * server.js
 **************************************************************************/

require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to RDS:", err.code, err.message);
    return;
  }
  console.log("Connected to AWS RDS MySQL!");
});
