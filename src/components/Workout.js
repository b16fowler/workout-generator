/**************************************************************************
 * Workout component
 **************************************************************************/

import { useState, useEffect } from "react";
import axios from "axios";
import PreviousButton from "./PreviousButton.js";
import NextButton from "./NextButton.js";
import Exercise from "./Exercise.js";
import FinishButton from "./FinishButton.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { user } from "./App.js";

export default function Workout({ numExercises, checkboxes }) {
  // Tracks index of given exercise in generated workout
  let [index, setIndex] = useState(0);

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's exercises from db
  for (let i = 0; i < numExercises; i++) {
    fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user._name }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }

  // Separate loop of fetch calls for user's exercise photos
  for (let i = 0; i < numExercises; i++) {
    fetch("http://localhost:5000/api/photos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user._name, offset: i }),
    })
      .then(response => response.blob())
      .then(blob => {
        // Create img + div
        const url = URL.createObjectURL(blob);
        const img = document.createElement("img");
        const div = document.createElement("div");

        // Style img
        img.src = url;
        img.style.width = "50%";
        img.style.height = "auto";
        img.style.borderRadius = "0";
        img.style.padding = "100px";

        // Style div
        div.style.display = "flex";
        div.style.justifyContent = "center";
        div.style.alignItems = "center";

        // Hide + append img
        img.id = i;
        img.hidden = true;
        // Show first img, hide rest
        img.hidden = img.id === "0" ? false : true;
        div.appendChild(img);
        document.body.appendChild(div);
      });
  }

  return (
    <>
      <Header heading={"Generated Workout"} />
      {/*<Exercise workout={workout} index={index} />
      <PreviousButton index={index} setIndex={setIndex} />
      <NextButton index={index} setIndex={setIndex} length={workout.length} />
      <FinishButton index={index} length={workout.length} /> */}
      <Footer />
    </>
  );
}
