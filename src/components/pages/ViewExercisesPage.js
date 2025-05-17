/**************************************************************************
 * ViewExercisesPage component
 **************************************************************************/

import ExerciseTable from "../ExerciseTable";
import ReturnHome from "../ReturnHome";

export default function ViewExercisesPage() {
  return (
    <div>
      <h1 className="main-menu-header">ViewExercisesPage component</h1>
      <br />
      <br />
      <br />
      <ExerciseTable />
      <ReturnHome />
    </div>
  );
}
