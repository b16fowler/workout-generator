import { userExercises } from "./App";
import "./ExerciseTable.css";

export default function ExerciseTable() {
  return userExercises.map((exercise, index) => {
    return (
      <>
        {index === 0 && (
          <table id="exercise-table-head" class="cell-border">
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
        <table id="exercise-table-body" class="cell-border">
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

  // <table id="exercise-table" class="display">
  //   <thead>
  //     <tr>
  //       <th>Name</th>
  //       <th>Type</th>
  //       <th>Reps</th>
  //       <th>Sets</th>
  //       <th>Pic</th>
  //     </tr>
  //   </thead>
  //   <tbody>
  //     <tr>
  //       <td>Tiger Nixon</td>
  //       <td>System Architect</td>
  //       <td>Edinburgh</td>
  //       <td>61</td>
  //       <td>2011-04-25</td>
  //     </tr>
  //     <tr>
  //       <td>Garrett Winters</td>
  //       <td>Accountant</td>
  //       <td>Tokyo</td>
  //       <td>63</td>
  //       <td>2011-07-25</td>
  //     </tr>
  //   </tbody>
  // </table>
}
