/**************************************************************************
 * PreviousButton component
 **************************************************************************/

export default function PreviousButton({ index, setIndex }) {
  return (
    <button
      className="previous button"
      onClick={handleClick}
      disabled={index === 0 ? true : false}>
      Previous exercise
    </button>
  );

  function handleClick() {
    document.getElementById(index).toggleAttribute("hidden");
    document.getElementById(index - 1).toggleAttribute("hidden");

    setIndex(index - 1);
  }
}
