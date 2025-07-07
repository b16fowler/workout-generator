/**************************************************************************
 * ReturnHome component
 **************************************************************************/

import { root } from "../index.js";
import MainMenuPage from "./MainMenuPage.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./LoginPage.js";

export default function ReturnHome() {
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
  root.render(
    <QueryClientProvider client={queryClient}>
      <MainMenuPage />
    </QueryClientProvider>
  );
}
