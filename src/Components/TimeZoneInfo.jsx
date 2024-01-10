import React, { useState, useEffect } from "react";
import WeekdaysList from "./WeekdaysList";

const TimeZoneInfo = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [timezone, setTimezone] = useState("UTC");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchFormattedDate = (dateTime, selectedTimezone) => {
    const options = {
      weekday: "short",
      month: "2-digit",
      day: "2-digit",
      timeZone: selectedTimezone,
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      dateTime
    );
    return formattedDate;
  };

  const fetchWeekdays = (startDate, selectedTimezone) => {
    const weekdays = [];
    let currentDate = new Date(startDate);

    currentDate.setUTCDate(
      currentDate.getUTCDate() - currentDate.getUTCDay() + 1
    );

    for (let i = 0; i < 5; i++) {
      const formattedDate = fetchFormattedDate(currentDate, selectedTimezone);

      const currentDateTimeUTC = new Date(
        currentDateTime.getUTCFullYear(),
        currentDateTime.getUTCMonth(),
        currentDateTime.getUTCDate(),
        currentDateTime.getUTCHours(),
        currentDateTime.getUTCMinutes(),
        currentDateTime.getUTCSeconds()
      );

      const currentDateUTC = new Date(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate(),
        currentDate.getUTCHours(),
        currentDate.getUTCMinutes(),
        currentDate.getUTCSeconds()
      );

      const status =
        currentDateUTC < currentDateTimeUTC
          ? "past"
          : currentDateUTC > currentDateTimeUTC
          ? "coming"
          : "current";

      weekdays.push({ date: currentDate, formattedDate, status });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekdays;
  };

  const handleTimezoneChange = (event) => {
    setTimezone(event.target.value);
  };

  const currentWeekStartDate = new Date(
    currentDateTime.getFullYear(),
    currentDateTime.getMonth(),
    currentDateTime.getDate() - ((currentDateTime.getDay() + 5) % 7) + 1
  );

  const weekdays = fetchWeekdays(currentWeekStartDate, timezone);

  return (
    <div>
      <div className="timezone-controls">
        <label>Timezone:</label>
        <select
          value={timezone}
          onChange={handleTimezoneChange}
          className="time-zone"
        >
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New_York</option>
          <option value="Australia/Sydney">Australia/Sydney</option>
        </select>
      </div>
      <div>
        <hr />
        <p>Weekdays:</p>
        <WeekdaysList weekdays={weekdays} />
      </div>
    </div>
  );
};

export default TimeZoneInfo;
