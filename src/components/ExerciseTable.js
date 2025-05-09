/**************************************************************************
 * TODO:
 * Fix 'unique key prop' error during table render
 **************************************************************************/
import { userExercises } from "./App";
import "../css/ExerciseTable.css";

export default function ExerciseTable() {
  return userExercises.map((exercise, index) => {
    return (
      <>
        {index === 0 && (
          <table id="exercise-table-head" className="cell-border">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Reps</th>
                <th>Sets</th>
                <th>Pic</th>
              </tr>
            </thead>
          </table>
        )}
        <table id="exercise-table-body" className="cell-border">
          <tbody>
            <tr>
              <td>{exercise.name}</td>
              <td>{exercise.type}</td>
              <td>{exercise.reps}</td>
              <td>{exercise.sets}</td>
              <td>{exercise.pic}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  });
}
