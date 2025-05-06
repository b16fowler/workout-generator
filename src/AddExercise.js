export default function AddExercise() {
  return (
    <>
      <div>
        <button
          className="mainMenu-btn"
          type="button"
          onClick={() => addExercise()}
        >
          Add a new exercise
        </button>
      </div>
    </>
  );
}

function addExercise() {
  console.log("Add exercise button pressed");
}
