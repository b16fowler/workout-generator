export default function Exercise({ workout, index }) {
  // Create HTML element for current exercise
  showExercise(workout[index], index);
}

function showExercise(exercise, index) {
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
