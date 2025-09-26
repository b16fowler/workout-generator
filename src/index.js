/**************************************************************************
 * index.js
 **************************************************************************
 * TODO:
 *
 * Change AWS security rules to limit IP access
 * Loading component
 * Create account types (admin, user, etc.)
 *
 * Update comments for all components
 *
 * Change snackbar CSS
 * Center snackbar for longer alerts
 * Visual of exercise picture on ViewExercisesPage
 * Remove exercise from pool
 * Edit exercise already in pool
 * Save current/previous workout
 **************************************************************************/

import ReactDOM from "react-dom/client";
import App from "./components/App.js";
import React from "react";
import "./css/index.css";

// Current public IP for EC2 instance and DB port
// IP changes with each EC2 restart
const EC2_URL = "http://3.80.211.117:5000";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export { root, EC2_URL };
