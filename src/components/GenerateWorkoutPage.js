/**************************************************************************
 * GenerateWorkoutPage component
 **************************************************************************/

import ReturnHome from "./ReturnHome.js";
import Workout from "./Workout.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { user } from "./App.js";
import { useEffect, useState } from "react";

export default function GenerateWorkout() {
  const [workout, setWorkout] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  // useEffect fetchs exercises from DB and then renders Workout component once
  // workout object has been updated
  //TODO: CHANGE SQL QUERY FOR ACCURATE CHECKBOX CALL
  useEffect(() => {
    if (!shouldFetch) return;

    const fetchExercises = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: user._name }),
        });
        const result = await response.json();
        setWorkout(result.exercises[0]);
      } catch (err) {
        console.error(err);
      } finally {
        document.getElementById("generate-page").hidden = true;
        setShouldFetch(false);
      }
    };

    fetchExercises();
  }, [shouldFetch]);

  function handleSubmit(e) {
    e.preventDefault();

    // Pull checkbox boolean values and assign to new object typeCheckboxes
    const formValues = document.getElementsByName("box");
    const checkboxes = {};
    formValues.forEach(value => {
      checkboxes[value.id] = value.checked;
    });

    // If all checkboxes left blank, check all
    const noneChecked = Object.values(checkboxes).every(value => !value);
    if (noneChecked) {
      Object.keys(checkboxes).forEach(key => {
        checkboxes[key] = true;
      });
    }

    // Get number of desired exercises
    let numExercises = document.querySelector("#numExercises").value;

    // If number of exercises field left blank, assign 1 to it
    // TODO: FIX HOW NUMEXERCISES WORKS FOR FETCH CALL
    // numExercises = numExercises ? numExercises : 1;

    // Separate loop of fetch calls for user's exercise photos
    // for (let i = 0; i < numExercises; i++) {
    //   fetch("http://localhost:5000/api/photos", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ user: user._name, offset: i }),
    //   })
    //     .then(response => response.blob())
    //     .then(blob => {
    //       // Create img
    //       const img = document.createElement("img");
    //       img.className = "exercise-image";
    //       img.src = URL.createObjectURL(blob);
    //       img.id = i;
    //       // Show first img, hide rest
    //       img.hidden = true;
    //       img.hidden = img.id === "0" ? false : true;

    //       // Create div
    //       const div = document.createElement("div");
    //       div.className = "exercise-div";

    //       // Append
    //       div.appendChild(img);
    //       document.body.appendChild(div);
    //     });
    // }

    setShouldFetch(true);
  }

  return (
    <>
      <Header heading="Generate New Workout" />
      <br />
      <br />
      <div id="generate-page">
        <h3>Select all target muscles to be included in workout</h3>
        <h4>To select all types, select none</h4>
        <br />
        <form className="form" onSubmit={handleSubmit}>
          <input type="checkbox" id="arms" name="box" />
          <label htmlFor="arms">Arms </label>
          <input type="checkbox" id="back" name="box" />
          <label htmlFor="back">Back </label>
          <input type="checkbox" id="legs" name="box" />
          <label htmlFor="legs">Legs </label>
          <input type="checkbox" id="core" name="box" />
          <label htmlFor="core">Core </label>
          <br />
          <br />
          <label htmlFor="numExercises">Number of exercises in workout: </label>
          <input
            type="number"
            id="numExercises"
            placeholder="Leave blank for all"></input>
          <br />
          <br />
          <input
            className="button"
            type="Submit"
            value="Generate workout"
            onChange={handleSubmit}
          />
          <br />
          <br />
        </form>
      </div>
      {workout && <Workout workout={workout} />}
      {!workout && <ReturnHome />}
      <Footer />
    </>
  );
}

// workout will contain all exercises based on which types were checked
// function handleSubmit(e) {
//   e.preventDefault();

//   // Pull checkbox boolean values and assign to new object typeCheckboxes
//   const formValues = document.getElementsByName("box");
//   const typeCheckboxes = {};
//   formValues.forEach(value => {
//     typeCheckboxes[value.id] = value.checked;
//   });

//   // If all checkboxes left blank, check all
//   const noneChecked = Object.values(typeCheckboxes).every(value => !value);
//   if (noneChecked) {
//     Object.keys(typeCheckboxes).forEach(key => {
//       typeCheckboxes[key] = true;
//     });
//   }

//   // Keep exercises of muscle types that were checked off
//   let workout = userExercises.filter(exercise => {
//     return typeCheckboxes[exercise.type.toLowerCase()];
//   });

//   // Check for number of exercises desired in workout
//   const numExercises = document.querySelector("#numExercises").value;
//   // Inform user if there are not enough logged exercises to generate workout of desired length
//   if (workout.length < numExercises) {
//     alert(
//       `Desired number of exercises (${numExercises})\nexceeds number of logged exercises of selected type(s) (${workout.length})\nGenerating workout of max possible length (${workout.length})`
//     );
//   }
//   // Randomize and trim workout
//   workout = jumbleWorkout(workout, numExercises);

//   displayWorkout(workout);
// }

// function displayWorkout(workout) {
//   // Hide rest of page to display image(s)
//   const toHide = document.querySelectorAll("#generate-page");
//   toHide.forEach(exercise => {
//     exercise.setAttribute("hidden", "true");
//   });

//   root.render(<Workout workout={workout} />);
// }

// function jumbleWorkout(workout, numExercises) {
//   /* Shuffle exercises with Fisher-Yates shuffle algorithm
//    * Iterate through array of exercises backwards, swapping it's index
//    * with a randomly generated number */
//   for (let i = workout.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [workout[i], workout[j]] = [workout[j], workout[i]];
//   }

//   // Check if a number of exercises was entered
//   if (numExercises) {
//     // Trim workout to fit number of exercises
//     workout = workout.slice(0, numExercises);
//   }

//   return workout;
// }
