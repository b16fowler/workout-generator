/**************************************************************************
 * FinishedWorkoutPage component
 *
 * Component acts as a page that is rendered when user completes a workout.
 * This component currently holds only the ReturnHome button component and
 * the SaveWorkoutButton component
 **************************************************************************/

import Header from "../other/Header";
import Footer from "../other/Footer";
import ReturnHomeButton from "../buttons/ReturnHomeButton";
import SaveWorkoutButton from "../buttons/SaveWorkoutButton";
import ReloadWorkoutButton from "../buttons/ReloadWorkoutButton";
import LoadNewWorkoutButton from "../buttons/LoadNewWorkoutButton";

export default function FinishedWorkoutPage({ workout }) {
  return (
    <>
      <Header heading="Workout completed!" />
      <SaveWorkoutButton workout={workout} />
      <LoadNewWorkoutButton />
      <ReloadWorkoutButton />
      <ReturnHomeButton />
      <Footer />
    </>
  );
}
