/**************************************************************************
 * Exercise component
 **************************************************************************/

export default function Exercise({ name, sets, reps }) {
  // Simple component to display name, # sets, and # reps for current exercise
  return (
    <>
      <h1>{name}</h1>
      <h4>
        {sets} sets of {reps} reps
      </h4>
    </>
  );
}
