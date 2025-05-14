import PreviousButton from "./PreviousButton.js";
import NextButton from "./NextButton.js";
import Exercises from "./Exercises.js";

export default function Workout(prop) {
  console.log(prop.workout);
  return (
    <>
      <h1 className="main-menu-header">GenerateWorkoutPage component</h1>
      <Exercises workout={prop.workout} />
      <PreviousButton />
      <NextButton />
    </>
  );
}
