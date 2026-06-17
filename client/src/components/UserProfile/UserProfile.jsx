import React, { useState } from "react";
import JournalProgress from "./JournalProgress";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import HabitProgress from "./HabitProgress";
import MoodProgress from "./MoodProgress";

const Progress = ({
  activeProgress,
  onJournalProgressClick,
  onHabitProgressClick,
  onMoodProgressClick,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <ul className="flex items-center justify-center gap-4 bg-white p-1.5 rounded-full border border-[#736E67]/[0.08] shadow-sm font-sans text-xs sm:text-sm font-medium tracking-wide">
        <li
          onClick={onJournalProgressClick}
          className={`flex-1 text-center py-2.5 px-4 rounded-full cursor-pointer transition-all duration-300 ${
            activeProgress === "journal"
              ? "bg-[#7E8F7A] text-white shadow-sm"
              : "text-[#736E67] hover:text-[#2D2A26] hover:bg-[#FAF8F5]"
          }`}
        >
          TaskMate
        </li>
        <li
          onClick={onHabitProgressClick}
          className={`flex-1 text-center py-2.5 px-4 rounded-full cursor-pointer transition-all duration-300 ${
            activeProgress === "habit"
              ? "bg-[#7E8F7A] text-white shadow-sm"
              : "text-[#736E67] hover:text-[#2D2A26] hover:bg-[#FAF8F5]"
          }`}
        >
          GoalMinder
        </li>
        <li
          onClick={onMoodProgressClick}
          className={`flex-1 text-center py-2.5 px-4 rounded-full cursor-pointer transition-all duration-300 ${
            activeProgress === "mood"
              ? "bg-[#7E8F7A] text-white shadow-sm"
              : "text-[#736E67] hover:text-[#2D2A26] hover:bg-[#FAF8F5]"
          }`}
        >
          EmoSense
        </li>
      </ul>
    </div>
  );
};

const UserProfile = () => {
  const [activeProgress, setActiveProgress] = useState("journal");

  const handleProgressClick = (progress) => {
    setActiveProgress(progress);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#2D2A26]">
      <Navbar />
      <div className="flex-grow py-12 px-6 max-w-7xl mx-auto w-full">
        {/* Editorial Heading */}
        <div className="text-center mb-10">
          <p className="text-[#C38A72] text-xs font-semibold tracking-[0.3em] uppercase mb-2">Metrics</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-[#2D2A26]">
            Your Progress <span className="text-[#7E8F7A] italic font-normal">Journal</span>
          </h1>
        </div>

        {/* Dynamic Tabs */}
        <div className="mb-10">
          <Progress
            activeProgress={activeProgress}
            onJournalProgressClick={() => handleProgressClick("journal")}
            onHabitProgressClick={() => handleProgressClick("habit")}
            onMoodProgressClick={() => handleProgressClick("mood")}
          />
        </div>

        {/* Dashboard Progress Data cards */}
        <div className="animate-scaleIn bg-white rounded-2xl border border-[#736E67]/[0.08] p-6 sm:p-10 shadow-sm">
          {activeProgress === "journal" && <JournalProgress />}
          {activeProgress === "habit" && <HabitProgress />}
          {activeProgress === "mood" && <MoodProgress />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
