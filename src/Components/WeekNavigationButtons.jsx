import React from "react";

const WeekNavigationButtons = ({
  previousWeek,
  handleCurrentWeek,
  nextWeek,
  formattedDate,
}) => (
  <div className="week-navigation-buttons">
    <button onClick={previousWeek} className="btns">
      ⬅ Previous Week
    </button>
    <button onClick={handleCurrentWeek} className="calendarbtn">
      {" "}
      {formattedDate}{" "}
    </button>
    <button onClick={nextWeek} className="btns">
      Next Week ➡
    </button>
  </div>
);

export default WeekNavigationButtons;
