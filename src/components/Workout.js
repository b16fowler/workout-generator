/**************************************************************************
 * Workout component
 **************************************************************************/

import { useState } from "react";
import PreviousButton from "./PreviousButton.js";
import NextButton from "./NextButton.js";
import FinishButton from "./FinishButton.js";
import Footer from "./Footer.js";

export default function Workout({ workout }) {
  // Tracks index of given exercise in generated workout
  let [index, setIndex] = useState(0);

  return (
    <>
      {/*<Header heading={"Generated Workout"} /> */}
      <PreviousButton index={index} setIndex={setIndex} />
      <NextButton index={index} setIndex={setIndex} length={workout.length} />
      <FinishButton index={index} length={workout.length} />
      <Footer />
    </>
  );
}
