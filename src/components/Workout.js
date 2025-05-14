import PreviousButton from "./PreviousButton.js";
import NextButton from "./NextButton.js";
import Exercise from "./Exercise.js";

export default function Workout(prop) {
  console.log(prop.workout);
  return (
    <>
      <h1 className="main-menu-header">GenerateWorkoutPage component</h1>
      <Exercise />
      <PreviousButton />
      <NextButton />
    </>
  );
}
