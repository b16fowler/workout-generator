/**************************************************************************
 * ViewExercisesPage component
 **************************************************************************/

import ExerciseTable from "./ExerciseTable.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import ReturnHome from "./ReturnHome.js";

export default function ViewExercises() {
  return (
    <>
      <div className="view-exercise-page">
        <div>
          <Header heading="All Exercises" />{" "}
        </div>
        <div id="return-button-table">
          <ReturnHome />
        </div>
        <div className="exercise-table-div">
          <ExerciseTable />
        </div>
      </div>
      <Footer />
    </>
  );
}
