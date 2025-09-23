/**************************************************************************
 * AddExercisePage component
 * Contains a form that allows user to add a new
 * exercise to their pool.
 **************************************************************************/

import { showSnackbar, user } from "./App.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
import ReturnHome from "./ReturnHome.js";

export default function AddExercise() {
  const blankFields = ["Please select", "", "undefined", undefined];
  const formData = new FormData();

  const handleSubmit = e => {
    // Prevent page of reloading on submission
    e.preventDefault();

    let readyToFetch = true;

    // Add user's input to FormData for fetch call body
    const photoInput = document.querySelector("#exercise-pic");
    formData.append("user", user.name);
    formData.append("name", document.querySelector("#exercise-name").value);
    formData.append("type", document.querySelector("#exercise-type").value);
    formData.append("reps", document.querySelector("#exercise-reps").value);
    formData.append("sets", document.querySelector("#exercise-sets").value);
    formData.append("image", photoInput.files[0]);

    formData.forEach(field => {
      if (blankFields.includes(field)) {
        readyToFetch = false;
        showSnackbar("All fields are mandatory, please try again.");
      }
    });

    // Reset form
    document.getElementById("add-exercise-form").reset();

    // If user filled out all fields, post exercise in DB
    if (readyToFetch) {
      fetch(`${process.env.EC2_IP}:${process.env.DB_PORT}/api/add`, {
        method: "POST",
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          showSnackbar("New exercise logged successfully!");
        })
        .catch(err => {
          console.error("Fetch failed:\n", err);
        });
    }
  };

  return (
    <>
      <Header heading="Add New Exercise" />
      <br />
      <br />
      <form
        id="add-exercise-form"
        encType="multipart/form-data"
        action="/api/add"
        method="post"
        onSubmit={handleSubmit}>
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
        <input id="exercise-pic" type="file" name="uploaded-photo" />
        <br />
        <br />
        <br />
        <input className="button" type="submit" value="Add exercise" />
      </form>
      <ReturnHome />
      <Footer />
      <div id="snackbar"></div>
    </>
  );
}
