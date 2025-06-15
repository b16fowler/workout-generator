/**************************************************************************
 * MainMenuPage component
 **************************************************************************/
import Footer from "./Footer";
import "../css/MainMenuPage.css";
import Header from "./Header";
import GenerateWorkout from "./GenerateWorkoutPage";
import AddExercise from "./AddExercisePage";
import ViewExercises from "./ViewExercisesPage";
import { root } from "..";
// import DailyWord from "./DailyWord";

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
          onClick={() => handleClick(<GenerateWorkout />)}
        >
          Generate Workout
        </button>
        <button
          className="main-menu-button"
          onClick={() => handleClick(<AddExercise />)}
        >
          Add Exercise
        </button>
        <button
          className="main-menu-button"
          onClick={() => handleClick(<ViewExercises />)}
        >
          View Exercises
        </button>
      </div>

      <Footer />
    </>
  );
}

function handleClick(component) {
  root.render(component);

  return;
}
