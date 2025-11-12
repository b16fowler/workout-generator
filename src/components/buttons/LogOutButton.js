/**************************************************************************
 * LogOutButton component
 *
 * LogOutButton shows in the bottom right-hand corner of the Header. This
 * component is hidden when the user is not logged in. When clicked,
 * removes any divs that may have been on display if workout was generated,
 * then renders App component.
 **************************************************************************/

import { root } from "../../index.js";
import App, { user, showSnackbar } from "../App.js";

export default function LogOutButton({ notLoggedIn }) {
  return (
    <button
      className="logout-button"
      onClick={handleLogOut}
      hidden={notLoggedIn ? true : false}
    >
      {user.username}
      <br />
      Log out
    </button>
  );
}

function handleLogOut() {
  showSnackbar("Logging you out...");

  setTimeout(() => {
    // Remove exercise-div, if user has generated workout
    while (document.querySelector(".exercise-div")) {
      document.body.removeChild(document.querySelector(".exercise-div"));
    }

    root.render(<App />);
  }, 1500);
}
