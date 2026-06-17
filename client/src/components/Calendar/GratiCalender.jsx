import React, { useState, useEffect } from "react";
import "./GratiCalendar.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useSelector } from "react-redux";
const VITE_SERVER_IMAGE_URL = import.meta.env.VITE_SERVER_IMAGE_URL;

const GratiCalender = ({ onDateClick, selectedDate }) => {
  const [currDate, setCurrDate] = useState(new Date());
  const [currYear, setCurrYear] = useState(currDate.getFullYear());
  const [currMonth, setCurrMonth] = useState(currDate.getMonth());

  const gratitudes = useSelector((state) => state.gratitude.gratitudes);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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
  const lastDayOfMonth = new Date(
    currYear,
    currMonth,
    lastDateOfMonth
  ).getDay();
  const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
  const today = new Date();
  return (
    <div className="w-full max-w-md bg-white rounded-2xl border border-[#736E67]/[0.08] shadow-sm flex flex-col p-5 font-sans">
      <header className="flex items-center justify-between mb-5">
        <p className="font-serif text-lg font-semibold text-[#2D2A26]">{`${months[currMonth]} ${currYear}`}</p>
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
      <div className="cal ">
        <ul className="weeks p-2 grid grid-cols-7 gap-x-9 gap-y-2 list-none text-center justify-items-center">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul className="days p-2 grid grid-cols-7 gap-x-9 gap-y-2 list-none text-center justify-items-center">
          {[...Array(firstDayOfMonth)].map((_, index) => (
            <li key={`inactive-${index}`} className="inactive font-subTag">
              {lastDateOfLastMonth - firstDayOfMonth + index + 1}
            </li>
          ))}

          {[...Array(lastDateOfMonth)].map((_, index) => {
            const gratitudeEntry = gratitudes && gratitudes.find((data) => {
              const gratitudeDate = new Date(data.date);
              return (
                gratitudeDate.getUTCDate() === index + 1 &&
                gratitudeDate.getUTCMonth() === currMonth &&
                gratitudeDate.getUTCFullYear() === currYear
              );
            });
            const isImageFile = (filename) => {
              if (!filename) return false;
              const ext = filename.split(".").pop().toLowerCase();
              return ["jpg", "jpeg", "png", "gif", "webp", "svg", "heic", "heif"].includes(ext);
            };
            const hasImage =
              gratitudeEntry &&
              gratitudeEntry.image &&
              gratitudeEntry.image !== "blank.jpg" &&
              isImageFile(gratitudeEntry.image);
            const isSelected = selectedDate && selectedDate.getDate() === index + 1;

            return (
              <li
                key={`activee-${index}`}
                className={`activee min-h-14 font-extralight font-subTag ${
                  isSelected ? "font-bold text-white" : ""
                }`}
                onClick={() =>
                  onDateClick(new Date(currYear, currMonth, index + 1))
                }
              >
                <div className="grid">
                  <div
                    className={`w-[40px] h-10 flex items-center justify-center relative rounded-xl transition-all duration-300 ${
                      isSelected ? "border-2 border-[#2D2A26] shadow-sm" : ""
                    }`}
                  >
                    {hasImage ? (
                      <div className="relative w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden shadow-sm">
                        <img
                          src={`${VITE_SERVER_IMAGE_URL}/images/${gratitudeEntry.image}`}
                          alt="entry"
                          className="absolute inset-0 w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    ) : (
                      <span className="text-[13px] font-light text-[#2D2A26] select-none">
                        {index + 1}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}

          {[...Array(6 - lastDayOfMonth)].map((_, index) => (
            <li key={`inactive-next-${index}`} className="inactive font-subTag">
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GratiCalender;
