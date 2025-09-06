/**************************************************************************
 * Exercise component
 **************************************************************************/

export default function Exercise({ workout, index }) {
  // Create HTML element for current exercise
  showExercise(workout[index], index);
}

function showExercise(exercise, index) {
  // Check if div with same ID exists already
  const existingDiv = document.getElementById(index);

  // Not sure why this is needed. For some reason after the API call is added
  // in Workout.js, this div is rendered twice
  if (!existingDiv) {
    console.log("Div for given index does not exist yet");
    // Create div to hold elements to be displayed
    let div = document.createElement("div");
    div.id = index;
    div.className = "exercise-div";

    // Create image element
    let img = document.createElement("img");
    img.className = "exercise-image";
    img.src = exercise.pic;
    img.alt = exercise.name;
    img.style.display = "block";

    // Create exercise number label
    let exerciseNum = document.createElement("h1");
    exerciseNum.innerText = `Exercise #${index + 1}: ${exercise.name}`;

    // Create reps/sets/label
    let exerciseInfo = document.createElement("h1");
    exerciseInfo.innerText = `${exercise.reps} reps for ${exercise.sets} sets`;

    div.append(exerciseNum, img, exerciseInfo);
    document.body.appendChild(div);
  }
}
