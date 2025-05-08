/**************************************************************************
 * AddExercisePage component contains a form that allows user to add a new
 * exercise to their pool.
 **************************************************************************/

export default function AddExercise() {
  return (
    <>
      <h1>AddExercisePage component</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="exercise-name">Enter name of exercise: </label>
        <input id="exercise-name" type="text" placeholder=""></input>
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
        <label htmlFor="exercise-reps">Enter number of reps per set:</label>
        <input id="exercise-reps" input="number" placeholder="1-50"></input>
        <br />
        <br />
        <label htmlFor="exercise-sets">Enter number of sets in workout:</label>
        <input id="exercise-sets" input="number" placeholder="1-10"></input>
        <br />
        <br />
        <label htmlFor="exercise-photo">Exercise photo (optional): </label>
        <input id="exercise-pic" type="file"></input>
        <br />
        <br />
        <input type="submit" value="Add exercise" />
      </form>
    </>
  );
}

function handleSubmit(e) {
  // Prevent page of reloading on submission
  e.preventDefault();

  // Pulling user inputs as variables
  console.log("AddExercise form submitted...");
  let nameInput = document.querySelector("#exercise-name").value;
  let typeInput = document.querySelector("#exercise-type").value;
  let repsInput = document.querySelector("#exercise-reps").value;
  let setsInput = document.querySelector("#exercise-sets").value;
  let picInput = document.querySelector("#exercise-pic").value;

  // Log all user inputs
  console.log(
    `nameInput: ${nameInput}\ntypeInput: ${typeInput}\nrepsInput: ${repsInput}\nsetsInput: ${setsInput} \npicInput: ${picInput}`
  );
}
