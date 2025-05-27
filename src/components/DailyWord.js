/**************************************************************************
 * DailyWord component
 **************************************************************************/

export default function DailyWord() {
  const API_KEY = "9051cdc0-cdd3-45b7-82ca-6bf5d75da762";
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=${API_KEY}`;

  // fetch(url)
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));

  return (
    <div>
      <br />
      <br />
      <br />
      <h2 id="generate-page">Word of the Day:</h2>
    </div>
  );
}
