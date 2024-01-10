// WeekNavigationButtons.jsx
import React, { useEffect, useState } from "react";

const WeekNavigationButtons = ({ onPreviousWeek, onNextWeek }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="week-navigation-buttons">
      <button onClick={onPreviousWeek}>Previous Week</button>
      <p> {formattedDate}</p>
      <button onClick={onNextWeek}>Next Week</button>
    </div>
  );
};

export default WeekNavigationButtons;
