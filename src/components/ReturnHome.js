/**************************************************************************
 * ReturnHome component
 **************************************************************************/

import { root } from "..";
import MainMenuPage from "./pages/MainMenuPage";

export default function ReturnHome() {
  return (
    <>
      <div className="return-div">
        <button className="return-button" onClick={handleClick}>
          Return home
        </button>
      </div>
    </>
  );
}

function handleClick() {
  root.render(<MainMenuPage />);
}
