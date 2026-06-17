import React from "react";
import moment from "moment";
import { useState, useEffect } from "react";

const HabitDetails = ({ habit, onClose, onToggleCompletion }) => {
  const [localCompletionStatus, setLocalCompletionStatus] = useState({});

  useEffect(() => {
    const initialStatus = habit.data.reduce((status, habitDate) => {
      // Use formatted UTC date as key to match consistently
      const key = moment.utc(habitDate.date).format("YYYY-MM-DD");
      status[key] = habitDate.isCompleted;
      return status;
    }, {});
    setLocalCompletionStatus(initialStatus);
  }, [habit.data]);

  const handleToggle = async (habitId, rawDate) => {
    try {
      const formattedDate = moment.utc(rawDate).format("YYYY-MM-DD");
      setLocalCompletionStatus((prevStatus) => ({
        ...prevStatus,
        [formattedDate]: !prevStatus[formattedDate],
      }));

      await onToggleCompletion(habitId, rawDate);
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  const today = moment().startOf('day');
  // Use UTC to prevent offset issues with endDate
  const endDate = moment.utc(habit.endDate).startOf('day');
  const isButtonDisabled = endDate.isBefore(today);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#2D2A26]/40 backdrop-blur-sm z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#736E67]/10 w-full max-w-4xl overflow-hidden animate-scaleIn flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#736E67]/[0.08] px-6 py-5 bg-white">
          <div>
            <p className="text-[#C38A72] text-[10px] font-semibold tracking-wider uppercase mb-0.5">Habit Details</p>
            <h2 className="font-serif text-2xl font-semibold text-[#2D2A26] capitalize">
              {habit.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#736E67]/[0.05] text-[#736E67] hover:text-[#2D2A26] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Info Area */}
        <div className="bg-[#FAF8F5] px-6 py-4 flex flex-wrap gap-x-8 gap-y-2 border-b border-[#736E67]/[0.04] text-sm text-[#736E67]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#2D2A26]">Start Date:</span>
            <span className="font-light">{moment.utc(habit.startDate).format("MMMM DD, YYYY")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#2D2A26]">End Date:</span>
            <span className="font-light">{moment.utc(habit.endDate).format("MMMM DD, YYYY")}</span>
          </div>
        </div>

        {/* Grid of Dates */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow">
          <h3 className="font-serif text-lg font-semibold text-[#2D2A26] mb-5">
            Completion Tracking
          </h3>
          
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {habit.data.map((habitDate) => {
              const formattedKey = moment.utc(habitDate.date).format("YYYY-MM-DD");
              const isCompleted = localCompletionStatus[formattedKey];
              return (
                <li
                  key={habitDate.date}
                  className="bg-white rounded-2xl border border-[#736E67]/[0.06] p-4 flex flex-col items-center justify-between text-center gap-3 hover:shadow-sm transition-all duration-300"
                >
                  <span className="text-xs font-semibold text-[#736E67] tracking-wider">
                    {moment.utc(habitDate.date).format("MMM DD, YYYY")}
                  </span>
                  
                  <button
                    disabled={isButtonDisabled}
                    onClick={() => handleToggle(habit._id, habitDate.date)}
                    className={`w-full py-2 px-4 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                      isCompleted
                        ? "bg-[#7E8F7A] text-white shadow-sm hover:bg-[#6B7D68]"
                        : "bg-[#C38A72]/10 text-[#C38A72] hover:bg-[#C38A72]/20"
                    }`}
                    style={{ opacity: isButtonDisabled ? 0.6 : 1 }}
                  >
                    {isCompleted ? "Completed" : "Incomplete"}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;
