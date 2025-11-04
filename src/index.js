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
