/**************************************************************************
 * index.js
 **************************************************************************
 *
 * TODO:
 *
 * Connect AWS RDS to EC2 instance
 * Change snackbar CSS
 * Center snackbar for longer alerts
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

export function showSnackbar(message) {
  const sb = document.querySelector("#snackbar");
  sb.textContent = message;
  sb.className = "show";

  setTimeout(function () {
    sb.className = sb.className.replace("show", "");
  }, 3000);
}

export { root };
