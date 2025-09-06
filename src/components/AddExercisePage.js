/**************************************************************************
 * AddExercisePage component
 * Contains a form that allows user to add a new
 * exercise to their pool.
 **************************************************************************/

import { user } from "./App.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
import { showSnackbar } from "../index.js";
import ReturnHome from "./ReturnHome.js";
import FetchWrapper from "../fetchWrapper.js";
import { useEffect, useState } from "react";

export default function AddExercise() {
  const [preview, setPreview] = useState(null);
  const [photo, setPhoto] = useState(null);

  const handleTest = e => {
    e.preventDefault();

    const formData = new FormData();
    const input = document.querySelector("#testPhoto");
    formData.append("image", input.files[0]);

    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .then(data => {
        console.log(`data: `);
        console.log(data);
      })
      .catch(err => {
        console.error("Fetch failed:\n", err);
      });
  };

  const handleLoadImage = e => {
    e.preventDefault();

    fetch("http://localhost:5000/load")
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const img = document.createElement("img");

        img.src = url;
        img.style.width = "300px";
        img.style.height = "auto";
        img.style.borderRadius = "0";
        document.body.appendChild(img);
      })
      .catch(err => {
        console.error(err);
      });
  };

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
    formData.append("sets", document.querySelector("#exercise-reps").value);
    formData.append("reps", document.querySelector("#exercise-sets").value);
    formData.append("image", photoInput.files[0]);

    // Check for empty mandatory fields
    // if (
    //   typeInput === "Please select" ||
    //   !nameInput ||
    //   !repsInput ||
    //   !setsInput ||
    //   !photoInput
    // ) {
    //   showSnackbar("All fields are required, please try again");
    // }
    // Check that entered reps/sets are in range
    // else if (
    //   0 >= repsInput ||
    //   50 < repsInput ||
    //   0 >= setsInput ||
    //   10 < setsInput
    // ) {
    //   showSnackbar(
    //     "Sets or reps outside of acceptable range, please try again"
    //   );
    // } else {
    // All fields valid, reset form and inform user
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
        {preview && (
          <img src="{preview}" alt="preview" style={{ maxWidth: "300px" }} />
        )}
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

      <form
        action="/api/add"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleTest}>
        <label>
          Test form:
          <br />
        </label>
        <input
          id="testPhoto"
          type="file"
          name="image"
          onChange={handlePic}></input>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>

      <br />
      <br />
      <button type="button" onClick={handleLoadImage}>
        Load image
      </button>

      <Footer />
    </>
  );
}
