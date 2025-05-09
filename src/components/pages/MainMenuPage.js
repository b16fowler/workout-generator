import "../../MainMenuPage.css";
import { Link } from "react-router-dom";

export default function MainMenu() {
  return (
    <>
      <div className="main-menu-header">
        <h3>MainMenu component of the Workout Generator app</h3>
      </div>
      <div>
        <Link to="/generate-workout">Generate workout link</Link>
        <br />
        <br />
      </div>
      <div>
        <Link to="/add-exercise">Add exercise link</Link>
        <br />
        <br />
      </div>
      <div>
        <Link to="/view-exercises">View exercises link</Link>
        <br />
        <br />
      </div>
    </>
  );
}
