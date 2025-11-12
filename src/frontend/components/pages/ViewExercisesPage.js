/**************************************************************************
 * ViewExercisesPage component
 *
 * Simple component meant to display the ExerciseTable component, along with
 * the Header, Footer, and ReturnHome
 **************************************************************************/

import Header from "../other/Header.js";
import Footer from "../other/Footer.js";
import ExerciseTable from "../tables/ExerciseTable.js";
import ReturnHomeButton from "../buttons/ReturnHomeButton.js";

export default function ViewExercisesPage() {
  return (
    <>
      <div className="view-exercise-page">
        <div>
          <Header heading="All Exercises" />{" "}
        </div>
        <div id="return-button-table">
          <ReturnHomeButton />
        </div>
        <div className="exercise-table-div">
          <ExerciseTable />
        </div>
      </div>
      <Footer />
    </>
  );
}
