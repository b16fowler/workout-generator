/**************************************************************************
 * AddExercisePage component contains a form that allows user to add a new
 * exercise to their pool.
 **************************************************************************/

import { userExercises } from "./App";
import Footer from "./Footer";
import Header from "./Header";
import ReturnHome from "./ReturnHome";

export default function AddExercise() {
  return (
    <>
      <Header heading="Add New Exercise" />
      <br />
      <br />
      <form id="add-exercise-form" onSubmit={handleSubmit}>
        <label htmlFor="exercise-name">
          Enter name of exercise<strong>*</strong>:{" "}
        </label>
        <input
          id="exercise-name"
          type="text"
          placeholder="Example: Push ups"
        ></input>
        <br />
        <br />
        <label htmlFor="exercise-type">
          Select type of exercise<strong>*</strong>:{" "}
        </label>
        <select id="exercise-type">
          <option>Please select</option>
          <option>Arms</option>
          <option>Back</option>
          <option>Legs</option>
          <option>Core</option>
        </select>
        <br />
        <br />
        <label htmlFor="exercise-reps">
          Enter number of reps per set<strong>*</strong>:{" "}
        </label>
        <input
          id="exercise-reps"
          input="number"
          min="1"
          max="50"
          placeholder="1-50"
        ></input>
        <br />
        <br />
        <label htmlFor="exercise-sets">
          Enter number of sets in workout<strong>*</strong>:{" "}
        </label>
        <input
          id="exercise-sets"
          input="number"
          min="1"
          max="10"
          placeholder="1-10"
        ></input>
        <br />
        <br />
        <label htmlFor="exercise-pic">Exercise photo: </label>
        <input id="exercise-pic" type="file"></input>
        <br />
        <p>
          <strong>*</strong> Indicates required field
        </p>
        <input className="button" type="submit" value="Add exercise" />
      </form>
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
  if (!nameInput || typeInput === "Please select" || !repsInput || !setsInput) {
    alert("Invalid user inputs found. Please try again");
  }
  // Check that entered reps/sets are in range
  else if (0 >= repsInput || 50 < repsInput) {
    alert("Reps input field not in acceptable range. Please try again");
  } else if (0 >= setsInput || 10 < setsInput) {
    alert("Sets input field not in acceptable range. Please try again");
  } else {
    // All fields valid, reset form and inform user
    document.getElementById("add-exercise-form").reset();
    alert("New exercise logged successfully");

    const currentInput = {
      name: nameInput,
      type: typeInput,
      reps: repsInput,
      sets: setsInput,
      pic: picInput,
    };

    // Push input onto master list
    userExercises.push(currentInput);
  }
}
