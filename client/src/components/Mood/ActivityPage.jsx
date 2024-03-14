import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  addMoodData,
  fetchMoodData,
  setMoodData,
} from "../../reducers/moodSlice";
import { selectUser } from "../../reducers/authSlice";

import {
  feelings,
  food,
  health,
  hobbies,
  location,
  social,
  weather,
} from "../../assets/data/moodPage";
import Feeling from "./Feeling";

const SelectionList = ({ items, onSelect }) => (
  <>
    <ul className="grid grid-cols-5 bg-slate-300 rounded-3xl items-center justify-center shadow-md shadow-slate-300">
      {items.map((item) => (
        <li
          key={item.value}
          onClick={() => onSelect(item)}
          className="p-2 rounded-3xl flex flex-col justify-center items-center hover:shadow-2xl hover:shadow-black"
        >
          <img src={item.image} alt={item.value} className="w-12 h-12" />
          <p>{item.value}</p>
        </li>
      ))}
    </ul>
  </>
);

const SelectedActivities = ({ selectedActivities }) => (
  <div className="flex justify-center items-center">
    {selectedActivities.map((activity) => (
      <div key={activity.value} className="m-1 px-2">
        <img src={activity.image} className="w-12 h-12" alt={activity.value} />
        <p>{activity.value}</p>
      </div>
    ))}
  </div>
);

const ActivityPage = ({ onClose, selectedDate }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState([]);
  const [selectedSocialActivity, setSelectedSocialActivity] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);
  const [selectedHealth, setSelectedHealth] = useState([]);
  const [selectedHobby, setSelectedHobby] = useState([]);
  const [isOpenFeeling , setIsOpenFeeling] = useState(false);

  const user = useSelector(selectUser);

  const handleToggleFeeling = () => {
    console.log("Handle toggle feeling clicked")
    setIsOpenFeeling(!isOpenFeeling);
  };

  const handleOptionClickFeeling = (feeling) => {
    setSelectedOption(feeling);
    setIsOpenFeeling(false);
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
        prevLocations.filter((activity) => activity.value != locationD.value)
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
    const newDate = moment(selectedDate).format("YYYY-MM-DD");

    if (selectedOption && selectedOption.value && user) {
      dispatch(
        addMoodData({
          date: newDate,
          feeling: [
            { value: selectedOption.value, image: selectedOption.image },
          ],
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

  return (
    <div className="h-full p-7 grid gap-20">
      <form className="flex flex-col items-center gap-4">
        <div className="w-[450px] ">
          <div>
            <p className="text-center font-serif underline text-3xl m-2 mb-5">
              Fill entry for {moment(selectedDate).format("DD-MM-YYYY")}
            </p>
           
            <Feeling
              selectedOption={selectedOption}
              isOpenFeeling={isOpenFeeling}
              handleToggle={handleToggleFeeling}
              handleOptionClick={handleOptionClickFeeling}
            />
          </div>
        </div>
        <label className="text-center font-semibold text-2xl m-2">
          What activity caused this feeling?
        </label>
        <div className=" px-5 flex flex-wrap max-w-3xl bg-stone-200 rounded-3xl shadow-md shadow-slate-300">
          <div >
            {selectedActivity && selectedActivity.length > 0 && (
              <SelectedActivities selectedActivities={selectedActivity}/>
            )}
          </div>
          <div >
            {selectedSocialActivity && selectedSocialActivity.length > 0 && (
              <SelectedActivities selectedActivities={selectedSocialActivity} />
            )}
          </div>
          <div >
            {selectedLocation && selectedLocation.length > 0 && (
              <SelectedActivities selectedActivities={selectedLocation} />
            )}
          </div>
          <div >
            {selectedFood && selectedFood.length > 0 && (
              <SelectedActivities selectedActivities={selectedFood} />
            )}
          </div>
          <div >
            {selectedHealth && selectedHealth.length > 0 && (
              <SelectedActivities selectedActivities={selectedHealth} />
            )}
          </div>
          <div >
            {selectedHobby && selectedHobby.length > 0 && (
              <SelectedActivities selectedActivities={selectedHobby} />
            )}
          </div>
        </div>
        <div className="w-full gap-5 grid justify-items-center xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 ">
          <div className="w-[400px] ">
            <p className="text-center font-mono text-xl">Weather</p>
            <SelectionList items={weather} onSelect={handleActivityClick} />
          </div>
          <div className="w-[400px]  ">
            <p className="text-center font-mono text-xl">Social</p>
            <SelectionList items={social} onSelect={handleSocialClick} />
          </div>
          <div className="w-[400px]">
            <p className="text-center font-mono text-xl">Location</p>
            <SelectionList
              items={location}
              onSelect={handleLocationClick}
              selectedOptions={selectedLocation}
            />
          </div>
          <div className="w-[400px]">
            <p className="text-center font-mono text-xl">Food</p>
            <SelectionList
              items={food}
              onSelect={handleFoodClick}
              selectedOptions={selectedFood}
            />
          </div>
          <div className="w-[400px]">
            <p className="text-center font-mono text-xl">Health</p>
            <SelectionList
              items={health}
              onSelect={handleHealthClick}
              selectedOptions={selectedHealth}
            />
          </div>
          <div className="w-[400px]">
            <p className="text-center font-mono text-xl">Hobby</p>
            <SelectionList
              items={hobbies}
              onSelect={handleHobbyClick}
              selectedOptions={selectedHobby}
            />
          </div>
        </div>
      </form>
      <div>
        <button
          className=" bg-slate-700 text-white shadow-lg shadow-slate-400 dark:shadow-slate-5 py-2 px-4 rounded-3xl "
          onClick={handleDataEnter}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ActivityPage;
