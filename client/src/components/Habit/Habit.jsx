import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addHabit,
  deleteHabit,
  fetchHabits,
  setHabits,
  toggleCompletion,
  updateHabits,
} from "../../reducers/habitSlice";
import HabitDetails from "./HabitDetails";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { selectUser } from "../../reducers/authSlice";
import { HabitSkeleton } from "../Skeletons";
import Confetti from "../Confetti";
import ConfirmBox from "../ConfirmBox";
import { useToast } from "../Toast/ToastContext";
import moment from "moment";

const Habit = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habit.habits);
  const [habit, setHabit] = useState({ name: "", startDate: "", endDate: "" });
  const [habitDetailsVisible, setHabitDetailsVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [updateHabit, setUpdateHabit] = useState({
    name: "",
    startDate: "",
    endDate: "",
    habitId: null,
  });
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [nameError, setNameError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [addConfirm, setAddConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [updateConfirm, setUpdateConfirm] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [loading, setLoading] = useState(true);
  const [confettiActive, setConfettiActive] = useState(false);
  const { showToast } = useToast();

  const user = useSelector(selectUser);

  const fetchAndSetHabits = async () => {
    try {
      if (user) {
        const response = await dispatch(fetchHabits(user.token));
        dispatch(setHabits(response.payload));
      } else {
        console.log("No user from habit");
      }
    } catch (error) {
      console.log("error in fetching habits: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetHabits();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [dispatch]);

  const handleChange = (e) => {
    setHabit({ ...habit, [e.target.name]: e.target.value });
    setNameError("");
    setStartDateError("");
    setEndDateError("");
  };

  const handleSubmit = async () => {
    try {
      if (user) {
        await dispatch(
          addHabit({
            name: habit.name,
            startDate: habit.startDate,
            endDate: habit.endDate,
            userToken: user.token,
          })
        );
      }

      await fetchAndSetHabits();
      setHabit({
        name: "",
        startDate: "",
        endDate: "",
      });
      showToast("Habit added successfully!", "success");
    } catch (error) {
      console.error("Error submitting habit:", error);
      showToast("Failed to add habit.", "error");
    }
  };

  const handleUpdateChange = (e) => {
    setUpdateHabit({ ...updateHabit, [e.target.name]: e.target.value });
    setUpdateError("");
  };

  const handleUpdate = async () => {
    try {
      if (user) {
        const { name, startDate, endDate, habitId } = updateHabit;
        await dispatch(
          updateHabits({
            habitId,
            name,
            startDate,
            endDate,
            userToken: user.token,
          })
        );

        setUpdateFormVisible(false);
        setUpdateHabit({
          name: "",
          startDate: "",
          endDate: "",
          habitId: null,
        });
        fetchAndSetHabits();
        showToast("Habit updated successfully.", "success");
      }
    } catch (error) {
      console.error("Error in updating habits: ", error);
      showToast("Failed to update habit.", "error");
    }
  };

  const handleUpdateButtonClick = (habit) => {
    setUpdateHabit({
      name: habit.name,
      startDate: habit.startDate,
      endDate: habit.endDate,
      habitId: habit._id,
    });

    setUpdateFormVisible(true);
  };

  const handleHabitDelete = async (id) => {
    try {
      if (user) {
        await dispatch(deleteHabit({ habitId: id, userToken: user.token }));
        fetchAndSetHabits();
        showToast("Habit deleted successfully.", "success");
      }
    } catch (error) {
      console.log("Error in deleting habits: ", error);
      showToast("Failed to delete habit.", "error");
    }
  };

  const handleToggle = async (habitId, date) => {
    try {
      if (user) {
        const targetHabit = habits.find((h) => h._id === habitId);
        const dateObj = targetHabit?.data.find(
          (d) => moment.utc(d.date).format("YYYY-MM-DD") === moment.utc(date).format("YYYY-MM-DD")
        );
        const wasCompleted = dateObj ? dateObj.isCompleted : false;

        await dispatch(
          toggleCompletion({ habitId, date, userToken: user.token })
        );
        fetchAndSetHabits();

        if (!wasCompleted) {
          setConfettiActive(true);
          showToast("Great job completing your habit! Keep it up!", "success");
        } else {
          showToast("Habit marked as incomplete.", "info");
        }
      }
    } catch (error) {
      console.error("Error toggling completion:", error);
      showToast("Failed to update habit progress.", "error");
    }
  };

  const showHabitDetails = (habit) => {
    setSelectedHabit(habit);
    setHabitDetailsVisible(true);
  };

  const closeHabitDetails = () => {
    setHabitDetailsVisible(false);
  };

  useEffect(() => {
    if (habitDetailsVisible || addConfirm || deleteConfirm || updateConfirm) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [habitDetailsVisible, addConfirm, deleteConfirm, updateConfirm]);

  const handleAddConfirm = () => {
    setAddConfirm(false);
    handleSubmit();
  };

  const handleAddCancel = () => {
    setAddConfirm(false);
    setHabit({
      name: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    if (user) {
      if (!habit.name.trim()) {
        setNameError("Habit name cannot be empty");

        return;
      }
      if (!habit.startDate) {
        setStartDateError("Date can't be empty");
        return;
      }
      if (!habit.endDate) {
        setEndDateError("Date can't be empty");
        return;
      }

      const today = moment().format("YYYY-MM-DD");

      if (habit.endDate < today) {
        setEndDateError("Days are already finished");
        return;
      }
      if (habit.endDate < habit.startDate) {
        setEndDateError("End date should be after start date");
        return;
      }
    }
    setAddConfirm(true);
  };

  const handleDeleteConfirm = () => {
    setDeleteConfirm(false);
    handleHabitDelete(deleteId);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteConfirm(true);
  };

  const handleUpdateConfirm = () => {
    setUpdateConfirm(false);
    handleUpdate();
  };

  const handleUpdateCancel = () => {
    setUpdateConfirm(false);
    setUpdateHabit({
      name: "",
      startDate: "",
      endDate: "",
      habitId: null,
    });
    setUpdateError("");
    setUpdateFormVisible(false);
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    if (user) {
      const habitUpdate = habits.find(
        (habit) => habit._id === updateHabit.habitId
      );

      if (
        updateHabit.name === habitUpdate.name &&
        updateHabit.startDate === habitUpdate.startDate &&
        updateHabit.endDate === habitUpdate.endDate
      ) {
        setUpdateError("No changes made");
        return;
      }
    }
    setUpdateConfirm(true);
  };
  
  const today = moment();

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#2D2A26] font-sans">
      <Confetti active={confettiActive} onClose={() => setConfettiActive(false)} />
      <Navbar />

      {/* Header */}
      <div className="py-12 px-6 max-w-7xl mx-auto w-full text-center">
        <p className="text-[#C38A72] text-xs font-semibold tracking-[0.3em] uppercase mb-2">Routines</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-[#2D2A26]">
          Goal<span className="text-[#7E8F7A] italic font-normal">Minder</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start flex-grow">
        {/* Left Side Form */}
        <div className="lg:col-span-5 w-full flex flex-col items-center">
          <div className="w-full bg-white rounded-2xl border border-[#736E67]/[0.08] shadow-sm p-6 sm:p-8 text-left">
            {updateFormVisible ? (
              <form onSubmit={handleUpdateClick} className="space-y-6">
                <h3 className="font-serif text-xl font-semibold text-[#2D2A26] mb-2">
                  Update Habit
                </h3>
                <div className="flex flex-col">
                  <label className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1">
                    Habit Name
                  </label>
                  <input
                    className="input-cozy"
                    type="text"
                    name="name"
                    value={updateHabit.name}
                    onChange={handleUpdateChange}
                    placeholder="Enter updated habit name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1">
                    Start Date
                  </label>
                  <input
                    className="input-cozy text-[#736E67]"
                    type="date"
                    name="startDate"
                    value={moment.utc(updateHabit.startDate).format("YYYY-MM-DD")}
                    onChange={handleUpdateChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1">
                    End Date
                  </label>
                  <input
                    className="input-cozy text-[#736E67]"
                    type="date"
                    name="endDate"
                    value={moment.utc(updateHabit.endDate).format("YYYY-MM-DD")}
                    onChange={handleUpdateChange}
                  />
                </div>
                {updateError && (
                  <p className="text-[#D66B6B] text-xs font-light">{updateError}</p>
                )}
                <div className="flex gap-3 pt-2">
                  <button className="btn-cozy-primary flex-1 py-3" type="submit">
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateCancel}
                    className="btn-cozy-outline flex-1 py-3"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleAddClick} className="space-y-6">
                <h3 className="font-serif text-xl font-semibold text-[#2D2A26] mb-2">
                  Add New Habit
                </h3>
                <div className="flex flex-col">
                  <label className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1">
                    Habit Name
                  </label>
                  <input
                    className="input-cozy"
                    type="text"
                    name="name"
                    value={habit.name}
                    onChange={handleChange}
                    placeholder="e.g. Morning Meditation, Reading"
                  />
                  {nameError && (
                    <p className="text-[#D66B6B] text-xs mt-1.5 font-light">{nameError}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1">
                    Start Date
                  </label>
                  <input
                    className="input-cozy text-[#736E67]"
                    type="date"
                    name="startDate"
                    value={habit.startDate}
                    onChange={handleChange}
                  />
                  {startDateError && (
                    <p className="text-[#D66B6B] text-xs mt-1.5 font-light">{startDateError}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1">
                    End Date
                  </label>
                  <input
                    className="input-cozy text-[#736E67]"
                    type="date"
                    name="endDate"
                    value={habit.endDate}
                    onChange={handleChange}
                  />
                  {endDateError && (
                    <p className="text-[#D66B6B] text-xs mt-1.5 font-light">{endDateError}</p>
                  )}
                </div>
                <button className="btn-cozy-primary w-full py-3 pt-2" type="submit">
                  Create Habit
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Side Column — Habits List */}
        <div className="lg:col-span-7 w-full bg-white rounded-2xl border border-[#736E67]/[0.08] shadow-sm p-6 sm:p-8">
          <h3 className="font-serif text-2xl font-semibold text-[#2D2A26] text-left pb-4 border-b border-[#736E67]/[0.06] mb-6">
            Active Habits
          </h3>

          {loading ? (
            <HabitSkeleton />
          ) : habits && habits.length === 0 ? (
            <div className="py-16 text-center">
              <svg className="w-12 h-12 mx-auto text-[#736E67]/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-[#736E67]/60 text-base font-light">No habits registered yet.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Active list grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {habits &&
                  habits
                    .filter((data) => moment.utc(data.endDate).isAfter(today))
                    .map((habit) => (
                      <div
                        key={habit._id}
                        className="bg-[#FAF8F5] rounded-xl border border-[#736E67]/[0.06] p-5 hover:border-[#7E8F7A]/30 transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div className="text-left mb-4">
                          <h4 className="font-serif text-lg font-semibold text-[#2D2A26] capitalize">
                            {habit.name}
                          </h4>
                          <p className="text-[#736E67] text-xs font-light mt-1">
                            {moment.utc(habit.startDate).format("MMM DD")} — {moment.utc(habit.endDate).format("MMM DD, YYYY")}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            className="py-1.5 px-2 bg-white text-xs font-medium text-[#7E8F7A] border border-[#7E8F7A]/20 rounded-lg hover:bg-[#7E8F7A] hover:text-white transition duration-300 shadow-sm"
                            onClick={() => showHabitDetails(habit)}
                          >
                            Status
                          </button>
                          <button
                            className="py-1.5 px-2 bg-white text-xs font-medium text-[#736E67] border border-[#736E67]/20 rounded-lg hover:border-[#2D2A26] hover:text-[#2D2A26] transition duration-300 shadow-sm"
                            onClick={() => handleUpdateButtonClick(habit)}
                          >
                            Edit
                          </button>
                          <button
                            className="py-1.5 px-2 bg-white text-xs font-medium text-[#D66B6B] border border-[#D66B6B]/20 rounded-lg hover:bg-[#D66B6B] hover:text-white transition duration-300 shadow-sm"
                            onClick={() => handleDeleteClick(habit._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
              </div>

              {/* Expired list block */}
              {habits && habits.filter((data) => moment.utc(data.endDate).isBefore(today)).length > 0 && (
                <div className="pt-6 border-t border-[#736E67]/[0.08]">
                  <h4 className="text-sm font-semibold tracking-wider text-[#736E67]/70 uppercase text-left mb-4">
                    Expired Habits
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {habits &&
                      habits
                        .filter((data) => moment.utc(data.endDate).isBefore(today))
                        .map((habit) => (
                          <div
                            key={habit._id}
                            className="bg-[#F4F1EC]/60 rounded-xl border border-[#736E67]/[0.06] p-5 flex flex-col justify-between opacity-70 hover:opacity-100 transition-opacity"
                          >
                            <div className="text-left mb-4">
                              <h4 className="font-serif text-lg font-semibold text-[#736E67] capitalize line-through">
                                {habit.name}
                              </h4>
                              <p className="text-[#736E67]/80 text-xs font-light mt-1">
                                {moment.utc(habit.startDate).format("MMM DD")} — {moment.utc(habit.endDate).format("MMM DD, YYYY")} (Ended)
                              </p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <button
                                className="py-1.5 px-2 bg-white text-xs font-medium text-[#7E8F7A] border border-[#7E8F7A]/20 rounded-lg hover:bg-[#7E8F7A] hover:text-white transition duration-300"
                                onClick={() => showHabitDetails(habit)}
                              >
                                Status
                              </button>
                              <button
                                className="py-1.5 px-2 bg-white text-xs font-medium text-[#736E67] border border-[#736E67]/20 rounded-lg hover:border-[#2D2A26] hover:text-[#2D2A26] transition duration-300"
                                onClick={() => handleUpdateButtonClick(habit)}
                              >
                                Edit
                              </button>
                              <button
                                className="py-1.5 px-2 bg-white text-xs font-medium text-[#D66B6B] border border-[#D66B6B]/20 rounded-lg hover:bg-[#D66B6B] hover:text-white transition duration-300"
                                onClick={() => handleDeleteClick(habit._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Habit detail drawer modal component */}
      {habitDetailsVisible && (
        <HabitDetails
          habit={selectedHabit}
          onClose={closeHabitDetails}
          onToggleCompletion={handleToggle}
        />
      )}

      <Footer />
      
      <ConfirmBox
        visible={deleteConfirm}
        message="Are you sure you want to delete this habit?"
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
      <ConfirmBox
        visible={addConfirm}
        message="Are you sure you want to register this habit?"
        onCancel={handleAddCancel}
        onConfirm={handleAddConfirm}
      />
      <ConfirmBox
        visible={updateConfirm}
        message="Are you sure you want to update this habit?"
        onCancel={handleUpdateCancel}
        onConfirm={handleUpdateConfirm}
      />
    </div>
  );
};

export default Habit;
