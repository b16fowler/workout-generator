/**************************************************************************
 * NextButton component
 **************************************************************************/

export default function NextButton({ index, setIndex, length }) {
  return (
    <button
      className="next button"
      onClick={handleClick}
      hidden={index === length - 1 ? true : false}
    >
      Next exercise
    </button>
  );

  function handleClick() {
    // Remove current image before next one is displayed
    document.body.removeChild(document.querySelector(".exercise-div"));

    setIndex(index + 1);
  }
}
