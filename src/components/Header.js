/**************************************************************************
 * Header component
 **************************************************************************/

import Clock from "./Clock";
import LogOutButton from "./LogOutButton";

export default function Header({ heading, notLoggedIn }) {
  return (
    <>
      <div className="header-div">
        <Clock />
        <h3 className="header">{heading}</h3>
        <LogOutButton notLoggedIn={notLoggedIn} />
      </div>
    </>
  );
}
