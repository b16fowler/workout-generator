/**************************************************************************
 * index.js
 **************************************************************************
 *
 * TODO:
 *
 * Change LogOutButton to clear page before log out
 * Change AddExercisePage to not add invalid entries to table
 * Fix Clock position in Header
 * Fix ViewExercises scroll issue
 * Make uploading exercise photo mandatory
 * Remove exercise from pool
 * Edit exercise already in pool
 * Revisit previous workouts
 * Save current/previous workout
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
