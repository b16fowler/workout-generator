/**************************************************************************
 * GenerateWorkoutPage component
 **************************************************************************/

import Workout from "./Workout";
import { userExercises } from "./App";
import { root } from "../index.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import ReturnHome from "./ReturnHome.js";

export default function GenerateWorkout() {
  return (
    <>
      <Header heading="Generate New Workout" />
      <br />
      <br />
      <div id="generate-page">
        <h3>Select all target muscles to be included in workout</h3>
        <form className="form" onSubmit={handleSubmit}>
          <input type="checkbox" id="arms" name="box" />
          <label htmlFor="arms">Arms </label>
          <input type="checkbox" id="back" name="box" />
          <label htmlFor="back">Back </label>
          <input type="checkbox" id="legs" name="box" />
          <label htmlFor="legs">Legs </label>
          <input type="checkbox" id="core" name="box" />
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
          <h4>To select all types, select none</h4>
        </form>
      </div>
      <ReturnHome />
      <Footer />
    </>
  );
}

// workout will contain all exercises based on which types were checked
function handleSubmit(e) {
  e.preventDefault();

  // Pull checkbox boolean values and assign to new object typeCheckboxes
  const formValues = document.getElementsByName("box");
  const typeCheckboxes = {};
  formValues.forEach((value) => {
    typeCheckboxes[value.id] = value.checked;
  });

  // If all checkboxes left blank, select all
  const noneChecked = Object.values(typeCheckboxes).every((value) => !value);
  if (noneChecked) {
    Object.keys(typeCheckboxes).forEach((key) => {
      typeCheckboxes[key] = true;
    });
  }

  const workout = userExercises.filter((exercise) => {
    return typeCheckboxes[exercise.type.toLowerCase()];
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
