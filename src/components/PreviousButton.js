export default function PreviousButton() {
  return (
    <button className="previous-button" onClick={prevClick}>
      Previous exercise
    </button>
  );
}

function prevClick() {
  console.log("Previous button clicked");
}
