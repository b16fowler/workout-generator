/**************************************************************************
 * ViewExercisesPage component
 **************************************************************************/

import ExerciseTable from "./ExerciseTable";
import Header from "./Header";
import Footer from "./Footer";
import ReturnHome from "./ReturnHome";

export default function ViewExercises() {
  return (
    <>
      <div>
        <Header heading="All Exercises" />
        <ReturnHome />
        <br />
        <ExerciseTable />
      </div>
      <Footer />
    </>
  );
}
