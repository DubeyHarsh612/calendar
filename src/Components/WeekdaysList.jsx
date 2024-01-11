import React from "react";

const WeekdaysList = ({ weekdays, schedule }) => {
  const filteredWeekdays = weekdays.filter(
    (day) =>
      day.formattedDate.split(", ")[0] !== "Sat" &&
      day.formattedDate.split(", ")[0] !== "Sun"
  );

  const presentDates = new Set(schedule.map((entry) => entry.Date));

  const generateCheckboxes = (day) => {
    const checkboxes = [];
    const startTime = 8; // 8 am
    const endTime = 23; // 11 pm

    for (let hour = startTime; hour <= endTime; hour++) {
      const isAfterNoon = hour >= 12;
      const ampm = isAfterNoon ? "PM" : "AM";
      const formattedHour = hour > 12 ? hour - 12 : hour;
      const formattedMinutes = "00";

      checkboxes.push(
        <div key={`${day.formattedDate}-${hour}`} className="checkbox">
          <input
            type="checkbox"
            id={`${day.formattedDate}-${hour}`}
            name={`${day.formattedDate}-${hour}`}
          />
          <label htmlFor={`${day.formattedDate}-${hour}`}>
            {`${formattedHour}:${formattedMinutes} ${ampm}`}
          </label>
        </div>
      );

      if (hour < endTime) {
        checkboxes.push(
          <div key={`${day.formattedDate}-${hour}-30`} className="checkbox">
            <input
              type="checkbox"
              id={`${day.formattedDate}-${hour}-30`}
              name={`${day.formattedDate}-${hour}-30`}
            />
            <label htmlFor={`${day.formattedDate}-${hour}-30`}>
              {`${formattedHour}:30 ${ampm}`}
            </label>
          </div>
        );
      }
    }

    return checkboxes;
  };

  return (
    <div className="weekdays-container">
      {filteredWeekdays.map((day) => (
        <div key={day.formattedDate} className="weekday-container">
          <div className="weekday-header">
            <p>
              {day.formattedDate.split(", ")[0]}
              <br />
              {day.formattedDate.split(", ")[1]}
            </p>
          </div>
          <div className="checkbox-container">
            {presentDates.has(day.formattedDate.split(", ")[1]) ? (
              <div className="checkbox">
                <input
                  type="checkbox"
                  id={`present-${day.formattedDate}`}
                  name={`present-${day.formattedDate}`}
                  checked
                />
                <label htmlFor={`present-${day.formattedDate}`}>
                  {schedule
                    .filter(
                      (entry) => entry.Date === day.formattedDate.split(", ")[1]
                    )
                    .map((entry) => entry.Time)
                    .join(", ")}
                </label>
              </div>
            ) : day.status === "past" ? (
              <p className="past-label">Past</p>
            ) : (
              generateCheckboxes(day)
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekdaysList;
