import React from 'react';
import { useEffect, useState } from "react";
import Footer from "../Home/Footer";
import Navbar from "../Home/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  addGratitude,
  fetchGratitudes,
  setGratitudes,
} from "../../reducers/gratiSlice";
import { selectUser } from "../../reducers/authSlice";
import moment from "moment";

const Gratitude = () => {
  const [formData, setFormData] = useState({
    date: "",
    greatfulFor: "",
    lookingForward: "",
    goodThings: "",
    better: "",
  });
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const gratitudes = useSelector((state) => state.gratitude.gratitudes);
  const [searchDate, setSearchDate] = useState("");

  const handleDateChange = (e) => {
    setSearchDate(e.target.value || "");
  };

  const fetchAndSetGratitude = async () => {
    try {
      if (user) {
        const response = await dispatch(fetchGratitudes(user.token));
        dispatch(setGratitudes(response.payload));
      } else {
        console.log("No user from Gratitude");
      }
    } catch (error) {
      console.log("Error in fetching gratitude: ", error);
    }
  };

  useEffect(() => {
    fetchAndSetGratitude();
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await dispatch(
          addGratitude({
            date: formData.date,
            greatfulFor: formData.greatfulFor,
            lookingForward: formData.lookingForward,
            goodThings: formData.goodThings,
            better: formData.better,
            userToken: user.token,
          })
        );
      }

      await fetchAndSetGratitude();
      setFormData({
        date: "",
        greatfulFor: "",
        lookingForward: "",
        goodThings: "",
        better: "",
      });
    } catch (error) {
      console.error("Error in submitting habit:", error);
    }
  };
  return (
    <div className="flex h-lvh flex-col">
      <Navbar />
      <div className="grid grid-cols-2 h-lvh p-10 gap-8 bg-gray-100 flex-grow ">
        <div>
          <h1 className="m-5 text-5xl font-serif text-slate-800">GratiMemo</h1>
          <form
            className="grid gap-3 items-center justify-center"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-left">Today's date is:</label>
                <input
                  type="date"
                  name="date"
                  placeholder="date.."
                  value={formData.date}
                  onChange={handleInputChange}
                  className="p-2"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label className="text-left">I'm greatful for:</label>
                <input
                  type="text"
                  name="greatfulFor"
                  placeholder="Type something.."
                  value={formData.greatfulFor}
                  onChange={handleInputChange}
                  className="p-2"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label className="text-left">I'm looking forward to:</label>
                <input
                  type="text"
                  name="lookingForward"
                  placeholder="Type something.."
                  value={formData.lookingForward}
                  onChange={handleInputChange}
                  className="p-2"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label className="text-left">Good thing about today was:</label>
                <input
                  type="text"
                  name="goodThings"
                  placeholder="Type something.."
                  value={formData.goodThings}
                  onChange={handleInputChange}
                  className="p-2"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-left">
                Three things to make better is:
              </label>
              <input
                type="text"
                id="better"
                name="better"
                placeholder="e.g., First, Second, Third"
                value={formData.better}
                onChange={handleInputChange}
                className="p-2"
                required
              />
            </div>
            <div>
              <button className="bg-slate-300 shadow-md shadow-slate-400 px-3 py-2 rounded-md m-4">
                Submit
              </button>
            </div>
          </form>
        
        </div>
        <div className=" flex flex-col items-center ">
          <div className="bg-slate-300 bg-opacity-40 py-5 px-10 mt-10 flex gap-3 justify-center items-center rounded-md ">
            <p className="text-2xl font-serif">Search entry for :</p>
            <form>
              <input
                type="date"
                name="searchDate"
                className="p-2"
                value={searchDate}
                onChange={handleDateChange}
              />
            </form>
          </div>

          {searchDate &&
          gratitudes &&
          gratitudes.filter((gratitude) =>
            moment(gratitude.date).isSame(moment(searchDate), "day")
          ).length === 0 ? (
            <p>No entries available</p>
          ) : (
            <div>
              <ul>
                {gratitudes
                  .filter((gratitude) =>
                    moment(gratitude.date).isSame(moment(searchDate), "day")
                  )
                  .map((filteredGratitude) => (
                    <li
                      key={filteredGratitude._id}
                      className="mt-6 text-lg bg-slate-300 p-10 rounded-md bg-opacity-40"
                    >
                      <div>
                        <strong>
                          Entry for{" "}
                          <span className="text-sky-600">
                            {moment(filteredGratitude.date).format(
                              "DD-MM-YYYY"
                            )}{" "}
                          </span>
                          is:
                        </strong>
                      </div>
                      <div>
                        <span className="font-medium">
                          You were greatful for:{" "}
                        </span>{" "}
                        {filteredGratitude.greatfulFor}
                      </div>
                      <div>
                        <span className="font-medium">
                          You were looking forward to:{" "}
                        </span>
                        {filteredGratitude.lookingForward}
                      </div>
                      <div>
                        <span className="font-medium">
                          Good thing about that day was:{" "}
                        </span>
                        {filteredGratitude.goodThings}
                      </div>
                      <div>
                        <span className="font-medium">
                          Things to make better is:{" "}
                        </span>

                        {filteredGratitude.better}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gratitude;
