/**************************************************************************
 * PreviousButton component
 *
 * Button displayed when user is in a workout. Controls state variable 'index'
 * on click
 **************************************************************************/

export default function PreviousButton({ index, setIndex }) {
  return (
    <button
      className="previous-button"
      onClick={handleClick}
      disabled={index === 0 ? true : false}>
      Previous exercise
    </button>
  );

  function handleClick() {
    // Hide current image
    document.getElementById(index).toggleAttribute("hidden");
    // Display previous image
    document.getElementById(index - 1).toggleAttribute("hidden");

    // Update index
    setIndex(index - 1);
  }
}
