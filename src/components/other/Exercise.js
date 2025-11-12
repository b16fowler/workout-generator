/**************************************************************************
 * Exercise component
 *
 * Simple component to display name, # sets, and # reps for current exercise
 **************************************************************************/

export default function Exercise({ name, sets, reps }) {
  return (
    <>
      <h1 id="exercise-title">{name}</h1>
      <h4 id="exercise-details">
        {sets} sets of {reps} reps
      </h4>
    </>
  );
}
