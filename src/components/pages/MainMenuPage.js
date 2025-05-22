/**************************************************************************
 * MainMenuPage component
 **************************************************************************/
import "../../css/MainMenuPage.css";
import { Link } from "react-router-dom";

export default function MainMenu() {
  return (
    <>
      <div>
        <h3 className="main-menu-header">Workout Generator App</h3>
      </div>
      <div>
        <br />
        <br />
        <br />
        <Link to="/generate-workout">Generate workout</Link>
        <br />
        <br />
        <br />
      </div>
      <div>
        <Link to="/add-exercise">Add exercise</Link>
        <br />
        <br />
        <br />
      </div>
      <div>
        <Link to="/view-exercises">View exercises</Link>
        <br />
        <br />
        <br />
      </div>
    </>
  );
}
