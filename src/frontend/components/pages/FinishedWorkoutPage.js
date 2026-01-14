/**************************************************************************
 * FinishedWorkoutPage component
 *
 * Component acts as a page that is rendered when user completes a workout.
 * This component currently holds only the ReturnHome button component and
 * the SaveWorkoutButton component
 **************************************************************************/

import Header from "../other/Header";
import Footer from "../other/Footer";
import { useState } from "react";
import ReturnHomeButton from "../buttons/ReturnHomeButton";
import SaveWorkoutButton from "../buttons/SaveWorkoutButton";
import ReloadWorkoutButton from "../buttons/ReloadWorkoutButton";
import LoadNewWorkoutButton from "../buttons/LoadNewWorkoutButton";
import Workout from "../other/WorkoutPage";

export default function FinishedWorkoutPage({ workout }) {
  const [reload, setReload] = useState(false);

  return (
    <>
      <Header heading="Workout completed!" />
      {!reload && <SaveWorkoutButton workout={workout} />}
      {!reload && <LoadNewWorkoutButton />}
      {!reload && (
        <ReloadWorkoutButton
          workout={workout}
          reload={reload}
          setReload={setReload}
        />
      )}
      {reload && <Workout workout={workout} />}
      <ReturnHomeButton />
      <Footer />
    </>
  );
}
