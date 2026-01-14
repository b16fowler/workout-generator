/**************************************************************************
 * SaveWorkoutButton component
 *
 * Component is visible when user is in the middle of a workout. Clicking
 * this button will save the generated workout for the user to come back
 * to another time
 **************************************************************************/

import axios from "axios";
import { root } from "../../..";
import React from "react";
import { showSnackbar, user } from "../App.js";
import { EC2_URL } from "../../..";
import MainMenuPage from "../pages/MainMenuPage.js";

export default function SaveWorkoutButton({ workout }) {
  const handleSaveWorkout = e => {
    e.preventDefault();

    // Remove hidden images left from workout
    while (document.querySelector(".exercise-div")) {
      document.body.removeChild(document.querySelector(".exercise-div"));
    }

    const workoutName = document.querySelector("#save-workout-input").value;
    const fetchData = async () => {
      try {
        const response = await axios.post(`${EC2_URL}/api/save-workout`, {
          username: user.username,
          workoutName: workoutName,
          workout: workout,
        });
        showSnackbar(response.data.message);

        setTimeout(() => {
          root.render(
            <React.StrictMode>
              <MainMenuPage />
            </React.StrictMode>
          );
        }, 1250);
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
