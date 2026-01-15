/**************************************************************************
 * LoadWorkoutPage component
 **************************************************************************/

import { queryClient } from "./LoginPage.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { root } from "../../..";
import axios from "axios";
import { user } from "../App.js";
import { EC2_URL } from "../../..";
import Footer from "../other/Footer";
import Header from "../other/Header";
import WorkoutPage from "./WorkoutPage.js";
import { useEffect, useState } from "react";
import WorkoutPrevTable from "../tables/WorkoutPrevTable.js";
import ReturnHomeButton from "../buttons/ReturnHomeButton.js";

export default function LoadWorkoutPage() {
  const [doneFetching, setDoneFetching] = useState(false);
  const [workoutPreview, setWorkoutPreview] = useState([]);
  const [workoutOptions, setWorkoutOptions] = useState(null);
  const [exercisePreview, setExercisePreview] = useState(null);

  // Call method to fetch user's workouts on component mount
  useEffect(() => {
    fetchWorkoutOptions();
  }, []);

  useEffect(() => {
    setWorkoutPreview([...workoutPreview, exercisePreview]);
  }, [exercisePreview]);

  // Fetch all saved workouts
  const fetchWorkoutOptions = async () => {
    try {
      const response = await axios.post(`${EC2_URL}/api/workout-options`, {
        username: user.username,
      });
      setWorkoutOptions(response.data.workoutOptions[0]);
    } catch (err) {
      console.log(err);
    }
  };

  //TODO FIX BUG CAUSING NOT ALL EXERCISES TO LOAD CONSISTENTLY

  //TODO THIS IS COPIED FROM GENERATEWORKOUTPAGE, MAKE METHOD FOR REUSE
  //TODO METHOD FILE?
  const handleSelectClick = () => {
    try {
      // Use workoutPreview id's to fetch exercise images
      workoutPreview.forEach(async (exer, i) => {
        const response = await axios.post(
          `${EC2_URL}/api/photos`,
          {
            username: user.username,
            exerciseName: exer.name,
          },
          {
            responseType: "blob",
          }
        );

        const blob = response.data;

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
    } catch (err) {}

    // Render WorkoutPage component
    root.render(
      <QueryClientProvider client={queryClient}>
        <WorkoutPage workout={workoutPreview} />
      </QueryClientProvider>
    );
  };

  const handleSelectChange = workoutName => {
    setWorkoutPreview("");
    // Find information of workout currently selected
    const workoutDetails = workoutOptions.find(
      workout => workout.name === workoutName
    );

    // Prevent error if user returns to default dropdown option
    if (!workoutDetails) return;

    // Split workout IDs into array
    const workoutArray = workoutDetails.workout.split(" ");
    const fetchExercisePreview = async id => {
      try {
        const response = await axios.post(`${EC2_URL}/api/load-preview`, {
          username: user.username,
          id: id,
        });
        // console.log(response.data.preview.name);
        setExercisePreview(response.data.preview);
      } catch (err) {
        console.log(err);
      }
    };

    workoutArray.forEach(id => {
      // Ignore empty string at the end of workoutArray
      if (id === "") return;
      fetchExercisePreview(id);
    });

    setDoneFetching(true);
  };

  return (
    <>
      <Header heading="Load Saved Workout" />
      <label for="load-workout">Choose workout: </label>
      <select
        id="load-workout"
        name="load-workout"
        onChange={() =>
          handleSelectChange(document.querySelector("#load-workout").value)
        }>
        <option value="test">Test</option>
        <ul>
          {workoutOptions &&
            workoutOptions.map(workout => (
              <option value={workout.name}>{workout.name}</option>
            ))}
        </ul>
      </select>
      <button type="submit" onClick={handleSelectClick}>
        Select workout
      </button>
      {doneFetching && <WorkoutPrevTable workoutPreview={workoutPreview} />}
      <ReturnHomeButton />
      <Footer />
    </>
  );
}
