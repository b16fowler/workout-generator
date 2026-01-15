/**************************************************************************
 * GenerateWorkoutPage component
 **************************************************************************/

import { queryClient } from "./LoginPage.js";
import { root } from "../../../index.js";
import { EC2_URL } from "../../../index.js";
import Header from "../other/Header.js";
import Footer from "../other/Footer.js";
import WorkoutPage from "./WorkoutPage.js";
import { useEffect, useState } from "react";
import { showSnackbar, user } from "../App.js";
import ReturnHomeButton from "../buttons/ReturnHomeButton.js";
import { QueryClientProvider } from "@tanstack/react-query";

export default function GenerateWorkoutPage() {
  const [workout, setWorkout] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  //TODO: FIX BUG WHEN USER GENERATES WORKOUT WITHOUT ADDING ANY TO POOL

  /* useEffect fetches exercise names, sets, and reps from DB after
   * user attempts to generate workout */
  useEffect(() => {
    if (!shouldFetch) return;

    // Pull checkbox boolean values
    const formValues = document.getElementsByName("box");

    // Keep array of selected types for SQL query
    let selectedTypes = [];
    formValues.forEach(type => {
      if (type.checked) selectedTypes.push("'" + type.id + "'");
    });

    // If user selected no types, select all
    if (selectedTypes.length === 0)
      // Double quotes are here so text can be inserted directly in query
      selectedTypes = ['"arms"', '"back"', '"legs"', '"core"'];

    /* Makes a post request to server containing username and selected
     * muscle types */
    const fetchExercises = async () => {
      try {
        const response = await fetch(`${EC2_URL}/api/generateWorkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.username,
            selectedTypes: selectedTypes,
          }),
        });
        const result = await response.json();
        const finalWorkout = cleanUpResult(result.exercises[0]);

        setWorkout(finalWorkout);
      } catch (err) {
        console.error(err);
      } finally {
        setShouldFetch(false);
      }
    };

    fetchExercises();
  }, [shouldFetch]);

  /* This useEffect hook fetches the corresponding images for each exercise
   * Triggered after the exercise name(s)/type(s) have been retrieved */
  useEffect(() => {
    if (!workout) return;

    // Separate loop of fetch calls for user's exercise photos
    for (let i = 0; i < workout.length; i++) {
      fetch(`${EC2_URL}/api/photos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          exerciseName: workout[i].name,
        }),
      })
        .then(response => response.blob())
        .then(blob => {
          // Create img
          const img = document.createElement("img");
          img.className = "exercise-image";
          img.src = URL.createObjectURL(blob);

          // Create div
          const div = document.createElement("div");
          div.className = "exercise-div";
          div.id = i;
          // Hide all to start
          div.hidden = true;

          // Append img to div
          div.appendChild(img);
          document.body.appendChild(div);
        });
    }

    console.log(workout);
    if (workout.length === 0) {
      showSnackbar("You haven't added any exercises yet");
    } else {
      // Render WorkoutPage component
      root.render(
        <QueryClientProvider client={queryClient}>
          <WorkoutPage workout={workout} />
        </QueryClientProvider>
      );
    }
  }, [workout]);

  const cleanUpResult = fetchedData => {
    /* cleanUpResult will take all of the fetched exercises from user's account.
       It starts by checking that user has enough logged exercises to make a 
       workout of that size. Then the order of exercises is randomized and 
       trimmed to the appropriate length */

    // Get number of desired exercises
    const numExercises = document.querySelector("#numExercises").value;

    // Verify that user has enough logged exercises to fill workout of size numExercises
    const validSize = fetchedData.length >= Number(numExercises);
    if (!validSize)
      showSnackbar(
        `Number of desired exercises too large. Generating workout with ${fetchedData.length} exercises.`
      );

    /* Shuffle exercises with Fisher-Yates shuffle algorithm
     * Iterate through array of exercises backwards, swapping it's index
     * with a randomly generated number */
    for (let i = fetchedData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [fetchedData[i], fetchedData[j]] = [fetchedData[j], fetchedData[i]];
    }

    // If user did not input desired number of exercises, do not slice
    if (!numExercises) return fetchedData;

    // Trim workout to desired number of exercises
    return fetchedData.slice(0, numExercises);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setShouldFetch(true);
  };

  return (
    <>
      <Header heading="Generate New Workout" />
      <div id="generate-page">
        <h3>Select all target muscles to be included in workout</h3>
        <h4>To select all types, leave blank</h4>
        <form className="generate-form" onSubmit={handleSubmit}>
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
            placeholder="Leave blank for all"
          />
          <br />
          <br />
          <br />
          <input
            className="generate-workout-button"
            type="Submit"
            value="Generate workout"
            onChange={handleSubmit}
          />
        </form>
      </div>
      <ReturnHomeButton />
      <Footer />
    </>
  );
}
