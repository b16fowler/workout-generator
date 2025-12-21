/**************************************************************************
 * LoadWorkoutPage component
 **************************************************************************/

import axios from "axios";
import { user } from "../App.js";
import { EC2_URL } from "../../..";
import Footer from "../other/Footer";
import Header from "../other/Header";
import { useEffect, useState } from "react";

export default function LoadWorkoutPage() {
  const [workouts, setWorkouts] = useState(null);
  const [workoutPreview, setWorkoutPreview] = useState(null);

  // Call method to fetch user's workouts on component mount
  useEffect(() => {
    fetchWorkouts();
  }, []);

  useEffect(() => {
    if (!workoutPreview) return;

    console.log(workoutPreview);
  }, [workoutPreview]);

  // Fetch all saved workouts
  const fetchWorkouts = async () => {
    try {
      const response = await axios.post(`${EC2_URL}/api/load-workouts`, {
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
    // Find information of workout currently selected
    const workoutDetails = workouts.find(
      workout => workout.name === workoutName
    );

    setWorkoutPreview(workoutDetails.workout);
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
      {workoutPreview && (
        <div className="workout-preview">{workoutPreview}</div>
      )}
      <Footer />
    </>
  );
}
