/**************************************************************************
 * TODO:
 * Fix 'value prop' error on form render
 **************************************************************************/

import ReturnHome from "../ReturnHome";
// import { userExercises } from "../App";

export default function GenerateWorkout() {
  return (
    <>
      <h1 className="main-menu-header">GenerateWorkoutPage component</h1>
      <br />
      <h3>Select all exercise types to be included in workout</h3>
      <form id="add-exercise-form" onSubmit={handleSubmit}>
        <input type="checkbox" id="arms" name="arms" value="arms" />
        <label htmlFor="arms">Arms </label>
        <input type="checkbox" id="back" name="back" value="back" />
        <label htmlFor="back">Back </label>
        <input type="checkbox" id="legs" name="legs" value="legs" />
        <label htmlFor="legs">Legs </label>
        <input type="checkbox" id="core" name="core" value="core" />
        <label htmlFor="core">Core </label>
        <br />
        <br />
        <label>Number of exercises in workout: </label>
        <input
          type="number"
          id="numExercises"
          placeholder="Leave blank for all"
        ></input>
        <br />
        <br />
        <input type="Submit" value="Generate workout" />
        <br />
        <br />
        <h4>To select all types, select none</h4>
      </form>
      <ReturnHome />
    </>
  );
}

function handleSubmit(e) {
  // Prevent page of reloading on submission
  e.preventDefault();

  // Pull form values
  const formValues = {
    arms: document.querySelector("#arms").checked,
    back: document.querySelector("#arms").checked,
    legs: document.querySelector("#arms").checked,
    core: document.querySelector("#arms").checked,
    num: document.querySelector("#numExercises").value,
  };

  console.log(formValues);
}
