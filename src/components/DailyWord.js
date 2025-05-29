/**************************************************************************
 * DailyWord component
 **************************************************************************/

import { useSuspenseQuery } from "@tanstack/react-query";

export default function DailyWord() {
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=${API_KEY}`;

  const response = useSuspenseQuery({
    queryKey: ["dailyword"],
    queryFn: () => fetch(url).then((response) => response.json()),
  });

  // Get word, then capitalize
  let word = response.data[0].meta.id;
  word = word[0].toUpperCase() + word.substring(1);

  // Get definition, then capitalize
  let def = response.data[0].shortdef[0];
  def = def[0].toUpperCase() + def.substring(1);

  // Get part of speech
  let pos = response.data[0].fl;

  return (
    <>
      <br />
      <br />
      <br />
      <div id="wotd-div">
        <h2>
          <strong>Word of the Day:</strong> <span id="word">{word}</span>{" "}
          <span id="pos">({pos})</span>
        </h2>
        <p id="defintion">{def}</p>
      </div>
    </>
  );
}
