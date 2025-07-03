/**************************************************************************
 * index.js
 **************************************************************************
 *
 * TODO:
 *
 * Use Snackbar for user alerts
 * Implement some type of API
 * Visual of exercise picture on ViewExercisesPage
 * Remove exercise from pool
 * Edit exercise already in pool
 * Save current/previous workout
 *
 **************************************************************************/

import ReactDOM from "react-dom/client";
import App from "./components/App";
import React from "react";
import "./css/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export { root };
