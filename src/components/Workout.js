import { useState } from "react";
import PreviousButton from "./PreviousButton.js";
import NextButton from "./NextButton.js";
import Exercise from "./Exercise.js";
import FinishButton from "./FinishButton.js";

export default function Workout({ workout }) {
  // Tracks index of given exercise in generated workout
  let [index, setIndex] = useState(0);

  return (
    <>
      <h1 className="main-menu-header">GenerateWorkoutPage component</h1>
      <PreviousButton index={index} setIndex={setIndex} />
      <NextButton index={index} setIndex={setIndex} length={workout.length} />
      <Exercise workout={workout} index={index} />
      <FinishButton index={index} length={workout.length} />
    </>
  );
}
