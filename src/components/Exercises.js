export default function Exercises(prop) {
  // Use map function instead?
  prop.workout.forEach((exer, index) => {
    // Create HTML element for each exercise in workout
    showExercise(exer, index, 800, 500);
  });

  return;
}

function showExercise(exercise, index, width, height) {
  // Create div to hold elements to be displayed
  let div = document.createElement("div");
  div.className = "hidden-exercise";
  div.id = index;
  // Show div only if first index
  if (index === 0) {
    div.className = "displayed-exercise";
  }

  // Create image element
  let img = document.createElement("img");
  img.src = exercise.pic;
  img.width = width;
  img.height = height;
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
