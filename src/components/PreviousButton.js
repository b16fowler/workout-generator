/**************************************************************************
 * PreviousButton component
 **************************************************************************/

export default function PreviousButton({ index, setIndex }) {
  //TODO: WHEN DISABLED BUTTON SHOULD NOT HAVE HOVER EFFECTS
  return (
    <button
      className="previous-button"
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
