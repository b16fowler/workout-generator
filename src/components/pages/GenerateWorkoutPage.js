/**************************************************************************
 * GenerateWorkoutPage component
 **************************************************************************/

import ReturnHome from "../ReturnHome";
import Workout from "../Workout";
import { userExercises } from "../App";
import { root } from "../../index.js";

export default function GenerateWorkout() {
  return (
    <>
      <h1 className="main-menu-header">GenerateWorkoutPage component</h1>
      <br />
      <h3 id="generate-page">
        Select all target muscles to be included in workout
      </h3>
      <form id="generate-page" onSubmit={handleSubmit}>
        <input type="checkbox" id="arms" name="arms" />
        <label htmlFor="arms">Arms </label>
        <input type="checkbox" id="back" name="back" />
        <label htmlFor="back">Back </label>
        <input type="checkbox" id="legs" name="legs" />
        <label htmlFor="legs">Legs </label>
        <input type="checkbox" id="core" name="core" />
        <label htmlFor="core">Core </label>
        <br />
        <br />
        <label htmlFor="numExercises">Number of exercises in workout: </label>
        <input
          type="number"
          id="numExercises"
          placeholder="Leave blank for all"
        ></input>
        <br />
        <br />
        <input
          className="button"
          type="Submit"
          value="Generate workout"
          onChange={handleSubmit}
        />
        <br />
        <br />
        <h4 id="generate-page">To select all types, select none</h4>
      </form>
      <ReturnHome />
    </>
  );
}

// handleSubmit called when form submitted
// workout will contain all exercises based on which types were checked
function handleSubmit(e) {
  // TODO: import FormData ?

  // Prevent page of reloading on submission
  e.preventDefault();

  // Pull boolean form values
  let formValues = {
    arms: document.querySelector("#arms").checked,
    back: document.querySelector("#back").checked,
    legs: document.querySelector("#legs").checked,
    core: document.querySelector("#core").checked,
    num: document.querySelector("#numExercises").value,
  };

  // If all checkboxes left blank, select all
  const noneChecked = Object.values(formValues).every((value) => !value);
  if (noneChecked) {
    formValues = {
      arms: true,
      back: true,
      legs: true,
      core: true,
    };
  }

  const workout = userExercises.filter((exercise) => {
    // Add exercise if type was checked
    return formValues[exercise.type.toLowerCase()];
  });

  displayWorkout(workout);
}

function displayWorkout(workout) {
  // Hide rest of page to display image(s)
  const toHide = document.querySelectorAll("#generate-page");
  toHide.forEach((exercise) => {
    exercise.setAttribute("hidden", "true");
  });

  root.render(<Workout workout={workout} />);
}
