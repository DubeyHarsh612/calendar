import React, { useState } from "react";

const WeeklyCalendar = () => {
  const [startDate, setStartDate] = useState(new Date("2024-01-08")); // Assuming Monday as the start date
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const generateTimeSlots = () => {
    const timeSlots = Array.from({ length: 32 }, (_, index) => ({
      time: `${Math.floor(index / 2)
        .toString()
        .padStart(2, "0")}:${((index % 2) * 30).toString().padStart(2, "0")}`,
      checked: false,
    }));
    return timeSlots;
  };

  const [schedule, setSchedule] = useState(
    daysOfWeek.map((day, index) => ({
      date: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + index
      ),
      day: day,
      timeSlots: generateTimeSlots(),
    }))
  );

  const handleCheckboxChange = (dayIndex, timeSlotIndex) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((day, index) =>
        index === dayIndex
          ? {
              ...day,
              timeSlots: day.timeSlots.map((timeSlot, idx) =>
                idx === timeSlotIndex
                  ? { ...timeSlot, checked: !timeSlot.checked }
                  : timeSlot
              ),
            }
          : day
      )
    );
  };

  return (
    <div>
      {schedule.map((day, dayIndex) => (
        <div key={day.date}>
          <h3>
            {day.date.toDateString()} - {day.day}
          </h3>
          {day.timeSlots.map((timeSlot, timeSlotIndex) => (
            <div key={timeSlotIndex}>
              <input
                type="checkbox"
                checked={timeSlot.checked}
                onChange={() => handleCheckboxChange(dayIndex, timeSlotIndex)}
              />
              {timeSlot.time} - {timeSlot.time}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WeeklyCalendar;
