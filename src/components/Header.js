/**************************************************************************
 * Header component
 **************************************************************************/

import Clock from "./Clock";

export default function Header({ heading }) {
  return (
    <>
      <div>
        <Clock />
        <h3 className="header">{heading}</h3>
      </div>
    </>
  );
}
