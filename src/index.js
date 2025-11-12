/**************************************************************************
 * index.js
 **************************************************************************
 * MASTER TODO
 *
 * BUG FIX / CLARITY
 * Add frontend logic for ReloadWorkoutButton and LoadNewWorkoutButton
 * Add backend logic for SaveWorkoutButton, ReloadWorkoutButton, and LoadNewWorkoutButton
 * Change snackbar CSS
 * Center snackbar for longer alerts
 * Remove "login information does not match records" on successful login
 * Change fetch calls to axios
 * Add multiple css files
 *
 * FEATURES TO IMPLEMENT
 * Visual of exercise picture on ViewExercisesPage
 * Remove exercise from pool
 * Edit exercise already in pool
 * Save current/previous workout
 * Forgot password
 *
 **************************************************************************
 * CHATGPT SUGGESTIONS
 * *** Architecture ***
 * Split server.js into multiple files
 *
 * *** Code Quality/Best Practices ***
 * Eliminate queries written in frontend
 * Replace "SELECT * ..." queries
 * Use Winston or Pino (or something else) for backend error logging
 *
 * *** Security Improvements ***
 * Use hashing for passwords
 * CORS --> Restrict allowed origins to production domain
 *
 **************************************************************************/

import ReactDOM from "react-dom/client";
import App from "./frontend/components/App.js";
import React from "react";
import "./frontend/css/index.css";

/* Current public IP for EC2 instance and DB port
 * IP changes with each EC2 shutdown */

////////////////// FOR DEPLOYMENT ///////////////////
const EC2_URL = "http://3.80.211.117:5000";
/////////////////////////////////////////////////////

///////////////// FOR LOCAL TESTING /////////////////
// const EC2_URL = "http://localhost:5000";
/////////////////////////////////////////////////////

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export { root, EC2_URL };
