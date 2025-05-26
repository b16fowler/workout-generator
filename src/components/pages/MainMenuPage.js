/**************************************************************************
 * MainMenuPage component
 **************************************************************************/
import Footer from "../Footer";
import "../../css/MainMenuPage.css";
import Header from "../Header";

export default function MainMenuPage() {
  return (
    <>
      <Header heading="Workout Generator App" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="main-menu">
        <button className="main-menu-button" onClick={handleClick}>
          Generate Workout
        </button>
        <button className="main-menu-button" onClick={handleClick}>
          Add Exercise
        </button>
        <button className="main-menu-button" onClick={handleClick}>
          View Exercises
        </button>
      </div>
      <Footer />
    </>
  );
}

function handleClick() {
  return;
}
