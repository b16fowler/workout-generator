/**************************************************************************
 * NextButton component
 *
 * Button displayed when user is in a workout. Controls state variable 'index'
 * on click
 **************************************************************************/

export default function NextButton({ index, setIndex, length }) {
  return (
    <button
      className="next-button"
      onClick={handleClick}
      hidden={index === length - 1 ? true : false}>
      Next exercise
    </button>
  );

  function handleClick() {
    // Hide current image
    document.getElementById(index).toggleAttribute("hidden");
    // Display next image
    document.getElementById(index + 1).toggleAttribute("hidden");

    // Update index
    setIndex(index + 1);
  }
}
