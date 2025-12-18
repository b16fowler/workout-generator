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

  // Call method to fetch user's workouts on component mount
  useEffect(() => {
    fetchWorkouts();
  }, []);

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

  return (
    <>
      <Header heading="Load Saved Workout" />
      <label for="load-workout">Choose workout: </label>
      <select id="load-workout" name="load-workout">
        <option value="test">Test</option>
        <ul>
          {workouts &&
            workouts.map(workout => (
              <option value={workout.name}>{workout.name}</option>
            ))}
        </ul>
      </select>
      <Footer />
    </>
  );
}
