import React, { createContext, memo, useContext, useState } from "react";
import MonthView from "../monthView";
import "./index.css";

// context for start, end dates and customized accent color
const CalendarContext = createContext<{
  startDate: number | null;
  setStartDate: React.Dispatch<React.SetStateAction<number | null>>;
  endDate: number | null;
  setEndDate: React.Dispatch<React.SetStateAction<number | null>>;
  accentColor?: string | undefined;
}>({
  startDate: null,
  setStartDate: () => {},
  endDate: null,
  setEndDate: () => {},
  accentColor: undefined,
});

interface CalendarProps {
  year: number;
  width?: number | string;
  height?: number | string;
  accentColor?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  year,
  width,
  height,
  accentColor,
}) => {
  // variables
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // weekdays on calendar
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // total 12 months, index starting from 0

  // states
  const [startDate, setStartDate] = useState<number | null>(null); // select start date
  const [endDate, setEndDate] = useState<number | null>(null); // select end date

  return (
    <CalendarContext.Provider
      value={{ startDate, setStartDate, endDate, setEndDate, accentColor }}
    >
      <div className="calendar" style={{ width, height }}>
        {/* Weekday Header */}
        <div className="calendar-weekdays-grid">
          {daysOfWeek.map((weekday, index) => (
            <p
              key={index}
              className={`calendar-weekdays-text ${
                weekday === "Sun" ? "weekdays-sunday" : ""
              }`}
              style={{ color: weekday === "Sun" ? accentColor : "" }}
            >
              {weekday[0]}
            </p>
          ))}
        </div>
        {/* Month Views */}
        {months.map((month, _) => {
          return (
            <MonthView key={`${year}-${month}`} year={year} month={month} />
          );
        })}
      </div>
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext);
export default memo(Calendar);
