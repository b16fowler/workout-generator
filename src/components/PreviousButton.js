export default function PreviousButton({ index, setIndex }) {
  return (
    <button
      className="previous-button"
      onClick={handleClick}
      disabled={index === 0 ? true : false}
    >
      Previous exercise
    </button>
  );

  function handleClick() {
    // Remove current image before next one is displayed
    document.body.removeChild(document.querySelector(".exercise-div"));

    setIndex(index - 1);
  }
}
