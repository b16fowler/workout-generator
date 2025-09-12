/**************************************************************************
 * LogOutButton component
 *
 * LogOutButton shows in the bottom right-hand corner of the Header. This
 * component is hidden when the user is not logged in. When clicked,
 * removes any divs that may have been on display if workout was generated,
 * then renders App component.
 *
 **************************************************************************/

import { root } from "../index.js";
import App from "./App.js";

export default function LogOutButton({ notLoggedIn }) {
  return (
    <button
      className="logOut"
      onClick={handleLogOut}
      hidden={notLoggedIn ? true : false}>
      Log out
    </button>
  );
}

function handleLogOut() {
  // Remove exercise-div, if user has generated workout
  while (document.querySelector(".exercise-pic")) {
    document.body.removeChild(document.querySelector(".exercise-pic"));
  }

  root.render(<App />);
}
