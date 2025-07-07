/**************************************************************************
 * LogOutButton component
 **************************************************************************/

import { root } from "../index.js";
import App from "./App.js";

export default function LogOutButton({ notLoggedIn }) {
  return (
    <button
      className="logOut"
      onClick={handleLogOut}
      hidden={notLoggedIn ? true : false}
    >
      Log out
    </button>
  );
}

function handleLogOut() {
  // Remove exercise-div, if user has generated workout
  if (document.querySelector(".exercise-div")) {
    document.body.removeChild(document.querySelector(".exercise-div"));
  }

  root.render(<App />);
}
