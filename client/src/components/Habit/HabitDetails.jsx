import React from "react";
import moment from "moment";
import { useState, useEffect } from "react";

const HabitDetails = ({ habit, onClose, onToggleCompletion }) => {
  const [localCompletionStatus, setLocalCompletionStatus] = useState({});

  useEffect(() => {
    const initialStatus = habit.data.reduce((status, habitDate) => {
      status[habitDate.date] = habitDate.isCompleted;
      return status;
    }, {});
    setLocalCompletionStatus(initialStatus);
  }, [habit.data]);

  const handleToggle = async (habitId, date) => {
    try {
      setLocalCompletionStatus((prevStatus) => ({
        ...prevStatus,
        [date]: !prevStatus[date],
      }));

      await onToggleCompletion(habitId, date);
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bgHabitDetail p-8 rounded-md min-w-60 shadow-lg max-h-96 overflow-y-auto">
        <h2 className="text-4xl font-semibold text-slate-800 mb-4">
          {habit.name}
        </h2>
        <p className="mb-4 text-gray-700">
          <strong>Start Date:</strong>{" "}
          {moment(habit.startDate).format("DD-MM-YYYY")}
          <strong> | End Date:</strong>{" "}
          {moment(habit.endDate).format("DD-MM-YYYY")}
        </p>
        <h3 className="text-xl font-medium mb-2 text-slate-800">
          Completion Status:
        </h3>
        <div>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {habit.data.map((habitDate) => (
              <li key={habitDate.date} className="mb-2">
                <span className="mr-2 font-semibold text-gray-800">
                  {moment(habitDate.date).format("DD-MM-YYYY")}:
                </span>
                <button
                  onClick={() => handleToggle(habit._id, habitDate.date)}
                  className={`py-1 px-2 rounded ${
                    localCompletionStatus[habitDate.date]
                      ? "bg-green-700"
                      : "bg-red-700"
                  } text-white `}
                >
                  {localCompletionStatus[habitDate.date]
                    ? "Completed"
                    : "Incomplete"}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="mt-6 bg-slate-600 text-white px-4 py-2 rounded-full hover:bg-slate-700 transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-slate-900"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HabitDetails;
