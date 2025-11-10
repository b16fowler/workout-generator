/**************************************************************************
 * index.js
 **************************************************************************
 * MASTER TODO
 *
 * BUG FIX / CLARITY
 * Change snackbar CSS
 * Center snackbar for longer alerts
 *
 * FEATURES TO IMPLEMENT
 * Visual of exercise picture on ViewExercisesPage
 * Remove exercise from pool
 * Edit exercise already in pool
 * Save current/previous workout
 * Forgot password
 * Change fetch calls to axios
 *
 *
 * **************************************************************************
 * CHATGPT SUGGESTIONS
 * Architecture
 * Split server.js into multiple files
 *
 * Code Quality/Best Practices
 * Eliminate queries written in frontend
 * Replace "SELECT * ..." queries
 * Use Winston or Pino (or something else) for backend error logging
 * .env variable instead of PORT
 *
 * Security Improvements
 * Use hashing for passwords
 * CORS --> Restrict allowed origins to production domain
 *
 **************************************************************************/

import ReactDOM from "react-dom/client";
import App from "./components/App.js";
import React from "react";
import "./css/index.css";

/* Current public IP for EC2 instance and DB port
 * IP changes with each EC2 shutdown */
const EC2_URL = "http://3.80.211.117:5000";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export { root, EC2_URL };
