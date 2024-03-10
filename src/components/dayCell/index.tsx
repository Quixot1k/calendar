import React, { memo, useCallback } from "react";
import { useCalendarContext } from "../calendar/index";
import "./index.css";

interface DayCellProps {
  timestamp: number;
  isSunday: boolean;
}

const DayCell: React.FC<DayCellProps> = ({ timestamp, isSunday }) => {
  // context
  const { startDate, setStartDate, endDate, setEndDate, accentColor } =
    useCalendarContext();
  // variables
  const isStartOrEnd = startDate === timestamp || endDate === timestamp; // if this cell has been selected
  const isInTimeRange =
    startDate && endDate && timestamp > startDate && timestamp < endDate; // if this cell is in the range

  // functions
  const isLargerThan7Days = useCallback((ts1: number, ts2: number): Boolean => {
    return Math.abs(ts2 - ts1) / 1000 / 60 / 60 / 24 > 6;
  }, []);

  const handleDayClick = () => {
    if (!startDate && !endDate) {
      setStartDate(timestamp);
    } else if (startDate && !endDate) {
      // check if endDate is later than startDate
      if (timestamp <= startDate) {
        alert("please select a day later than the start date");
        return;
      }
      // check if the gap is larger than 7 days
      if (isLargerThan7Days(timestamp, startDate)) {
        alert("you can't select a day later than 7 days");
        return;
      }
      setEndDate(timestamp);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  return (
    <div
      className={`calendar-month-day-cell ${
        isStartOrEnd && "choosed-day-cell"
      } ${isInTimeRange && "in-range-day-cell"}`}
      onClick={handleDayClick}
    >
      <p
        className={`${isSunday ? "day-cell-sunday" : ""}`}
        style={isSunday && accentColor ? { color: accentColor } : {}}
      >
        {new Date(timestamp).getDate()}
      </p>
    </div>
  );
};

export default memo(DayCell);
