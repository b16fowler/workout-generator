/**************************************************************************
 * ReloadWorkoutButton component
 *
 * Button component that will show in the FinishedWorkoutPage component.
 * Clicking button will refresh the workout user just finished
 **************************************************************************/

export default function ReloadWorkoutButton({ reload, setReload }) {
  const handleReloadWorkout = () => {
    setReload(true);
  };

  return (
    <>
      <button className="reload-workout-button" onClick={handleReloadWorkout}>
        Reload workout
      </button>
    </>
  );
}
