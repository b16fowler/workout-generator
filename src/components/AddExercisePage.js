/**************************************************************************
 * AddExercisePage component
 * Contains a form that allows user to add a new
 * exercise to their pool.
 **************************************************************************/

import { user } from "./App.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
import { showSnackbar } from "./App.js";
import ReturnHome from "./ReturnHome.js";
import { useState } from "react";

export default function AddExercise() {
  const [photo, setPhoto] = useState(null);

  const handlePic = e => {
    // Prevent page of reloading on submission
    e.preventDefault();

    // set photo to file thats been queued for upload
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = e => {
    // Prevent page of reloading on submission
    e.preventDefault();

    // TODO: Make cleaner
    const formData = new FormData();
    const photoInput = document.querySelector("#exercise-pic");
    formData.append("user", user.name);
    formData.append("name", document.querySelector("#exercise-name").value);
    formData.append("type", document.querySelector("#exercise-type").value);
    formData.append("reps", document.querySelector("#exercise-reps").value);
    formData.append("sets", document.querySelector("#exercise-sets").value);
    formData.append("image", photoInput.files[0]);

    // Reset form
    document.getElementById("add-exercise-form").reset();

    fetch("http://localhost:5000/api/add", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(`data: `);
        console.log(data);
      })
      .catch(err => {
        console.error("Fetch failed:\n", err);
      });
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
        <input
          id="exercise-pic"
          type="file"
          name="uploaded-photo"
          onChange={handlePic}
        />
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
