/**************************************************************************
 * FinishButton component
 **************************************************************************/

import MainMenuPage from "./MainMenuPage.js";
import { queryClient } from "./LoginPage.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { root } from "../index.js";
import { showSnackbar } from "./App.js";

export default function FinishButton({ index, length }) {
  /* FinishButton remains hidden until user is on the final exercise
   * of their workout */
  return (
    <>
      <button
        className="finish-button"
        onClick={handleClick}
        hidden={index === length - 1 ? false : true}>
        Finish workout
      </button>
    </>
  );

  function handleClick() {
    showSnackbar("Workout completed!");

    // Rerender MainMenuPage once snackbar is finished
    setTimeout(() => {
      while (document.querySelector(".exercise-div")) {
        document.body.removeChild(document.querySelector(".exercise-div"));
      }

      // Load MainMenu once workout is finished
      root.render(
        <QueryClientProvider client={queryClient}>
          <MainMenuPage />
        </QueryClientProvider>
      );
    }, 2500);
  }
}
