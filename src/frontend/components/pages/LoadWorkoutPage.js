/**************************************************************************
 * LoadWorkoutPage component
 **************************************************************************/

import axios from "axios";
import { user } from "../App.js";
import { EC2_URL } from "../../..";
import Footer from "../other/Footer";
import Header from "../other/Header";
import Workout from "../other/Workout.js";
import { useEffect, useState } from "react";
import WorkoutPrevTable from "../tables/WorkoutPrevTable.js";
import ReturnHomeButton from "../buttons/ReturnHomeButton.js";

export default function LoadWorkoutPage() {
  const [workoutOptions, setWorkoutOptions] = useState(null);
  const [exercisePreview, setExercisePreview] = useState(null);
  const [workoutPreview, setWorkoutPreview] = useState([]);
  const [doneFetching, setDoneFetching] = useState(false);
  const [loadWorkout, setLoadWorkout] = useState(false);

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

  const handleSelectClick = () => {
    setLoadWorkout(true);
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
      {!loadWorkout && <label for="load-workout">Choose workout: </label>}
      {!loadWorkout && (
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
      )}
      {!loadWorkout && (
        <button type="submit" onClick={handleSelectClick}>
          Select workout
        </button>
      )}
      {doneFetching && !loadWorkout && (
        <WorkoutPrevTable workoutPreview={workoutPreview} />
      )}
      {loadWorkout && <Workout workout={workoutPreview} />}
      <ReturnHomeButton />
      <Footer />
    </>
  );
}
