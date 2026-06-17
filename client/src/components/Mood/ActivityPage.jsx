import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  addMoodData,
  fetchMoodData,
  setMoodData,
} from "../../reducers/moodSlice";
import { selectUser } from "../../reducers/authSlice";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import {
  food,
  health,
  hobbies,
  location,
  social,
  weather,
} from "../../assets/data/moodPage";
import Feeling from "./Feeling";
import ConfirmBox from "../ConfirmBox";

const SelectionList = ({ items, onSelect }) => (
  <ul className="grid grid-cols-3 signup:grid-cols-5 bg-white border border-[#736E67]/[0.08] rounded-2xl items-center justify-center p-3 shadow-sm gap-2">
    {items.map((item) => (
      <li
        key={item.value}
        onClick={() => onSelect(item)}
        className="p-3.5 rounded-xl flex flex-col justify-center items-center hover:bg-[#7E8F7A]/5 hover:scale-105 transition-all duration-300 cursor-pointer text-center group"
      >
        <img
          src={item.image}
          alt={item.value}
          className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
        />
        <p className="text-[11px] font-medium text-[#736E67] group-hover:text-[#2D2A26] mt-1.5 text-center leading-tight max-w-[75px]">
          {item.value}
        </p>
      </li>
    ))}
  </ul>
);

const SelectedActivities = ({ selectedActivities }) => (
  <div className="flex flex-wrap justify-center items-center gap-2">
    {selectedActivities.map((activity) => (
      <div
        key={activity.value}
        className="m-1 p-2 bg-[#7E8F7A]/10 border border-[#7E8F7A]/15 rounded-xl flex items-center gap-2 px-3 animate-scaleIn"
      >
        <img
          src={activity.image}
          className="w-5 h-5 object-contain"
          alt={activity.value}
        />
        <span className="text-xs font-semibold text-[#7E8F7A]">{activity.value}</span>
      </div>
    ))}
  </div>
);

