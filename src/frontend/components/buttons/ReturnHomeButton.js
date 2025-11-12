/**************************************************************************
 * ReturnHomeButton component
 *
 * Button component to return a user to the home page
 **************************************************************************/

import { root } from "../../../index.js";
import { queryClient } from "../pages/LoginPage.js";
import MainMenuPage from "../pages/MainMenuPage.js";
import { QueryClientProvider } from "@tanstack/react-query";

export default function ReturnHomeButton() {
  return (
    <>
      <br />
      <br />
      <div className="return-div">
        <button className="return-button" onClick={handleClick}>
          Return home
        </button>
      </div>
    </>
  );
}

function handleClick() {
  // Remove exercise-div, if user is still in a workout
  while (document.querySelector(".exercise-pic")) {
    document.body.removeChild(document.querySelector(".exercise-pic"));
  }

  // Render MainMenuPage component
  root.render(
    <QueryClientProvider client={queryClient}>
      <MainMenuPage />
    </QueryClientProvider>
  );
}
