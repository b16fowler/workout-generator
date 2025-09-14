/**************************************************************************
 * Workout component
 **************************************************************************/

import Exercise from "./Exercise.js";
import FinishButton from "./FinishButton.js";
import NextButton from "./NextButton.js";
import PreviousButton from "./PreviousButton.js";
import { useState } from "react";

export default function Workout({ workout }) {
  // Tracks index of given exercise in generated workout
  let [index, setIndex] = useState(0);

  return (
    <>
      <Exercise
        name={workout[index].name}
        sets={workout[index].sets}
        reps={workout[index].reps}
      />
      <PreviousButton index={index} setIndex={setIndex} />
      <NextButton index={index} setIndex={setIndex} length={workout.length} />
      <FinishButton index={index} length={workout.length} />
    </>
  );
}
