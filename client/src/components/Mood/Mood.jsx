import React from 'react';
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import Calendar from "../Calendar/Calendar";
import ActivityPage from "./ActivityPage";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../reducers/authSlice";
import { fetchMoodData, setMoodData } from "../../reducers/moodSlice";

const Mood = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const moods = useSelector((state) => state.mood.moodData);

  const [selectedDate, setSelectedDate] = useState( new Date());
  const [showPage, setShowPage] = useState(false);
  const [searchDate, setSearchDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

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
  }, [dispatch]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowPage(true);
    fetchAndSetMoods();
  };

  const closePage = () => {
    setShowPage(false);
    setSelectedDate(new Date());
    setSearchDate(moment(new Date()).format("YYYY-MM-DD"));
    fetchAndSetMoods();
  };

  const handleSearchDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const renderFilteredMoods = () => {
    const filteredMoods = moods.filter((mood) =>
      moment(mood.date).isSame(moment(searchDate), "day")
    );

    if (filteredMoods.length === 0) {
      return <p className="text-lg text-gray-400">No entry available</p>;
    }

    return (
      <div>
        {filteredMoods.map((filteredMood) => (
          <div key={filteredMood._id} className="flex justify-center">
            <li className="bgHabit m-2 rounded-md p-4 shadow-sm shadow-black list-none min-w-60 ">
              <span className="text-3xl font-serif text-gray-700 underline">
                {moment(filteredMood.date).format("DD-MM-YYYY")}
              </span>
              <div className="mt-2 grid gap-2">
                {filteredMood.feeling.map((emotion, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center gap-2"
                  >
                    <span className="text-2xl font-serif text-gray-700">
                      {emotion.value}
                    </span>
                    <img
                      src={emotion.image}
                      alt={emotion.value}
                      className="h-12 w-12"
                    />
                  </div>
                ))}
                <p>"Activities that made you feel this way"</p>
                {filteredMood.activity[0].weather.length === 0 &&
                filteredMood.activity[0].social.length === 0 &&
                filteredMood.activity[0].location.length === 0 &&
                filteredMood.activity[0].food.length === 0 ? (
                  <p className="text-gray-500">No activity selected</p>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {!filteredMood.activity[0].weather.some(
                      (emotion) =>
                        emotion.value === null || emotion.image === null
                    ) &&
                      filteredMood.activity[0].weather.map((emotion, index) => (
                        <div
                          key={index}
                          className="flex flex-col justify-center items-center gap-2"
                        >
                          <span className="text-2xl font-serif text-gray-700">
                            {emotion.value}
                          </span>
                          <img
                            src={emotion.image}
                            alt={emotion.value}
                            className="h-12 w-12"
                          />
                        </div>
                      ))}
                    {!filteredMood.activity[0].social.some(
                      (emotion) =>
                        emotion.value === null || emotion.image === null
                    ) &&
                      filteredMood.activity[0].social.map((emotion, index) => (
                        <div
                          key={index}
                          className="flex flex-col justify-center items-center gap-2"
                        >
                          <span className="text-2xl font-serif text-gray-700">
                            {emotion.value}
                          </span>
                          <img
                            src={emotion.image}
                            alt={emotion.value}
                            className="h-12 w-12"
                          />
                        </div>
                      ))}
                    {!filteredMood.activity[0].location.some(
                      (emotion) =>
                        emotion.value === null || emotion.image === null
                    ) &&
                      filteredMood.activity[0].location.map(
                        (emotion, index) => (
                          <div
                            key={index}
                            className="flex flex-col justify-center items-center gap-2"
                          >
                            <span className="text-2xl font-serif text-gray-700">
                              {emotion.value}
                            </span>
                            <img
                              src={emotion.image}
                              alt={emotion.value}
                              className="h-12 w-12"
                            />
                          </div>
                        )
                      )}
                    {!filteredMood.activity[0].food.some(
                      (emotion) =>
                        emotion.value === null || emotion.image === null
                    ) &&
                      filteredMood.activity[0].food.map((emotion, index) => (
                        <div
                          key={index}
                          className="flex flex-col justify-center items-center gap-2"
                        >
                          <span className="text-2xl font-serif text-gray-700">
                            {emotion.value}
                          </span>
                          <img
                            src={emotion.image}
                            alt={emotion.value}
                            className="h-12 w-12"
                          />
                        </div>
                      ))}
                      {!filteredMood.activity[0].health.some(
                      (emotion) =>
                        emotion.value === null || emotion.image === null
                    ) &&
                      filteredMood.activity[0].health.map((emotion, index) => (
                        <div
                          key={index}
                          className="flex flex-col justify-center items-center gap-2"
                        >
                          <span className="text-2xl font-serif text-gray-700">
                            {emotion.value}
                          </span>
                          <img
                            src={emotion.image}
                            alt={emotion.value}
                            className="h-12 w-12"
                          />
                        </div>
                      ))}
                      {!filteredMood.activity[0].hobby.some(
                      (emotion) =>
                        emotion.value === null || emotion.image === null
                    ) &&
                      filteredMood.activity[0].hobby.map((emotion, index) => (
                        <div
                          key={index}
                          className="flex flex-col justify-center items-center gap-2"
                        >
                          <span className="text-2xl font-serif text-gray-700">
                            {emotion.value}
                          </span>
                          <img
                            src={emotion.image}
                            alt={emotion.value}
                            className="h-12 w-12"
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </li>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="h-full ">
        {showPage ? (
          <div>
            <ActivityPage onClose={closePage} selectedDate={selectedDate} />
          </div>
        ) : (
          <div className="grid grid-cols-2">
            <div className="p-10 flex flex-col gap-2">
              <h1 className="text-5xl font-mainTag mb-5">Emo sense</h1>
              <p className="text-3xl font-subTag">How are you Feeling Today?</p>
              <p className="text-2xl">Let's track your mood</p>
              <p className="text-lg">Click on today's date</p>

              <div className="flex justify-center items-center m-5 gap-3">
                <p className="text-2xl font-serif">Search entry for :</p>
                <form>
                  <input
                    type="date"
                    name="searchDate"
                    value={searchDate}
                    onChange={handleSearchDateChange}
                    className="p-2 border-2 border-gray-200 shadow-md shadow-slate-400 rounded-md mr-2 placeholder-slate-900"
                  />
                </form>
              </div>
              {searchDate && moods && renderFilteredMoods()}
            </div>
            <div className="flex p-14 items-start justify-center">
              <Calendar onDateClick={handleDateClick} selectedDate={selectedDate} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Mood;
