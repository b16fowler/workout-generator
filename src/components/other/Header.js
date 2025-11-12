/**************************************************************************
 * Header component
 *
 * Header displays as a banner at the top of all pages. Contains Clock and
 * LogOutButton components. Takes 'heading' prop that shows at the top
 * center.
 **************************************************************************/

import Clock from "./Clock.js";
import LogOutButton from "../buttons/LogOutButton.js";

export default function Header({ heading, notLoggedIn }) {
  return (
    <>
      <div className="header-div">
        <Clock />
        <h3 className="heading">{heading}</h3>
        <LogOutButton notLoggedIn={notLoggedIn} />
      </div>
      <div id="snackbar"></div>
    </>
  );
}
