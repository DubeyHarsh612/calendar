import React from "react";

const TimeZoneControls = ({ timezone, handleTimezoneChange }) => (
  <div>
    TimeZone:
    <div className="timezone-controls">
      <br />
      <select
        value={timezone}
        onChange={handleTimezoneChange}
        className="time-zone"
      >
        <option value="UTC">UTC-0</option>
        <option value="Australia/Sydney">Australia/Sydney</option>
      </select>
    </div>
  </div>
);

export default TimeZoneControls;
