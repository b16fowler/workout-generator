/**************************************************************************
 * GenerateWorkoutPage component
 **************************************************************************/

import ReturnHome from "../ReturnHome";
import { userExercises } from "../App";

export default function GenerateWorkout() {
  return (
    <>
      <h1 className="main-menu-header">GenerateWorkoutPage component</h1>
      <br />
      <h3 id="generate-page">
        Select all exercise types to be included in workout
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
        <input type="Submit" value="Generate workout" onChange={handleSubmit} />
        <br />
        <br />
        <h4 id="generate-page">
          To select all types, select none (feature coming soon!)
        </h4>
      </form>
      <ReturnHome />
    </>
  );
}

// handleSubmit called when form submitted
// workout will contain all exercises based on which types were checked
function handleSubmit(e) {
  // Prevent page of reloading on submission
  e.preventDefault();

  // Pull boolean form values
  const formValues = {
    arms: document.querySelector("#arms").checked,
    back: document.querySelector("#back").checked,
    legs: document.querySelector("#legs").checked,
    core: document.querySelector("#core").checked,
    num: document.querySelector("#numExercises").value,
  };

  const workout = userExercises.filter((exercise) => {
    // Save type
    let type = exercise.type.toLowerCase();

    // Return current exercise if type was checked
    return formValues[type];
  });

  displayWorkout(workout);
}

function displayWorkout(workout) {
  // Hide rest of page to display image
  const toHide = document.querySelectorAll("#generate-page");
  toHide.forEach((item) => {
    item.setAttribute("hidden", "true");
  });

  workout.forEach((exer, index) => {
    showImage(exer.pic, 800, 500, exer.name, index);
  });
}

function showImage(src, width, height, alt, index) {
  let img = document.createElement("img");
  img.src = src;
  img.width = width;
  img.height = height;
  img.alt = alt;
  img.className = "center";

  // Show first image, hide rest
  img.style.display = "none";
  if (index === 0) {
    img.style.display = "block";
  }

  let execNum = document.createElement("h2");
  execNum.innerText = `Exercise #${index + 1}`;
  execNum.className = "center";

  document.body.appendChild(execNum);
  document.body.appendChild(img);
}
