import { root } from "../index.js";
import App from "./App.js";

export default function FinishButton() {
  return (
    <button className="finish-button" onClick={handleClick}>
      Finish workout
    </button>
  );

  function handleClick() {
    // Remove exercise photo and render generate workout page
    document.body.removeChild(document.querySelector(".exercise-div"));
    root.render(<App />);
  }
}
