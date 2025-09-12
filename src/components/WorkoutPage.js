/**************************************************************************
 * Workout component
 **************************************************************************/

import { useState } from "react";
import PreviousButton from "./PreviousButton.js";
import NextButton from "./NextButton.js";
import FinishButton from "./FinishButton.js";
import Header from "./Header.js";
import Footer from "./Footer.js";

export default function Workout({ workout }) {
  // Tracks index of given exercise in generated workout
  // let [exercises, setExercises] = useState([]);
  let [index, setIndex] = useState(0);
  console.log("workout in Workout component:");
  console.log(workout);

  return (
    <>
      <Header heading={"Generated Workout"} />
      <PreviousButton index={index} setIndex={setIndex} />
      <NextButton index={index} setIndex={setIndex} length={workout.length} />
      <FinishButton index={index} length={workout.length} />
      <Footer />
    </>
  );
}
