/**************************************************************************
 * ReloadWorkoutButton component
 *
 * Button component that will show in the FinishedWorkoutPage component.
 * Clicking button will refresh the workout user just finished
 **************************************************************************/

import { root } from "../../../index.js";
import { queryClient } from "../pages/LoginPage.js";
import { QueryClientProvider } from "@tanstack/react-query";
import GenerateWorkoutPage from "../pages/GenerateWorkoutPage";

export default function ReloadWorkoutButton({ workout }) {
  const handleReloadWorkout = (workout) => {
    root.render(
      <QueryClientProvider client={queryClient}>
        <GenerateWorkoutPage reloadedWorkout={workout} />
      </QueryClientProvider>
    );
  };

  return (
    <>
      <button
        className="reload-workout-button"
        onClick={function () {
          handleReloadWorkout(workout);
        }}
      >
        Reload workout
      </button>
    </>
  );
}
