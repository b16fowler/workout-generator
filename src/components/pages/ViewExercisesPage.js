/**************************************************************************
 * ViewExercisesPage component
 **************************************************************************/

import ExerciseTable from "../ExerciseTable";
import ReturnHome from "../ReturnHome";
import Header from "../Header";

export default function ViewExercisesPage() {
  return (
    <div>
      <Header heading="All Exercises" />
      <br />
      <br />
      <br />
      <ExerciseTable />
      <ReturnHome />
    </div>
  );
}
