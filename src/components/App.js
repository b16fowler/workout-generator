/**************************************************************************
 * App component
 **************************************************************************/

import LoginPage from "./LoginPage.js";
import "../css/index.css";

// Empty string at start, set to username after log in
let user = {
  _username: "",
  _accountType: "",

  // getters and setters for user's info: username and account type
  get username() {
    return this._username;
  },
  set username(value) {
    this._username = value;
  },

  get accountType() {
    return this._accountType;
  },
  set accountType(value) {
    this._accountType = value;
  },
};

export function showSnackbar(message) {
  /* showSnackbar function will display 'message' from top of screen for 3 seconds
   * before disappearing. Used as a method of alerting users of 'successes' and
   * 'failures' */
  console.log("Top of showSnackbar function");

  const sb = document.querySelector("#snackbar");
  sb.textContent = message;
  sb.className = "show";

  setTimeout(function () {
    sb.className = sb.className.replace("show", "");
  }, 3000);
}

export default function App() {
  return (
    <>
      <div className="App">
        <LoginPage />
      </div>
    </>
  );
}

export { user };
