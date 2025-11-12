/**************************************************************************
 * LoadNewWorkout component
 *
 * Button component that will show in the FinishedWorkoutPage component.
 * Clicking button will rerender the GenerateWorkoutPage for user to load
 * new workout
 **************************************************************************/

import { root } from "../../../index";
import { queryClient } from "../pages/LoginPage.js";
import { QueryClientProvider } from "@tanstack/react-query";
import GenerateWorkoutPage from "../pages/GenerateWorkoutPage";

const handleLoadNewWorkout = () => {
  // Rerender GenerareWorkoutPage component on click
  root.render(
    <QueryClientProvider client={queryClient}>
      <GenerateWorkoutPage />
    </QueryClientProvider>
  );
};

export default function ReloadWorkoutButton() {
  return (
    <>
      <button
        className="load-new-workout-button"
        onClick={handleLoadNewWorkout}
      >
        Load new workout
      </button>
    </>
  );
}
