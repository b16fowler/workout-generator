/**************************************************************************
 * LoadWorkoutPage component
 **************************************************************************/

import axios from "axios";
import { user } from "../App.js";
import { EC2_URL } from "../../..";
import Footer from "../other/Footer";
import Header from "../other/Header";
import { useEffect, useState } from "react";
import WorkoutPrevTable from "../tables/WorkoutPrevTable.js";
import ReturnHomeButton from "../buttons/ReturnHomeButton.js";

export default function LoadWorkoutPage() {
  const [workouts, setWorkouts] = useState(null);
  const [exercisePreview, setExercisePreview] = useState(null);
  const [workoutPreview, setWorkoutPreview] = useState([]);
  const [doneFetching, setDoneFetching] = useState(false);

  // Call method to fetch user's workouts on component mount
  useEffect(() => {
    fetchWorkoutNames();
  }, []);

  useEffect(() => {
    setWorkoutPreview([...workoutPreview, exercisePreview]);
  }, [exercisePreview]);

  // Fetch all saved workouts
  const fetchWorkoutNames = async () => {
    try {
      const response = await axios.post(`${EC2_URL}/api/workout-names`, {
        username: user.username,
      });
      setWorkouts(response.data.workouts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectClick = () => {
    return;
  };

  const handleSelectChange = workoutName => {
    setWorkoutPreview("");
    // Find information of workout currently selected
    const workoutDetails = workouts.find(
      workout => workout.name === workoutName
    );
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
          {workouts &&
            workouts.map(workout => (
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
