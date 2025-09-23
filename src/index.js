/**************************************************************************
 * index.js
 **************************************************************************
 *
 * TODO:
 *
 * Add exercise snackbar for missing fields
 * Fix login form defaulting enter to password visibility
 * Standardize size of all exercise photos in workout
 *
 * Update comments for all components
 * Add thorough server logs
 *
 * Change snackbar CSS
 * Center snackbar for longer alerts
 * Visual of exercise picture on ViewExercisesPage
 * Remove exercise from pool
 * Edit exercise already in pool
 * Save current/previous workout
 *
 **************************************************************************/

import ReactDOM from "react-dom/client";
import App from "./components/App.js";
import React from "react";
import "./css/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export { root };
