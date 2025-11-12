/**************************************************************************
 * FinishButton component
 *
 * Button component displayed only when user has generated a workout and
 * is on the final exercise. On click, displays a snackbar letting the user
 * know they're done, then removes all exercise-divs that were appended
 * to the page, and returns user to the main menu
 **************************************************************************/

import { root } from "../../index.js";
import { showSnackbar, user } from "../App.js";
import { queryClient } from "../pages/LoginPage.js";
import { workoutFinished } from "../../analytics.js";
import { QueryClientProvider } from "@tanstack/react-query";
import FinishedWorkoutPage from "../pages/FinishedWorkoutPage.js";

export default function FinishButton({ index, length }) {
  /* FinishButton remains hidden until user is on the final exercise
   * of their workout */
  return (
    <>
      <button
        className="finish-button"
        onClick={handleClick}
        hidden={index === length - 1 ? false : true}
      >
        Finish workout
      </button>
    </>
  );

  function handleClick() {
    showSnackbar("Workout completed!");

    setTimeout(() => {
      // Remove exercise-divs from page
      while (document.querySelector(".exercise-div")) {
        document.body.removeChild(document.querySelector(".exercise-div"));
      }

      // Update analytics table
      workoutFinished(user.username);

      // Load FinishedWorkout once workout is finished
      root.render(
        <QueryClientProvider client={queryClient}>
          <FinishedWorkoutPage />
        </QueryClientProvider>
      );
    }, 2500);
  }
}
