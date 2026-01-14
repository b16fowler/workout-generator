/**************************************************************************
 * ReloadWorkoutButton component
 *
 * Button component that will show in the FinishedWorkoutPage component.
 * Clicking button will refresh the workout user just finished
 **************************************************************************/

import { root } from "../../..";
import WorkoutPage from "../other/WorkoutPage";
import { queryClient } from "../pages/LoginPage";
import { QueryClientProvider } from "@tanstack/react-query";

export default function ReloadWorkoutButton({ workout }) {
  const handleReloadWorkout = () => {
    root.render(
      <QueryClientProvider client={queryClient}>
        <WorkoutPage workout={workout} />
      </QueryClientProvider>
    );
  };

  return (
    <>
      <button className="reload-workout-button" onClick={handleReloadWorkout}>
        Reload workout
      </button>
    </>
  );
}
