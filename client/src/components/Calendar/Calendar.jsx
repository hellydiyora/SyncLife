import React, { useState, useEffect } from "react";
import "./Calendar.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Calendar = ({ onDateClick, selectedDate }) => {
  const [currDate, setCurrDate] = useState(new Date());
  const [currYear, setCurrYear] = useState(currDate.getFullYear());
  const [currMonth, setCurrMonth] = useState(currDate.getMonth());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const handlePrevNext = (change) => {
    const newMonth = currMonth + change;
    let newDate;

    if (newMonth < 0 || newMonth > 11) {
      newDate = new Date(currYear, newMonth, 1);
      setCurrYear(newDate.getFullYear());
      setCurrMonth(newDate.getMonth());
    } else {
      newDate = new Date(currYear, newMonth, 1);
      setCurrMonth(newMonth);
    }
  };

  const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
  const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
  const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

  const isToday = (day) => {
    const now = new Date();
    return day === now.getDate() && currMonth === now.getMonth() && currYear === now.getFullYear();
  };

  const isSelected = (day) => {
    return selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === currMonth && selectedDate.getFullYear() === currYear;
  };

  return (
    <div className="w-full max-w-xs bg-white rounded-2xl border border-[#736E67]/[0.08] shadow-sm flex flex-col p-5 font-sans">
      <header className="flex items-center justify-between mb-5">
        <p className="font-serif text-lg font-semibold text-[#2D2A26]">
          {`${months[currMonth]} ${currYear}`}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePrevNext(-1)}
            className="p-1.5 rounded-full text-[#736E67] hover:text-[#2D2A26] hover:bg-[#736E67]/[0.05] transition-colors"
          >
            <KeyboardArrowLeftIcon fontSize="small" />
          </button>
          <button
            onClick={() => handlePrevNext(1)}
            className="p-1.5 rounded-full text-[#736E67] hover:text-[#2D2A26] hover:bg-[#736E67]/[0.05] transition-colors"
          >
            <KeyboardArrowRightIcon fontSize="small" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-center text-[10px] font-semibold text-[#736E67] tracking-wider uppercase py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {[...Array(firstDayOfMonth)].map((_, index) => (
          <div key={`inactive-${index}`} className="text-center text-sm text-[#C4BFB8] py-2">
            {lastDateOfLastMonth - firstDayOfMonth + index + 1}
          </div>
        ))}

        {[...Array(lastDateOfMonth)].map((_, index) => {
          const day = index + 1;
          return (
            <div
              key={`active-${index}`}
              className={`text-center text-sm py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                isSelected(day)
                  ? "bg-[#7E8F7A] text-white font-semibold shadow-sm"
                  : isToday(day)
                  ? "text-[#7E8F7A] font-bold"
                  : "text-[#2D2A26] hover:bg-[#7E8F7A]/[0.08]"
              }`}
              onClick={() => onDateClick(new Date(currYear, currMonth, day))}
            >
              {day}
            </div>
          );
        })}

        {[...Array(6 - lastDayOfMonth)].map((_, index) => (
          <div key={`inactive-next-${index}`} className="text-center text-sm text-[#C4BFB8] py-2">
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
