/**************************************************************************
 * Workout component
 *
 * Component starts with everything hidden except the 'begin workout'
 * button. After that is clicked, displays current exercise image, details
 * (reps, sets, etc.), previous/next buttons. Exercise being displayed is
 * controlled through a state variable that is changed on previous/next
 * clicks
 **************************************************************************/

import Exercise from "./Exercise.js";
import { useEffect, useState } from "react";
import NextButton from "../buttons/NextButton.js";
import FinishButton from "../buttons/FinishButton.js";
import PreviousButton from "../buttons/PreviousButton.js";
import Header from "./Header.js";
import Footer from "./Footer.js";

export default function WorkoutPage({ workout }) {
  // Tracks index of given exercise in generated workout
  let [index, setIndex] = useState(-1);
  let [started, setStarted] = useState(false);

  // useEffect displays first exercise image after begin button is clicked
  useEffect(() => {
    if (!started) return;
    document.getElementById(0)?.toggleAttribute("hidden");
  }, [started]);

  // Called when begin-button is clicked, sets index to 0
  const startWorkout = () => {
    setIndex(0);
    setStarted(true);
  };

  return (
    <>
      <Header heading={"Generated Workout"} />
      {!started && (
        <button className="start-button" onClick={startWorkout}>
          Begin workout
        </button>
      )}
      {started && (
        <Exercise
          name={workout[index].name}
          sets={workout[index].sets}
          reps={workout[index].reps}
        />
      )}
      {started && <PreviousButton index={index} setIndex={setIndex} />}
      {started && (
        <NextButton index={index} setIndex={setIndex} length={workout.length} />
      )}
      {started && (
        <FinishButton index={index} length={workout.length} workout={workout} />
      )}
      <Footer />
    </>
  );
}
