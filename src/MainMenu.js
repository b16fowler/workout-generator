import GenerateWorkout from "./GenerateWorkout";
import "./MainMenu.css";

export default function MainMenu() {
  return (
    <>
      <div className="mainMenu-header">
        <h>MainMenu component of the Workout Generator app</h>
      </div>
      <br />
      <br />
      <div className="generate-btn">
        <GenerateWorkout />
      </div>
    </>
  );
}
