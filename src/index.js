/**************************************************************************
 * index.js
 **************************************************************************
 *
 * TODO:
 *
 * FIX SERVER AND APP TIMEOUT ERROR
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
