/**************************************************************************
 * ExerciseTable component
 **************************************************************************/
import { userExercises } from "./App";

export default function ExerciseTable() {
  return userExercises.map((exercise, index) => {
    return (
      <div className="exercise-table">
        {index === 0 && (
          <table id="exercise-table-head" className="cell-border">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Reps</th>
                <th>Sets</th>
              </tr>
            </thead>
          </table>
        )}
        <table id="exercise-table" className="cell-border">
          <tbody>
            <tr>
              <td>{exercise.name}</td>
              <td>{exercise.type}</td>
              <td>{exercise.reps}</td>
              <td>{exercise.sets}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  });
}
