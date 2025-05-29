/**************************************************************************
 * index.js
 **************************************************************************
 *
 * Features to create/implement:
 *
 * Create API for user data
 * # of exercises when generating workout
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
