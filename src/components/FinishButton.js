/**************************************************************************
 * FinishButton component
 **************************************************************************/

import MainMenuPage from "./MainMenuPage.js";
import { root } from "../index.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./LoginPage.js";

export default function FinishButton({ index, length }) {
  return (
    <button
      className="finish button"
      onClick={handleClick}
      hidden={index === length - 1 ? false : true}>
      Finish workout
    </button>
  );

  function handleClick() {
    // Remove exercise photo and render MainMenuPage
    document.body.remove(document.getElementById(index));

    root.render(
      <QueryClientProvider client={queryClient}>
        <MainMenuPage />
      </QueryClientProvider>
    );
  }
}
