import React from "react";

export const TaskSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 bg-[#FAF8F5] dark:bg-[#282522]/40 rounded-xl border border-[#736E67]/[0.05] h-[60px]"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="w-[22px] h-[22px] rounded-full bg-[#736E67]/10 dark:bg-[#FAF8F5]/10"></div>
            <div className="h-4 bg-[#736E67]/10 dark:bg-[#FAF8F5]/10 rounded w-1/2"></div>
          </div>
          <div className="flex gap-2">
            <div className="w-[28px] h-[28px] bg-[#736E67]/10 dark:bg-[#FAF8F5]/10 rounded-full"></div>
            <div className="w-[28px] h-[28px] bg-[#736E67]/10 dark:bg-[#FAF8F5]/10 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const HabitSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-[#FAF8F5] dark:bg-[#282522]/40 rounded-xl border border-[#736E67]/[0.06] p-5 h-[140px] flex flex-col justify-between"
        >
          <div>
            <div className="h-5 bg-[#736E67]/10 dark:bg-[#FAF8F5]/10 rounded w-2/3 mb-2"></div>
            <div className="h-3 bg-[#736E67]/10 dark:bg-[#FAF8F5]/10 rounded w-1/3"></div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="h-7 bg-[#736E67]/10 dark:bg-[#FAF8F5]/10 rounded-lg"></div>
            <div className="h-7 bg-[#736E67]/10 dark:bg-[#FAF8F5]/10 rounded-lg"></div>
            <div className="h-7 bg-[#736E67]/10 dark:bg-[#FAF8F5]/10 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const GratitudeSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-[350px] bg-[#FAF8F5] dark:bg-[#282522]/40 rounded-2xl border border-[#736E67]/[0.08]"></div>
    </div>
  );
};
