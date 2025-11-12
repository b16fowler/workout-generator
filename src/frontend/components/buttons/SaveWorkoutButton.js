/**************************************************************************
 * SaveWorkoutButton component
 *
 * Component is visible when user is in the middle of a workout. Clicking
 * this button will save the generated workout for the user to come back
 * to another time
 **************************************************************************/

import axios from "axios";
import user from "../App.js";
import { EC2_URL } from "../../..";

export default function SaveWorkoutButton({ workout }) {
  const handleSaveWorkout = () => {
    console.log("Save workout button clicked");

    const fetchData = async () => {
      try {
        const response = await axios.post(`${EC2_URL}/api/save-workout`, {
          user: user.username,
          workout: workout,
        });

        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  };

  return (
    <>
      <button className="save-workout-button" onClick={handleSaveWorkout}>
        Save workout to library
      </button>
    </>
  );
}
