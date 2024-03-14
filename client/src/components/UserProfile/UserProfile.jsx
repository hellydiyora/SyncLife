import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser, fetchUser } from "../../reducers/authSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import JournalProgress from "./JournalProgress";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import HabitProgress from "./HabitProgress";
import GratiProgress from "./GratiProgress";
import MoodProgress from "./MoodProgress";

const Progress = ({
  onJournalProgressClick,
  onHabitProgressClick,
  onGratiProgressClick,
  onMoodProgressClick,
}) => {
  return (
    <div>
      <h1 className="text-4xl font-mainTag mb-10">Progress</h1>
      <ul className="grid grid-cols-4 gap-4">
        <li className="bg-gray-300  rounded-md flex flex-col items-center p-10 gap-5">
          <span className="text-2xl ">TaskMate</span>{" "}
          <button
            className="bg-gray-500 shadow-lg shadow-gray-500 p-2  rounded-md text-white hover:bg-gray-600 hover:shadow-gray-600 transition duration-300"
            onClick={onJournalProgressClick}
          >
            See Progress
          </button>
        </li>
        <li className="bg-gray-300 rounded-md flex flex-col items-center p-10 gap-5">
          <span className="text-2xl">GoalMinder</span>{" "}
          <button
            className="bg-gray-500 shadow-lg shadow-gray-500 p-2  rounded-md text-white hover:bg-gray-600 hover:shadow-gray-600 transition duration-300"
            onClick={onHabitProgressClick}
          >
            See Progress
          </button>
        </li>
        <li className="bg-gray-300 rounded-md flex flex-col items-center p-10 gap-5">
          <span className="text-2xl">GratiMemo</span>{" "}
          <button
            className="bg-gray-500 shadow-lg shadow-gray-500 p-2  rounded-md text-white hover:bg-gray-600 hover:shadow-gray-600 transition duration-300"
            onClick={onGratiProgressClick}
          >
            See Progress
          </button>
        </li>
        <li className="bg-gray-300 rounded-md flex flex-col items-center p-10 gap-5">
          <span className="text-2xl">EmoSense</span>
          <button
            className="bg-gray-500 shadow-lg shadow-gray-500 p-2  rounded-md text-white hover:bg-gray-600 hover:shadow-gray-600 transition duration-300"
            onClick={onMoodProgressClick}
          >
            See Progress
          </button>
        </li>
      </ul>
    </div>
  );
};
const UserProfile = () => {
  const [isJournalProgress, setIsJournalProgress] = useState(false);
  const [isHabitProgress, setIsHabitProgress] = useState(false);
  const [isGratiProgress, setIsGratiProgress] = useState(false);
  const [isMoodProgress, setIsMoodProgress] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.user);

  const fetchU = useSelector(selectUser);

  const getDetails = () => {
    try {
      const firstName = fetchU.firstName;
      dispatch(fetchUser({ firstName }));
    } catch (error) {
      console.error("Error in fetching: ", error);
    }
  };

  useEffect(() => {
    getDetails();
  }, [dispatch]);

  const handleLogOut = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      console.log("Error in logging out: ", error);
    }
  };

  const showJournalProgress = () => {
    setIsJournalProgress(true);
  };

  const closeJournalProgress = () => {
    setIsJournalProgress(false);
  };

  const showHabitProgress = () => {
    setIsHabitProgress(true);
  };

  const closeHabitProgress = () => {
    setIsHabitProgress(false);
  };

  const showGratiProgress = () => {
    setIsGratiProgress(true);
  };

  const closeGratiProgress = () => {
    setIsGratiProgress(false);
  };

  const showMoodProgress = () => {
    setIsMoodProgress(true);
  };

  const closeMoodProgress = () => {
    setIsMoodProgress(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gray-100 flex ">
        <div className="p-5 w-1/5 flex flex-col text-left items-center mx-auto bg-slate-200">
          <h1 className="text-4xl font-mainTag mb-4 ">
            {userData.firstName}'s data
          </h1>
          {userData && (
            <div className="flex flex-col gap-1 p-5 border rounded bg-white shadow-md">
              <p>
                <span className="font-semibold">First Name:</span>{" "}
                {userData.firstName}
              </p>
              <p>
                <span className="font-semibold">Last Name:</span>{" "}
                {userData.lastName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {userData.email}
              </p>
              <p>
                <span className="font-semibold">Birth Date:</span>{" "}
                {moment(userData.birthDate).format("DD-MM-YYYY")}
              </p>
            </div>
          )}

          <button
            onClick={handleLogOut}
            className="mt-4 bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600 transition duration-300 "
          >
            Log Out
          </button>
        </div>

        {isJournalProgress ? (
          <div className="w-4/5 p-5 flex flex-col">
            <JournalProgress onClose={closeJournalProgress} />
          </div>
        ) : isHabitProgress ? (
          <div className="w-4/5 p-5 flex flex-col ">
            <HabitProgress onClose={closeHabitProgress} />
          </div>
        ) : isGratiProgress ? (
          <div className="w-4/5 p-5 flex flex-col ">
            <GratiProgress onClose={closeGratiProgress} />
          </div>
        ) : isMoodProgress ? (
          <div className="w-4/5 p-5 flex flex-col">
            <MoodProgress onClose={closeMoodProgress} />
          </div>
        ) : (
          <div className="w-4/5 p-5 flex flex-col gap-5">
            <Progress
              onJournalProgressClick={showJournalProgress}
              onHabitProgressClick={showHabitProgress}
              onGratiProgressClick={showGratiProgress}
              onMoodProgressClick={showMoodProgress}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
