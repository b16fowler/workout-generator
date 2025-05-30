/**************************************************************************
 * index.js
 **************************************************************************
 *
 * TODO:
 *
 * Fix ViewExercises scroll issue
 * Make uploading exercise photo mandatory
 * Create API for user data
 * Remove exercise from pool
 * Edit exercise already in pool
 * Revisit previous workouts
 * Save current/previous workout as 'favorite'
 *
 **************************************************************************/

import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export { root };
