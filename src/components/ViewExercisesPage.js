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
      <div>
        <Header heading="All Exercises" />
        <ReturnHome />
        <br />
        <ExerciseTable />
      </div>
      <div id="snackbar"></div>
      <Footer />
    </>
  );
}
