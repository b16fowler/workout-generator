/**************************************************************************
 * App component
 **************************************************************************/

import LoginPage from "./LoginPage.js";
import "../css/index.css";

// Empty string at start, set to username after log in
const user = {
  name: "",
  get name() {
    return this._name;
  },
  set name(value) {
    this._name = value;
  },
};

export function showSnackbar(message) {
  /* showSnackbar function will display 'message' from top of screen for 3 seconds
   * before disappearing. Used as a method of alerting users of 'successes' and
   * 'failures' */
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
      <div id="snackbar"></div>
    </>
  );
}

export { user };
