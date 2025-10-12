/**************************************************************************
 * Clock component
 *
 * Displays live clock in bottom left corner of Header
 **************************************************************************/

import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = time.toLocaleTimeString();

  return (
    <p id="clock">
      <strong>{formattedTime}</strong>
    </p>
  );
}
