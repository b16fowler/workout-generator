/**************************************************************************
 * ViewExercisesPage component
 *
 * Simple component meant to display the ExerciseTable component, along with
 * the Header, Footer, and ReturnHome
 **************************************************************************/

import ExerciseTable from "./ExerciseTable.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import ReturnHome from "./ReturnHomeButton.js";

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
