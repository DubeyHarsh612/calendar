import React, { useState, useEffect } from "react";
import WeekdaysList from "./WeekdaysList";
import scheduleData from "../../scheduleData.json";
import WeekNavigationButtons from "./WeekNavigationButtons";
import TimeZoneControls from "./TimeZoneControls";

const WeeklySchedule = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [timezone, setTimezone] = useState("UTC");
  const [schedule, setSchedule] = useState([]);
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(
    new Date(
      currentDateTime.getFullYear(),
      currentDateTime.getMonth(),
      currentDateTime.getDate() - ((currentDateTime.getDay() + 5) % 7) + 1
    )
  );

  useEffect(() => {
    setSchedule(scheduleData);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      const sydneyTime = currentDateTime
        .toLocaleString("en-US", { ...options, timeZone: "Australia/Sydney" })
        .replace(/\u200E/g, "");

      const utcTime = currentDateTime
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchFormattedDate = (dateTime, selectedTimezone) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: selectedTimezone,
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      dateTime
    );

    const parts = formattedDate.split(", ");
    const dateParts = parts[1].split("/");
    const formattedDateCustom = `${parts[0]}, ${dateParts[2]}/${dateParts[0]}/${dateParts[1]}`;

    return formattedDateCustom;
  };

  const fetchWeekdays = (startDate, selectedTimezone) => {
    const weekdays = [];
    let currentDate = new Date(startDate);

    currentDate.setUTCDate(currentDate.getUTCDate() - currentDate.getUTCDay());

    for (let i = 0; i < 7; i++) {
      const formattedDate = fetchFormattedDate(currentDate, selectedTimezone);

      const currentDateTimeInTimezone = new Date(
        currentDateTime.toLocaleString("en-US", { timeZone: selectedTimezone })
      );

      const currentDateInTimezone = new Date(
        currentDate.toLocaleString("en-US", { timeZone: selectedTimezone })
      );

      const currentDateTimeUTC = new Date(
        currentDateTime.toISOString().slice(0, 10) + "T00:00:00Z"
      );

      const status =
        currentDateInTimezone.toISOString().slice(0, 10) <
        currentDateTimeUTC.toISOString().slice(0, 10)
          ? "past"
          : currentDateInTimezone.toISOString().slice(0, 10) >
            currentDateTimeUTC.toISOString().slice(0, 10)
          ? "coming"
          : "coming";

      weekdays.push({ date: currentDate, formattedDate, status });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekdays;
  };

  const handleTimezoneChange = (event) => {
    setTimezone(event.target.value);
  };

  const previousWeek = () => {
    setCurrentWeekStartDate(
      new Date(currentWeekStartDate.getTime() - 7 * 24 * 60 * 60 * 1000)
    );
  };

  const nextWeek = () => {
    setCurrentWeekStartDate(
      new Date(currentWeekStartDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    );
  };

  const handleLoadWeek = () => {
    const allDates = schedule.map((entry) => new Date(entry.Date));
    console.log(allDates);

    const earliestDate = new Date(Math.min.apply(null, allDates));
    console.log(earliestDate);

    const startOfWeek = new Date(
      earliestDate.getFullYear(),
      earliestDate.getMonth(),
      earliestDate.getDate() - ((earliestDate.getDay() + 5) % 7) + 1
    );

    setCurrentWeekStartDate(startOfWeek);
  };

  const handleCurrentWeek = () => {
    const startOfWeek = new Date(
      currentDateTime.getFullYear(),
      currentDateTime.getMonth(),
      currentDateTime.getDate() - ((currentDateTime.getDay() + 5) % 7) + 1
    );

    setCurrentWeekStartDate(startOfWeek);
  };

  const weekdays = fetchWeekdays(currentWeekStartDate, timezone);

  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: timezone,
  });

  return (
    <>
      <WeekNavigationButtons
        previousWeek={previousWeek}
        handleCurrentWeek={handleCurrentWeek}
        nextWeek={nextWeek}
        formattedDate={formattedDate}
      />
      <TimeZoneControls
        timezone={timezone}
        handleTimezoneChange={handleTimezoneChange}
      />
      <div>
        <hr />
        <WeekdaysList weekdays={weekdays} schedule={schedule} />
      </div>
      <hr />
      <button onClick={handleLoadWeek}>calendar</button>
    </>
  );
};

export default WeeklySchedule;
