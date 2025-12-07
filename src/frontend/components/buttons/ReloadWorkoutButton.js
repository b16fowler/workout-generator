/**************************************************************************
 * ReloadWorkoutButton component
 *
 * Button component that will show in the FinishedWorkoutPage component.
 * Clicking button will refresh the workout user just finished
 **************************************************************************/

const handleReloadWorkout = () => {
  console.log("Reload workout button pressed");
};

export default function ReloadWorkoutButton() {
  return (
    <>
      <button className="reload-workout-button" onClick={handleReloadWorkout}>
        Reload workout
      </button>
    </>
  );
}
