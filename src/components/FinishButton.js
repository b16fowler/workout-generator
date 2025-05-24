/**************************************************************************
 * FinishButton component
 **************************************************************************/

import { root } from "../index.js";
import App from "./App.js";

export default function FinishButton({ index, length }) {
  return (
    <button
      className="finish button"
      onClick={handleClick}
      hidden={index === length - 1 ? false : true}
    >
      Finish workout
    </button>
  );

  function handleClick() {
    // Remove exercise photo and render generate workout page
    document.body.removeChild(document.querySelector(".exercise-div"));
    root.render(<App />);
  }
}
