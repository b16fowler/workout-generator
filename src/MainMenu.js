import GenerateWorkout from "./GenerateWorkout";
import AddExercise from "./AddExercise";
import ViewExercises from "./ViewExercises";
import "./MainMenu.css";

export default function MainMenu() {
  return (
    <>
      <div className="mainMenu-header">
        <h3>MainMenu component of the Workout Generator app</h3>
      </div>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="mainMenu-btn">
          <GenerateWorkout />
        </div>
        <br />
        <br />
        <div className="mainMenu-btn">
          <AddExercise />
        </div>
        <br />
        <br />
        <div className="mainMenu-btn">
          <ViewExercises />
        </div>
      </div>
    </>
  );
}
