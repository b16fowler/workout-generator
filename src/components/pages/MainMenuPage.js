/**************************************************************************
 * MainMenuPage component
 **************************************************************************/
import "../../css/MainMenuPage.css";
import { Link } from "react-router-dom";
import Header from "../Header";

export default function MainMenu() {
  return (
    <>
      <Header heading="Workout Generator App" />
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
