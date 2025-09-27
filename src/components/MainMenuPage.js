/**************************************************************************
 * MainMenuPage component
 **************************************************************************/
import Footer from "./Footer.js";
import "../css/index.css";
import Header from "./Header.js";
import GenerateWorkout from "./GenerateWorkoutPage.js";
import AddExercise from "./AddExercisePage.js";
import ViewExercises from "./ViewExercisesPage.js";
import { root } from "../index.js";
import { user } from "./App.js";

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
        <button
          className="main-menu-button"
          onClick={() => handleClick(<GenerateWorkout />)}>
          Generate Workout
        </button>
        <button
          className="main-menu-button"
          onClick={() => handleClick(<AddExercise />)}>
          Add Exercise
        </button>
        <button
          className="main-menu-button"
          onClick={() => handleClick(<ViewExercises />)}>
          View Exercises
        </button>
      </div>
      {user.accountType === "admin" && (
        <div className="admin-buttons">
          <button>Admin</button>
        </div>
      )}
      <div id="snackbar"></div>
      <Footer />
    </>
  );
}

function handleClick(component) {
  root.render(component);

  return;
}
