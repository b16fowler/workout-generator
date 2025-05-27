/**************************************************************************
 * LogOutButton component
 **************************************************************************/

import { root } from "../index";
import App from "./App";

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
  root.render(<App />);
}
