import "../MainMenuPage.css";
import { Link } from "react-router-dom";

export default function MainMenu() {
  return (
    <>
      <div className="mainMenu-header">
        <h3>MainMenu component of the Workout Generator app</h3>
      </div>
      <div>
        <Link to="/generate-workout">Generate workout</Link>
      </div>
      <div>
        <Link to="/add-exercise">Add exercise</Link>
      </div>
      <div>
        <Link to="/view-exercises">View exercises</Link>
      </div>
    </>
  );
}
