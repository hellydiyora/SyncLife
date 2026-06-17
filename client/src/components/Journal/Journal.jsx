import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addList,
  deleteList,
  fetchLists,
  listCompleted,
  setLists,
  updateList,
} from "../../reducers/journalSlice";
import Calendar from "../Calendar/Calendar";

import moment from "moment";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { selectUser } from "../../reducers/authSlice";
import ConfirmBox from "../ConfirmBox";
import { TaskSkeleton } from "../Skeletons";
import { useToast } from "../Toast/ToastContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Journal = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.list.lists);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newList, setNewList] = useState("");
  const [newUpdatedList, setNewUpdatedList] = useState("");
  const [updateMode, setUpdateMode] = useState("add");
  const [selectedListId, setSelectedListId] = useState(null);
  const [selecteddataId, setDataId] = useState(null);
  const [TaskError, setTaskError] = useState("");
  const [confirmBoxVisible, setConfirmBoxVisible] = useState(false);
  const [updateconfirmBoxVisible, setUpdateConfirmBoxVisible] = useState(false);
  const [deleteBoxVisible, setDeleteBoxVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [editHover, setEditHover] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const user = useSelector(selectUser);

  const fetchAndSetLists = async () => {
    try {
      if (user) {
        const response = await dispatch(fetchLists(user.token));
        dispatch(setLists(response.payload));
      } else {
        console.log("user not exist");
      }
    } catch (error) {
      console.error("Error fetching lists:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetLists();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [dispatch]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchAndSetLists();
  };

  const handleAddList = async () => {
    try {
      if (user) {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const newDate = `${year}-${month}-${day}`;

        await dispatch(
          addList({
            date: newDate,
            list: newList,
            userToken: user.token,
          })
        );
        fetchAndSetLists();
        showToast("Task added successfully!", "success");
      }
    } catch (error) {
      console.log("Error adding list:", error);
      showToast("Failed to add task.", "error");
    }
    setNewList("");
  };

  const handleDelete = async ({ selecteddataId, selectedListId }) => {
    if (user) {
      try {
        await dispatch(
          deleteList({ selecteddataId, selectedListId, userToken: user.token })
        );
        fetchAndSetLists();
        showToast("Task deleted successfully.", "success");
      } catch (error) {
        console.log("Error deleting list:", error);
        showToast("Failed to delete task.", "error");
      }
    }
  };

  const handleUpdate = async ({ dataId, listId }) => {
    const listToUpdate = lists.find((list) => list._id === dataId);

    const listItemToUpdate = listToUpdate.data.find(
      (item) => item._id === listId
    );
    setNewUpdatedList(listItemToUpdate.list);
    setUpdateMode("update");
    setSelectedListId(listId);
    setDataId(dataId);
    setIsChecked(listItemToUpdate.isCompleted);
    setTaskError("");
  };

  const handleListUpdate = async ({ selectedListId, selecteddataId }) => {
    if (user) {
      try {
        await dispatch(
          updateList({
            listId: selectedListId,
            dataId: selecteddataId,
            updatedList: newUpdatedList,
            isCompleted: isChecked,
            userToken: user.token,
          })
        );
        fetchAndSetLists();

        setUpdateMode("add");
        showToast("Task updated successfully.", "success");
      } catch (error) {
        console.error("Error in updation", error);
        showToast("Failed to update task.", "error");
      }
    }
  };

  const handleButtonClick = async ({ dataId, listId }) => {
    try {
      if (user) {
        await dispatch(
          listCompleted({ dataId, listId, userToken: user.token })
        );

        fetchAndSetLists();
        showToast("Task status updated!", "success");
      }
    } catch (error) {
      console.error("Error in button click: ", error);
      showToast("Failed to toggle task completion.", "error");
    }
  };

  const handleInputChange = (e) => {
    setNewList(e.target.value);
    setTaskError("");
  };

  const handleUpdateInputChange = (e) => {
    setNewUpdatedList(e.target.value);
    setTaskError("");
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setTaskError("");
  };

  const handleConfirmCancel = () => {
    setConfirmBoxVisible(false);
    setNewList("");
  };

  const handleConfirmChange = async () => {
    setConfirmBoxVisible(false);
    await handleAddList();
    setTaskError("");
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    if (user) {
      if (!newList.trim()) {
        setTaskError("Task cannot be empty");
        return;
      }
    }
    setConfirmBoxVisible(true);
  };

  const handleUpdateConfirmCancel = () => {
    setUpdateConfirmBoxVisible(false);
    setNewUpdatedList("");
    setUpdateMode("add");
  };

  const handleUpdateConfirmChange = async () => {
    setUpdateConfirmBoxVisible(false);
    await handleListUpdate({ selectedListId, selecteddataId });
  };

  const handleUpdateClick = ({ selectedListId, selecteddataId }) => {
    setSelectedListId(selectedListId);
    setDataId(selecteddataId);
    const listToUpdate = lists.find((list) => list._id === selecteddataId);
    const listItemToUpdate = listToUpdate.data.find(
      (item) => item._id === selectedListId
    );
    if (
      newUpdatedList === listItemToUpdate.list &&
      isChecked === listItemToUpdate.isCompleted
    ) {
      setTaskError("No changes made");
      return;
    }
    setUpdateConfirmBoxVisible(true);
  };

  const handleDeleteCancel = () => {
    setDeleteBoxVisible(false);
  };

  const handleDeleteConfirm = () => {
    setDeleteBoxVisible(false);
    handleDelete({ selecteddataId, selectedListId });
  };

  const handleDeleteClick = ({ selecteddataId, selectedListId }) => {
    setSelectedListId(selectedListId);
    setDataId(selecteddataId);
    setDeleteBoxVisible(true);
  };

  const handleHover = (id) => {
    setHoveredItem(id);
  };

  const handleUnhover = () => {
    setHoveredItem(null);
  };

  const handleEditHover = (id) => {
    setEditHover(id);
  };

  const handleEditUnhover = () => {
    setEditHover(null);
  };
  
  useEffect(() => {
    if (deleteBoxVisible || updateconfirmBoxVisible || confirmBoxVisible) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [deleteBoxVisible, updateconfirmBoxVisible, confirmBoxVisible]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#2D2A26] font-sans">
      <Navbar />
      
      {/* Title Header */}
      <div className="py-12 px-6 max-w-7xl mx-auto w-full text-center">
        <p className="text-[#C38A72] text-xs font-semibold tracking-[0.3em] uppercase mb-2">Organizer</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-[#2D2A26]">
          Task<span className="text-[#7E8F7A] italic font-normal">Mate</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start flex-grow">
        {/* Left Side Column: Form & Calendar */}
        <div className="lg:col-span-5 flex flex-col gap-8 items-center w-full">
          <div className="w-full bg-white rounded-2xl border border-[#736E67]/[0.08] shadow-sm p-6 sm:p-8">
            {updateMode === "add" ? (
              <form onSubmit={handleAddClick} className="flex flex-col items-start w-full text-left">
                <h3 className="font-serif text-xl font-semibold text-[#2D2A26] mb-5">
                  Add New Task
                </h3>
                <div className="flex flex-col gap-4 w-full">
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="What would you like to achieve?"
                      value={newList}
                      onChange={handleInputChange}
                      className="input-cozy"
                    />
                    {TaskError && (
                      <p className="text-[#D66B6B] text-xs mt-2 font-light">{TaskError}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn-cozy-primary w-full py-3 mt-2"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-start w-full text-left">
                <h3 className="font-serif text-xl font-semibold text-[#2D2A26] mb-5">
                  Update Task
                </h3>
                <div className="flex flex-col gap-6 w-full">
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Update task description"
                      value={newUpdatedList}
                      onChange={handleUpdateInputChange}
                      className="input-cozy"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="task-complete"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className="rounded border-[#736E67]/30 text-[#7E8F7A] focus:ring-[#7E8F7A] w-4 h-4"
                    />
                    <label htmlFor="task-complete" className="text-sm text-[#736E67] font-medium cursor-pointer">
                      Mark as Completed
                    </label>
                  </div>
                  {TaskError && (
                    <p className="text-[#D66B6B] text-xs font-light">{TaskError}</p>
                  )}
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        handleUpdateClick({ selectedListId, selecteddataId })
                      }
                      className="btn-cozy-primary flex-1 py-3"
                    >
                      Update
                    </button>
                    <button
                      onClick={handleUpdateConfirmCancel}
                      className="btn-cozy-outline flex-1 py-3"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Custom Aesthetic Calendar */}
          <div className="w-full flex justify-center">
            <Calendar
              onDateClick={handleDateClick}
              selectedDate={selectedDate}
            />
          </div>
        </div>

        {/* Right Side Column: Tasks List for Selected Date */}
        <div className="lg:col-span-7 w-full bg-white rounded-2xl border border-[#736E67]/[0.08] shadow-sm p-6 sm:p-8">
          <h3 className="font-serif text-2xl font-semibold text-[#2D2A26] text-left pb-4 border-b border-[#736E67]/[0.06] mb-6">
            Tasks for <span className="text-[#7E8F7A] italic font-normal">{moment(selectedDate).format("MMMM DD, YYYY")}</span>
          </h3>

          {loading ? (
            <TaskSkeleton />
          ) : lists &&
          lists.filter(
            (list) =>
              moment.utc(list.date).format("YYYY-MM-DD") ===
              moment(selectedDate).format("YYYY-MM-DD")
          ).length === 0 ? (
            <div className="py-16 text-center">
              <svg className="w-12 h-12 mx-auto text-[#736E67]/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <p className="text-[#736E67]/60 text-base font-light">No tasks scheduled for this day.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {lists &&
                lists
                  .filter(
                    (list) =>
                      moment.utc(list.date).format("YYYY-MM-DD") ===
                      moment(selectedDate).format("YYYY-MM-DD")
                  )
                  .map((list) =>
                    list.data.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between p-4 bg-[#FAF8F5] rounded-xl border border-[#736E67]/[0.05] hover:border-[#7E8F7A]/30 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
                          <button
                            onClick={() =>
                              handleButtonClick({
                                dataId: list._id,
                                listId: item._id,
                              })
                            }
                            className={`transition-colors duration-200 focus:outline-none flex-shrink-0 ${
                              item.isCompleted ? "text-[#7E8F7A]" : "text-[#736E67]/40 hover:text-[#7E8F7A]"
                            }`}
                          >
                            {item.isCompleted ? (
                              <CheckCircleIcon fontSize="medium" />
                            ) : (
                              <RadioButtonUncheckedIcon fontSize="medium" />
                            )}
                          </button>
                          <span
                            className={`text-sm break-all font-light text-left leading-relaxed ${
                              item.isCompleted ? "line-through text-[#736E67]/60" : "text-[#2D2A26] font-medium"
                            }`}
                          >
                            {item.list}
                          </span>
                        </div>

                        {/* Actions block */}
                        <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() =>
                              handleUpdate({
                                dataId: list._id,
                                listId: item._id,
                              })
                            }
                            className="p-1.5 rounded-full text-[#736E67]/60 hover:text-[#7E8F7A] hover:bg-[#7E8F7A]/5 transition-all"
                            title="Edit"
                          >
                            <EditIcon fontSize="small" />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteClick({
                                selecteddataId: list._id,
                                selectedListId: item._id,
                              })
                            }
                            className="p-1.5 rounded-full text-[#736E67]/60 hover:text-[#D66B6B] hover:bg-[#D66B6B]/5 transition-all"
                            title="Delete"
                          >
                            <DeleteIcon fontSize="small" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
            </div>
          )}
        </div>
      </div>

      <Footer />
      
      <ConfirmBox
        visible={confirmBoxVisible}
        message="Are you sure you want to add this task?"
        onCancel={handleConfirmCancel}
        onConfirm={handleConfirmChange}
      />
      <ConfirmBox
        visible={updateconfirmBoxVisible}
        message="Are you sure you want to update this task?"
        onCancel={handleUpdateConfirmCancel}
        onConfirm={handleUpdateConfirmChange}
      />
      <ConfirmBox
        visible={deleteBoxVisible}
        message="Are you sure you want to delete this task?"
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Journal;
