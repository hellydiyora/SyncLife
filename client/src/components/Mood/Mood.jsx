import React from "react";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import Calendar from "../Calendar/Calendar";
import ActivityPage from "./ActivityPage";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../reducers/authSlice";
import {
  deleteEntry,
  fetchMoodData,
  setMoodData,
} from "../../reducers/moodSlice";
import ConfirmBox from "../ConfirmBox";
import { feelings, weather, social, location, food, health, hobbies } from "../../assets/data/moodPage";

const allIcons = [
  ...feelings,
  ...weather,
  ...social,
  ...location,
  ...food,
  ...health,
  ...hobbies,
];

const getIconImage = (value) => {
  if (!value) return null;
  const match = allIcons.find(
    (icon) => icon.value?.toLowerCase() === value?.toLowerCase()
  );
  return match ? match.image : null;
};


const Mood = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const moods = useSelector((state) => state.mood.moodData);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPage, setShowPage] = useState(false);
  const [searchDate, setSearchDate] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteDate, setDeleteDate] = useState();

  const fetchAndSetMoods = async () => {
    try {
      if (user) {
        const response = await dispatch(fetchMoodData(user.token));
        dispatch(setMoodData(response.payload));
      } else {
        console.log("No user from mood");
      }
    } catch (error) {
      console.log("error in fetching mood:", error);
    }
  };

  useEffect(() => {
    fetchAndSetMoods();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [dispatch]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchAndSetMoods();
  };

  const closePage = () => {
    setShowPage(false);
    fetchAndSetMoods();
    setSelectedDate(new Date());
    setSearchDate("");
  };

  const handleSearchDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchDate) {
      setShowPage(true);
    }
  };

  const handleDeleteConfrim = () => {
    setConfirmDelete(false);
    handleDelete({ deleteDate });
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(false);
  };

  const handleDeleteClick = (date) => {
    setDeleteDate(date);
    setConfirmDelete(true);
  };

  const renderFilteredMoods = () => {
    const targetDateStr = moment(selectedDate).format("YYYY-MM-DD");
    const filteredMoods = moods.filter((mood) =>
      moment.utc(mood.date).format("YYYY-MM-DD") === targetDateStr
    );

    if (filteredMoods.length === 0) {
      return (
        <div className="py-12 text-center bg-white rounded-2xl border border-[#736E67]/[0.08] shadow-sm w-full p-6">
          <svg className="w-10 h-10 mx-auto text-[#736E67]/30 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p className="text-[#736E67]/60 text-sm font-light">No emotional log found for this day.</p>
        </div>
      );
    }

    return (
      <div className="w-full space-y-4">
        {filteredMoods.map((filteredMood) => (
          <div
            key={filteredMood._id}
            className="w-full bg-white rounded-2xl border border-[#736E67]/[0.08] p-6 sm:p-8 shadow-sm flex flex-col text-left space-y-6 animate-scaleIn"
          >
            {/* Date and Emotion Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#736E67]/[0.06]">
              <div>
                <span className="text-[#C38A72] text-[10px] font-semibold tracking-wider uppercase">
                  Daily Check-in
                </span>
                <h4 className="font-serif text-xl font-semibold text-[#2D2A26] mt-0.5">
                  {moment.utc(filteredMood.date).format("MMMM DD, YYYY")}
                </h4>
              </div>

              {/* Feel badge */}
              <div className="flex items-center gap-2.5 bg-[#7E8F7A]/10 py-1.5 px-4 rounded-full border border-[#7E8F7A]/10">
                <img
                  src={getIconImage(filteredMood.feeling.value) || filteredMood.feeling.image}
                  alt={filteredMood.feeling.value}
                  className="h-5 w-5 object-contain"
                />
                <span className="text-[#7E8F7A] text-xs font-semibold tracking-wide">
                  {filteredMood.feeling.value}
                </span>
              </div>
            </div>

            {/* Activities grid */}
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#736E67] uppercase mb-4">
                What influenced your emotions:
              </p>

              {filteredMood.activity[0].weather.length === 0 &&
                filteredMood.activity[0].social.length === 0 &&
                filteredMood.activity[0].location.length === 0 &&
                filteredMood.activity[0].food.length === 0 &&
                filteredMood.activity[0].health.length === 0 &&
                filteredMood.activity[0].hobby.length === 0 ? (
                <p className="text-[#736E67]/60 text-sm font-light">No activities or categories logged.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {/* Weather */}
                  {!filteredMood.activity[0].weather.some(
                    (emotion) => emotion.value === null || emotion.image === null
                  ) &&
                    filteredMood.activity[0].weather.map((emotion, index) => (
                      <div
                        key={`weather-${index}`}
                        className="bg-[#FAF8F5] rounded-xl border border-[#736E67]/[0.05] p-3.5 flex flex-col items-center justify-center text-center gap-2"
                      >
                        <img
                          src={getIconImage(emotion.value) || emotion.image}
                          alt={emotion.value}
                          className="h-8 w-8 object-contain"
                        />
                        <span className="text-xs font-medium text-[#2D2A26]">{emotion.value}</span>
                      </div>
                    ))}

                  {/* Social */}
                  {!filteredMood.activity[0].social.some(
                    (emotion) => emotion.value === null || emotion.image === null
                  ) &&
                    filteredMood.activity[0].social.map((emotion, index) => (
                      <div
                        key={`social-${index}`}
                        className="bg-[#FAF8F5] rounded-xl border border-[#736E67]/[0.05] p-3.5 flex flex-col items-center justify-center text-center gap-2"
                      >
                        <img
                          src={getIconImage(emotion.value) || emotion.image}
                          alt={emotion.value}
                          className="h-8 w-8 object-contain"
                        />
                        <span className="text-xs font-medium text-[#2D2A26]">{emotion.value}</span>
                      </div>
                    ))}

                  {/* Location */}
                  {!filteredMood.activity[0].location.some(
                    (emotion) => emotion.value === null || emotion.image === null
                  ) &&
                    filteredMood.activity[0].location.map((emotion, index) => (
                      <div
                        key={`location-${index}`}
                        className="bg-[#FAF8F5] rounded-xl border border-[#736E67]/[0.05] p-3.5 flex flex-col items-center justify-center text-center gap-2"
                      >
                        <img
                          src={getIconImage(emotion.value) || emotion.image}
                          alt={emotion.value}
                          className="h-8 w-8 object-contain"
                        />
                        <span className="text-xs font-medium text-[#2D2A26]">{emotion.value}</span>
                      </div>
                    ))}

                  {/* Food */}
                  {!filteredMood.activity[0].food.some(
                    (emotion) => emotion.value === null || emotion.image === null
                  ) &&
                    filteredMood.activity[0].food.map((emotion, index) => (
                      <div
                        key={`food-${index}`}
                        className="bg-[#FAF8F5] rounded-xl border border-[#736E67]/[0.05] p-3.5 flex flex-col items-center justify-center text-center gap-2"
                      >
                        <img
                          src={getIconImage(emotion.value) || emotion.image}
                          alt={emotion.value}
                          className="h-8 w-8 object-contain"
                        />
                        <span className="text-xs font-medium text-[#2D2A26]">{emotion.value}</span>
                      </div>
                    ))}

                  {/* Health */}
                  {!filteredMood.activity[0].health.some(
                    (emotion) => emotion.value === null || emotion.image === null
                  ) &&
                    filteredMood.activity[0].health.map((emotion, index) => (
                      <div
                        key={`health-${index}`}
                        className="bg-[#FAF8F5] rounded-xl border border-[#736E67]/[0.05] p-3.5 flex flex-col items-center justify-center text-center gap-2"
                      >
                        <img
                          src={getIconImage(emotion.value) || emotion.image}
                          alt={emotion.value}
                          className="h-8 w-8 object-contain"
                        />
                        <span className="text-xs font-medium text-[#2D2A26]">{emotion.value}</span>
                      </div>
                    ))}

                  {/* Hobby */}
                  {!filteredMood.activity[0].hobby.some(
                    (emotion) => emotion.value === null || emotion.image === null
                  ) &&
                    filteredMood.activity[0].hobby.map((emotion, index) => (
                      <div
                        key={`hobby-${index}`}
                        className="bg-[#FAF8F5] rounded-xl border border-[#736E67]/[0.05] p-3.5 flex flex-col items-center justify-center text-center gap-2"
                      >
                        <img
                          src={getIconImage(emotion.value) || emotion.image}
                          alt={emotion.value}
                          className="h-8 w-8 object-contain"
                        />
                        <span className="text-xs font-medium text-[#2D2A26]">{emotion.value}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleDelete = async ({ deleteDate }) => {
    let date = null;

    if (user) {
      try {
        date = moment.utc(deleteDate).format("YYYY-MM-DD");
        await dispatch(deleteEntry({ date, userToken: user.token }));
        fetchAndSetMoods();
      } catch (error) {
        console.log("Error deleting list:", error);
      }
    }
  };

  useEffect(() => {
    if (confirmDelete) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [confirmDelete]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2A26] flex flex-col font-sans">
      <Navbar />

      {/* Dynamic Show Mode */}
      {showPage ? (
        <div className="flex-grow">
          <ActivityPage onClose={closePage} searchDate={searchDate} />
        </div>
      ) : (
        <div className="flex-grow">
          {/* Title Banner */}
          <div className="py-12 px-6 max-w-7xl mx-auto w-full text-center">
            <p className="text-[#C38A72] text-xs font-semibold tracking-[0.3em] uppercase mb-2">Reflections</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-[#2D2A26]">
              Emo<span className="text-[#7E8F7A] italic font-normal">Sense</span>
            </h1>
          </div>

          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form entry + Filtered logs */}
            <div className="lg:col-span-7 flex flex-col gap-8 items-start w-full text-left">
              <div className="w-full bg-white rounded-2xl border border-[#736E67]/[0.08] shadow-sm p-6 sm:p-8">
                <h3 className="font-serif text-xl font-semibold text-[#2D2A26] mb-2">
                  How are you feeling today?
                </h3>
                <p className="text-[#736E67] text-xs font-light mb-6">
                  Select a date below to log or track your daily mindfulness check-ins.
                </p>

                <form
                  className="space-y-4"
                  onSubmit={handleSearch}
                >
                  <div className="flex flex-col">
                    <label className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1">
                      Check-in Date
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="date"
                        name="searchDate"
                        value={searchDate}
                        onChange={handleSearchDateChange}
                        className="input-cozy text-[#736E67] flex-grow"
                      />
                      <button
                        className="btn-cozy-primary py-3 px-10 text-xs font-semibold rounded-full tracking-wider uppercase shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                        type="submit"
                      >
                        Enter
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Show check in data logs */}
              <div className="w-full space-y-4">
                <h3 className="font-serif text-xl font-semibold text-[#2D2A26] border-b border-[#736E67]/[0.06] pb-3">
                  Log Entry for {moment(selectedDate).format("MMMM DD, YYYY")}
                </h3>
                {selectedDate && moods && renderFilteredMoods()}

                {moods.filter((mood) =>
                  moment.utc(mood.date).format("YYYY-MM-DD") === moment(selectedDate).format("YYYY-MM-DD")
                ).length > 0 && (
                    <button
                      className="py-2.5 px-6 border border-[#D66B6B]/40 hover:bg-[#D66B6B]/[0.04] text-[#D66B6B] text-xs font-medium rounded-full transition duration-300 w-full sm:w-auto"
                      onClick={() => handleDeleteClick(selectedDate)}
                    >
                      Delete Entry
                    </button>
                  )}
              </div>
            </div>

            {/* Right Column: Custom Calendar picker */}
            <div className="lg:col-span-5 w-full flex justify-center pt-2">
              <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                <h3 className="font-serif text-xl font-semibold text-[#2D2A26] text-left w-full">
                  Mood Calendar
                </h3>
                <Calendar
                  onDateClick={handleDateClick}
                  selectedDate={selectedDate}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <ConfirmBox
        visible={confirmDelete}
        message="Are you sure you want to delete this emotional check-in log?"
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfrim}
      />
    </div>
  );
};

export default Mood;
