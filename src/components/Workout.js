/**************************************************************************
 * Workout component
 **************************************************************************/

import { useState, useEffect } from "react";
import axios from "axios";
import PreviousButton from "./PreviousButton.js";
import NextButton from "./NextButton.js";
import Exercise from "./Exercise.js";
import FinishButton from "./FinishButton.js";

export default function Workout({ workout }) {
  // Tracks index of given exercise in generated workout
  let [index, setIndex] = useState(0);

  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/userExercises")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h1 className="main-menu-header">Workout component</h1>
      <Exercise workout={workout} index={index} />
      <PreviousButton index={index} setIndex={setIndex} />
      <NextButton index={index} setIndex={setIndex} length={workout.length} />
      <FinishButton index={index} length={workout.length} />
    </>
  );
}
