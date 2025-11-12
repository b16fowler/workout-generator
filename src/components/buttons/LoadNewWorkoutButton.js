/**************************************************************************
 * LoadNewWorkout component
 *
 * Button component that will show in the FinishedWorkoutPage component.
 * Clicking button will rerender the GenerateWorkoutPage for user to load
 * new workout
 **************************************************************************/

const handleLoadNewWorkout = () => {
  console.log("Load new workout button pressed");
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
