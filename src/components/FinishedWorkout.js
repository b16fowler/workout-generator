/**************************************************************************
 * FinishedWorkout component
 *
 * Component acts as a page that is rendered when user completes a workout.
 * This component currently holds only the ReturnHome button component and
 * the SaveWorkoutButton component
 **************************************************************************/

import Footer from "./Footer";
import Header from "./Header";
import ReturnHome from "./ReturnHomeButton";
import SaveWorkoutButton from "./SaveWorkoutButton";

export default function FinishedWorkout() {
  return (
    <>
      <Header heading="Workout completed!" />
      <SaveWorkoutButton />
      <ReturnHome />
      <Footer />
    </>
  );
}
