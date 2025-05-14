export default function NextButton() {
  return (
    <button className="next-button" onClick={nextClick}>
      Next exercise
    </button>
  );
}

function nextClick() {
  console.log("Next button clicked");
}