const ActivityPage = ({ onClose, searchDate }) => {
  const dispatch = useDispatch();
  const moods = useSelector((state) => state.mood.moodData);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState([]);
  const [selectedSocialActivity, setSelectedSocialActivity] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);
  const [selectedHealth, setSelectedHealth] = useState([]);
  const [selectedHobby, setSelectedHobby] = useState([]);
  const [isOpenFeeling, setIsOpenFeeling] = useState(false);
  const [confirmSave, setConfirmSave] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const user = useSelector(selectUser);

  const handleToggleFeeling = () => {
    setIsOpenFeeling(!isOpenFeeling);
  };

  const handleOptionClickFeeling = (feeling) => {
    setSelectedOption(feeling);
    setIsOpenFeeling(false);
    setError("");
  };

  const handleActivityClick = (weatherD) => {
    const isAlreadySelected = selectedActivity.some(
      (activity) => activity.value === weatherD.value
    );

    if (isAlreadySelected) {
      setSelectedActivity((prevActivities) =>
        prevActivities.filter((activity) => activity.value !== weatherD.value)
      );
    } else {
      setSelectedActivity((prevActivities) => [...prevActivities, weatherD]);
    }
  };

  const handleSocialClick = (socialD) => {
    const isAlreadySelected = selectedSocialActivity.some(
      (activity) => activity.value === socialD.value
    );

    if (isAlreadySelected) {
      setSelectedSocialActivity((prevSocialActivities) =>
        prevSocialActivities.filter(
          (activity) => activity.value !== socialD.value
        )
      );
    } else {
      setSelectedSocialActivity((prevSocialActivities) => [
        ...prevSocialActivities,
        socialD,
      ]);
    }
  };

  const handleLocationClick = (locationD) => {
    const isAlreadySelected = selectedLocation.some(
      (activity) => activity.value === locationD.value
    );

    if (isAlreadySelected) {
      setSelectedLocation((prevLocations) =>
        prevLocations.filter((activity) => activity.value !== locationD.value)
      );
    } else {
      setSelectedLocation((prevLocations) => [...prevLocations, locationD]);
    }
  };

  const handleFoodClick = (foodD) => {
    const isAlreadySelected = selectedFood.some(
      (activity) => activity.value === foodD.value
    );

    if (isAlreadySelected) {
      setSelectedFood((prevFoods) =>
        prevFoods.filter((activity) => activity.value !== foodD.value)
      );
    } else {
      setSelectedFood((prevFoods) => [...prevFoods, foodD]);
    }
  };

  const handleHealthClick = (healthD) => {
    const isAlreadySelected = selectedHealth.some(
      (activity) => activity.value === healthD.value
    );

    if (isAlreadySelected) {
      setSelectedHealth((prevHealth) =>
        prevHealth.filter((activity) => activity.value !== healthD.value)
      );
    } else {
      setSelectedHealth((prevHealth) => [...prevHealth, healthD]);
    }
  };

  const handleHobbyClick = (hobbyD) => {
    const isAlreadySelected = selectedHobby.some(
      (activity) => activity.value === hobbyD.value
    );

    if (isAlreadySelected) {
      setSelectedHobby((prevHobby) =>
        prevHobby.filter((activity) => activity.value !== hobbyD.value)
      );
    } else {
      setSelectedHobby((prevHobby) => [...prevHobby, hobbyD]);
    }
  };

  const handleDataEnter = () => {
    onClose();
    const newDate = typeof searchDate === 'string' ? searchDate : moment(searchDate).format("YYYY-MM-DD");

    if (selectedOption && selectedOption.value && user) {
      dispatch(
        addMoodData({
          date: newDate,
          feeling: { value: selectedOption.value, image: selectedOption.image },
          activity: [
            {
              weather: selectedActivity.map((activity) => ({
                value: activity.value,
                image: activity.image,
              })),
              social: selectedSocialActivity.map((activity) => ({
                value: activity.value,
                image: activity.image,
              })),
              location: selectedLocation.map((activity) => ({
                value: activity.value,
                image: activity.image,
              })),
              food: selectedFood.map((activity) => ({
                value: activity.value,
                image: activity.image,
              })),
              health: selectedHealth.map((activity) => ({
                value: activity.value,
                image: activity.image,
              })),
              hobby: selectedHobby.map((activity) => ({
                value: activity.value,
                image: activity.image,
              })),
            },
          ],
          userToken: user.token,
        })
      );
    }
    fetchAndSetMoods();
  };

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

  const handleSaveConfirm = () => {
    setConfirmSave(false);
    handleDataEnter();
  };

  const handleSaveCancel = () => {
    setConfirmSave(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSaveClick();
  };

  const handleSaveClick = () => {
    const hasPreviousEntry = moods.some((mood) =>
      moment.utc(mood.date).isSame(moment.utc(searchDate), "day")
    );
    if (!selectedOption) {
      setError("Select your mood");
      return;
    }
    if (hasPreviousEntry) {
      setMsg("Do you want to update existing data?");
    } else {
      setMsg("Are you sure?");
    }
    setConfirmSave(true);
  };

  const renderFilteredMoods = () => {
    const filteredMoods = moods.filter((mood) =>
      moment.utc(mood.date).isSame(moment.utc(searchDate), "day")
    );

    return (
      <div className="w-full">
        {filteredMoods.map((filteredMood) => (
          <div
            key={filteredMood._id}
            className="bg-white rounded-2xl border border-[#736E67]/[0.08] p-6 shadow-sm text-left flex flex-col space-y-4 max-w-sm w-full"
          >
            <span className="text-[#C38A72] text-[10px] font-semibold tracking-wider uppercase">
              Previous Log
            </span>
            <div className="flex items-center gap-3 pb-3 border-b border-[#736E67]/[0.06]">
              <div className="w-10 h-10 bg-[#7E8F7A]/10 rounded-full flex items-center justify-center">
                <img
                  src={filteredMood.feeling.image}
                  alt={filteredMood.feeling.value}
                  className="h-6 w-6 object-contain"
                />
              </div>
              <div>
                <p className="font-serif text-base font-semibold text-[#2D2A26]">
                  {filteredMood.feeling.value}
                </p>
                <p className="text-[10px] text-[#736E67] font-light">Logged Mood</p>
              </div>
            </div>

            {/* List weather/social */}
            <div className="space-y-3">
              <p className="text-[10px] font-semibold text-[#736E67] uppercase tracking-wider">
                Influencing activities:
              </p>
              {filteredMood.activity[0].weather.length === 0 &&
              filteredMood.activity[0].social.length === 0 &&
              filteredMood.activity[0].location.length === 0 &&
              filteredMood.activity[0].food.length === 0 &&
              filteredMood.activity[0].health.length === 0 &&
              filteredMood.activity[0].hobby.length === 0 ? (
                <p className="text-xs text-[#736E67]/60 font-light">No logged activities.</p>
              ) : (
                <div className="max-h-24 overflow-y-auto pr-2 space-y-1.5" id="style-1">
                  {/* Weather */}
                  {!filteredMood.activity[0].weather.some(
                    (emotion) => emotion.value === null || emotion.image === null
                  ) &&
                    filteredMood.activity[0].weather.map((emotion, index) => (
                      <div key={`w-${index}`} className="flex items-center gap-2 text-xs">
                        <img src={emotion.image} className="w-4 h-4 object-contain" alt="" />
                        <span className="text-[#2D2A26] font-light">{emotion.value}</span>
                      </div>
                    ))}

                  {/* Social */}
                  {!filteredMood.activity[0].social.some(
                    (emotion) => emotion.value === null || emotion.image === null
                  ) &&
                    filteredMood.activity[0].social.map((emotion, index) => (
                      <div key={`s-${index}`} className="flex items-center gap-2 text-xs">
                        <img src={emotion.image} className="w-4 h-4 object-contain" alt="" />
                        <span className="text-[#2D2A26] font-light">{emotion.value}</span>
                      </div>
                    ))}

                  {/* Location */}
                  {!filteredMood.activity[0].location.some(
                    (emotion) => emotion.value === null || emotion.image === null
                  ) &&
                    filteredMood.activity[0].location.map((emotion, index) => (
                      <div key={`l-${index}`} className="flex items-center gap-2 text-xs">
                        <img src={emotion.image} className="w-4 h-4 object-contain" alt="" />
                        <span className="text-[#2D2A26] font-light">{emotion.value}</span>
                      </div>
                    ))}

                  {/* Food */}
                  {!filteredMood.activity[0].food.some(
                    (emotion) => emotion.value === null || emotion.image === null
                  ) &&
                    filteredMood.activity[0].food.map((emotion, index) => (
                      <div key={`f-${index}`} className="flex items-center gap-2 text-xs">
                        <img src={emotion.image} className="w-4 h-4 object-contain" alt="" />
                        <span className="text-[#2D2A26] font-light">{emotion.value}</span>
                      </div>
                    ))}

                  {/* Health */}
                  {!filteredMood.activity[0].health.some(
                    (emotion) => emotion.value === null || emotion.image === null
                  ) &&
                    filteredMood.activity[0].health.map((emotion, index) => (
                      <div key={`h-${index}`} className="flex items-center gap-2 text-xs">
                        <img src={emotion.image} className="w-4 h-4 object-contain" alt="" />
                        <span className="text-[#2D2A26] font-light">{emotion.value}</span>
                      </div>
                    ))}

                  {/* Hobby */}
                  {!filteredMood.activity[0].hobby.some(
                    (emotion) => emotion.value === null || emotion.image === null
                  ) &&
                    filteredMood.activity[0].hobby.map((emotion, index) => (
                      <div key={`hb-${index}`} className="flex items-center gap-2 text-xs">
                        <img src={emotion.image} className="w-4 h-4 object-contain" alt="" />
                        <span className="text-[#2D2A26] font-light">{emotion.value}</span>
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

  return (
    <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-24 animate-fadeIn">
      {/* Return Header */}
      <div className="flex items-center gap-4 py-8 mb-8 border-b border-[#736E67]/[0.06]">
        <button
          onClick={onClose}
          className="text-[#736E67] hover:text-[#2D2A26] transition-colors p-1.5 rounded-full hover:bg-[#736E67]/[0.05]"
          title="Back"
        >
          <ArrowCircleLeftIcon fontSize="large" />
        </button>
        <div>
          <span className="text-[#C38A72] text-[10px] font-semibold tracking-wider uppercase">
            Mindfulness Check-in
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2D2A26] mt-0.5">
            Log for {moment.utc(searchDate).format("MMMM DD, YYYY")}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Feeling selector block */}
        <div className="w-full bg-white rounded-2xl border border-[#736E67]/[0.08] shadow-sm p-6 sm:p-8">
          <h3 className="font-serif text-xl font-semibold text-[#2D2A26] mb-2 text-left">
            1. Select your general mood
          </h3>
          <p className="text-[#736E67] text-xs font-light mb-6 text-left">
            Choose the emotion that best matches how your day went.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start justify-items-center lg:justify-items-stretch">
            <div className={`${
              moods.filter((m) => moment.utc(m.date).isSame(moment.utc(searchDate), "day")).length > 0
                ? "lg:col-span-8 w-full"
                : "lg:col-span-12 w-full"
            }`}>
              <Feeling
                selectedOption={selectedOption}
                isOpenFeeling={isOpenFeeling}
                handleToggle={handleToggleFeeling}
                handleOptionClick={handleOptionClickFeeling}
              />
            </div>
            
            {moods.filter((m) => moment.utc(m.date).isSame(moment.utc(searchDate), "day")).length > 0 && (
              <div className="lg:col-span-4 w-full flex justify-center">
                {renderFilteredMoods()}
              </div>
            )}
          </div>
        </div>

        {/* Selected activities summary badge panel */}
        {((selectedActivity && selectedActivity.length > 0) ||
          (selectedSocialActivity && selectedSocialActivity.length > 0) ||
          (selectedLocation && selectedLocation.length > 0) ||
          (selectedFood && selectedFood.length > 0) ||
          (selectedHealth && selectedHealth.length > 0) ||
          (selectedHobby && selectedHobby.length > 0)) && (
          <div className="w-full bg-[#7E8F7A]/5 border border-[#7E8F7A]/15 rounded-2xl p-6 text-left animate-scaleIn">
            <p className="text-xs font-semibold tracking-wider text-[#7E8F7A] uppercase mb-3">
              Selected Factors:
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedActivity.length > 0 && <SelectedActivities selectedActivities={selectedActivity} />}
              {selectedSocialActivity.length > 0 && <SelectedActivities selectedActivities={selectedSocialActivity} />}
              {selectedLocation.length > 0 && <SelectedActivities selectedActivities={selectedLocation} />}
              {selectedFood.length > 0 && <SelectedActivities selectedActivities={selectedFood} />}
              {selectedHealth.length > 0 && <SelectedActivities selectedActivities={selectedHealth} />}
              {selectedHobby.length > 0 && <SelectedActivities selectedActivities={selectedHobby} />}
            </div>
          </div>
        )}

        {/* Dynamic Category Blocks */}
        <div className="space-y-6 text-left">
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#2D2A26] mb-1">
              2. Add influencing factors
            </h3>
            <p className="text-[#736E67] text-xs font-light mb-8">
              Select any activities, environments, or states that contributed to your mood.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Weather */}
            <div className="space-y-3">
              <span className="text-[#C38A72] text-[10px] font-semibold tracking-widest uppercase">Weather</span>
              <SelectionList items={weather} onSelect={handleActivityClick} />
            </div>

            {/* Social */}
            <div className="space-y-3">
              <span className="text-[#C38A72] text-[10px] font-semibold tracking-widest uppercase">Social</span>
              <SelectionList items={social} onSelect={handleSocialClick} />
            </div>

            {/* Location */}
            <div className="space-y-3">
              <span className="text-[#C38A72] text-[10px] font-semibold tracking-widest uppercase">Location</span>
              <SelectionList items={location} onSelect={handleLocationClick} />
            </div>

            {/* Food */}
            <div className="space-y-3">
              <span className="text-[#C38A72] text-[10px] font-semibold tracking-widest uppercase">Food</span>
              <SelectionList items={food} onSelect={handleFoodClick} />
            </div>

            {/* Health */}
            <div className="space-y-3">
              <span className="text-[#C38A72] text-[10px] font-semibold tracking-widest uppercase">Health</span>
              <SelectionList items={health} onSelect={handleHealthClick} />
            </div>

            {/* Hobby */}
            <div className="space-y-3">
              <span className="text-[#C38A72] text-[10px] font-semibold tracking-widest uppercase">Hobby</span>
              <SelectionList items={hobbies} onSelect={handleHobbyClick} />
            </div>
          </div>
        </div>

        {/* Submit block */}
        <div className="pt-6 border-t border-[#736E67]/[0.06]">
          {error && <p className="text-[#D66B6B] text-sm font-light mb-4 text-center">{error}</p>}
          <button
            className="btn-cozy-primary py-3.5 px-12 text-sm shadow-md"
            type="submit"
          >
            Save Mood Entry
          </button>
        </div>
      </form>

      <ConfirmBox
        visible={confirmSave}
        message={msg}
        onCancel={handleSaveCancel}
        onConfirm={handleSaveConfirm}
      />
    </div>
  );
};

export default ActivityPage;
