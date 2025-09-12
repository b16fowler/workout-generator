/**************************************************************************
 * NextButton component
 **************************************************************************/

export default function NextButton({ index, setIndex, length }) {
  return (
    <button
      className="next button"
      onClick={handleClick}
      hidden={index === length - 1 ? true : false}>
      Next exercise
    </button>
  );

  function handleClick() {
    // Hide current image before displaying next
    document.getElementById(index).toggleAttribute("hidden");
    document.getElementById(index + 1).toggleAttribute("hidden");

    // Update index
    setIndex(index + 1);
  }
}
