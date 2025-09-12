/**************************************************************************
 * Clock component
 **************************************************************************/

import { useState, useEffect } from "react";

export default function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = time.toLocaleTimeString();

  return <p id="clock">{formattedTime}</p>;
}
