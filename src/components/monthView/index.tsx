import React, { memo, useCallback, useEffect, useState } from "react";
import { useCalendarContext } from "../calendar/index";
import DayCell from "../dayCell";
import "./index.css";

interface MonthViewProps {
  year: number;
  month: number;
}
const MonthView: React.FC<MonthViewProps> = ({ year, month }) => {
  const { setStartDate, setEndDate } = useCalendarContext();
  const [timestampOfDays, setTimestampOfDays] = useState<number[]>([]); // all timestamps of days in this month

  // callbacks: optmize functions while re-rendering component
  // get total days in this month
  const getDaysInMonth = useCallback((date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }, []);
  // get the weekday of the frist day in this month
  const getFirstDayOfMonth = useCallback((date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }, []);
  // check if a certain day is Sunday
  const checkIsSunday = useCallback((ts: number) => {
    const date = new Date(ts);
    return date.getDay() === 0;
  }, []);
  // click empty space to reset start and end date
  const handleEmptySpaceClick = () => {
    setStartDate(null);
    setEndDate(null);
  };

  // variables
  const daysInMonth = getDaysInMonth(new Date(year, month, 1)); // total days in this month
  const firstDayOfMonth = getFirstDayOfMonth(new Date(year, month, 1)); // weekday of frist day in this month

  // useEffect
  useEffect(() => {
    let timestamps: number[] = [];
    // get timestamp of each days in this month (00:00)
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      // Get the timestamp for the current day and push it into the array
      timestamps.push(date.getTime());
    }
    setTimestampOfDays(timestamps);
  }, [year, month, daysInMonth]);

  // children
  const blanksBefore = Array.from({ length: firstDayOfMonth }, (_, index) => (
    <div
      key={index}
      className="calendar-month-grid"
      onClick={handleEmptySpaceClick}
    />
  ));

  const daysOfMonth = timestampOfDays.map((ts: number, index: number) => {
    return <DayCell key={ts} timestamp={ts} isSunday={checkIsSunday(ts)} />;
  });

  const blanksAfter = Array.from(
    { length: 6 - ((firstDayOfMonth + daysInMonth - 1) % 7) },
    (_, index) => (
      <div
        key={index}
        className="calendar-month-grid"
        onClick={handleEmptySpaceClick}
      />
    )
  );

  return (
    <div className="calendar-month-view" key={month}>
      {/* title */}
      <div className="calendar-month-title-container">
        <p className="calendar-month-title">
          {new Date(year, month, 1).toLocaleString("default", {
            month: "long",
          })}{" "}
          {year}
        </p>
      </div>
      {/* month grid view */}
      <div className="calendar-month-grid">
        {[...blanksBefore, ...daysOfMonth, ...blanksAfter]}
      </div>
    </div>
  );
};
export default memo(MonthView);
