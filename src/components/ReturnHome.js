/**************************************************************************
 * ReturnHome component
 **************************************************************************/

import { root } from "..";
import MainMenuPage from "./pages/MainMenuPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./pages/LoginPage";

export default function ReturnHome() {
  return (
    <>
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
