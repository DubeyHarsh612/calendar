import React from "react";

const WeekdaysList = ({ weekdays }) => {
  const generateCheckboxes = (day) => {
    const checkboxes = [];
    const startTime = 8; // 8 am
    const endTime = 23; // 11 pm

    for (let hour = startTime; hour <= endTime; hour++) {
      checkboxes.push(
        <div key={`${day.formattedDate}-${hour}`} className="checkbox">
          <input
            type="checkbox"
            id={`${day.formattedDate}-${hour}`}
            name={`${day.formattedDate}-${hour}`}
          />
          <label htmlFor={`${day.formattedDate}-${hour}`}>
            {`${hour}:${30}`}
          </label>
        </div>
      );

      // Add additional checkbox for half-hour interval
      if (hour < endTime) {
        checkboxes.push(
          <div key={`${day.formattedDate}-${hour}-30`} className="checkbox">
            <input
              type="checkbox"
              className="check"
              id={`${day.formattedDate}-${hour}-30`}
              name={`${day.formattedDate}-${hour}-30`}
            />
            <label htmlFor={`${day.formattedDate}-${hour}-30`}>
              {`${hour + 1}:${0}`}
            </label>
          </div>
        );
      }
    }

    return <div className="checkbox-container">{checkboxes}</div>;
  };

  return (
    <div className="weekdays-container">
      {weekdays.map((day, index) => (
        <div key={day.formattedDate} className="weekday-container">
          <div className="weekday-header">
            <p>
              {day.formattedDate.split(", ")[0]}
              <br />
              {day.formattedDate.split(", ")[1]}
            </p>
          </div>
          <div className="statuss">
            <p className="statuss">{day.status === "past" ? "past" : ""}</p>
          </div>
          {day.status === "coming" && generateCheckboxes(day)}
        </div>
      ))}
    </div>
  );
};

export default WeekdaysList;
