/* eslint-disable*/

import React, { useState, useEffect } from 'react';
function TimeUpdate() {
  // Define a state variable to store the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Use useEffect to update the time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p>{currentTime.toLocaleTimeString()}</p>
    </div>
  );
}

export default TimeUpdate;
