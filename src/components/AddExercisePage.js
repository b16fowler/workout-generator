/**************************************************************************
 * AddExercisePage component
 * Contains a form that allows user to add a new
 * exercise to their pool.
 **************************************************************************/

import { userExercises, user } from "./App.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
import { showSnackbar } from "../index.js";
import ReturnHome from "./ReturnHome.js";
import FetchWrapper from "../fetchWrapper.js";

export default function AddExercise() {
  return (
    <>
      <Header heading="Add New Exercise" />
      <br />
      <br />
      <form id="add-exercise-form" onSubmit={handleSubmit}>
        <label htmlFor="exercise-name">Enter name of exercise: </label>
        <input
          id="exercise-name"
          type="text"
          placeholder="Example: Push ups"></input>
        <br />
        <br />
        <label htmlFor="exercise-type">Select type of exercise: </label>
        <select id="exercise-type">
          <option>Please select</option>
          <option>Arms</option>
          <option>Back</option>
          <option>Legs</option>
          <option>Core</option>
        </select>
        <br />
        <br />
        <label htmlFor="exercise-reps">Enter number of reps per set: </label>
        <input
          id="exercise-reps"
          input="number"
          min="1"
          max="50"
          placeholder="1-50"></input>
        <br />
        <br />
        <label htmlFor="exercise-sets">Enter number of sets in workout: </label>
        <input
          id="exercise-sets"
          input="number"
          min="1"
          max="10"
          placeholder="1-10"></input>
        <br />
        <br />
        <label htmlFor="exercise-pic">Exercise photo: </label>
        <input id="exercise-pic" type="file"></input>
        <br />
        <br />
        <br />
        <input className="button" type="submit" value="Add exercise" />
      </form>
      <div id="snackbar">"All fields are required."</div>
      <div id="snackbar">
        "Reps or sets input field(s) not in acceptable range. Please try again."
      </div>
      <ReturnHome />
      <Footer />
    </>
  );
}

function handleSubmit(e) {
  // Prevent page of reloading on submission
  e.preventDefault();

  // Pulling user inputs to store as object
  let nameInput = document.querySelector("#exercise-name").value;
  let typeInput = document.querySelector("#exercise-type").value;
  let repsInput = document.querySelector("#exercise-reps").value;
  let setsInput = document.querySelector("#exercise-sets").value;
  let picInput = document.querySelector("#exercise-pic").value;

  // Check for empty mandatory fields
  if (
    typeInput === "Please select" ||
    !nameInput ||
    !repsInput ||
    !setsInput ||
    !picInput
  ) {
    showSnackbar("All fields are required, please try again");
  }
  // Check that entered reps/sets are in range
  else if (
    0 >= repsInput ||
    50 < repsInput ||
    0 >= setsInput ||
    10 < setsInput
  ) {
    showSnackbar("Sets or reps outside of acceptable range, please try again");
  } else {
    // All fields valid, reset form and inform user
    document.getElementById("add-exercise-form").reset();

    const add_exercise = `INSERT INTO user_exercises VALUES ("${user.name}", "${nameInput}", "${typeInput}", "${repsInput}", "${setsInput}", "${picInput}");`;

    const API = new FetchWrapper("http://localhost:5000/api/add");
    API.post("", add_exercise).then(data => {
      showSnackbar(data.message);
    });
  }
}
