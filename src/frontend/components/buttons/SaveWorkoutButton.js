/**************************************************************************
 * SaveWorkoutButton component
 *
 * Component is visible when user is in the middle of a workout. Clicking
 * this button will save the generated workout for the user to come back
 * to another time
 **************************************************************************/

import axios from "axios";
import { showSnackbar, user } from "../App.js";
import { EC2_URL } from "../../..";

export default function SaveWorkoutButton({ workout }) {
  //TODO: RESET TO MAIN MENU AFTER USER SAVES WORKOUT
  const handleSaveWorkout = e => {
    e.preventDefault();

    const workoutName = document.querySelector("#save-workout-input").value;
    const fetchData = async () => {
      try {
        const response = await axios.post(`${EC2_URL}/api/save-workout`, {
          username: user.username,
          workoutName: workoutName,
          workout: workout,
        });
        showSnackbar(response.data.message);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  };

  return (
    <>
      <form id="save-workout-form">
        <input id="save-workout-input" placeholder="Name of workout" />
        <button className="save-workout-button" onClick={handleSaveWorkout}>
          Save workout to library
        </button>
      </form>
    </>
  );
}
