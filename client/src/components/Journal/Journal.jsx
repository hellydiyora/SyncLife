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
    }
  };

  useEffect(() => {
    fetchAndSetLists();
  }, [dispatch]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchAndSetLists();
  };

  const handleAddList = async () => {
    try {
      if (user) {
        if (!newList.trim()) {
          setTaskError("Task cannot be empty");
          return;
        }

        const newDate = moment(selectedDate).format("YYYY-MM-DD");

        await dispatch(
          addList({
            date: newDate,
            list: newList,
            userToken: user.token,
          })
        );
        fetchAndSetLists();
      }
    } catch (error) {
      console.log("Error adding list:", error);
    }
    setNewList("");
  };

  const handleDelete = async ({ dataId, listId }) => {
    if (user) {
      try {
        await dispatch(deleteList({ dataId, listId, userToken: user.token }));
        fetchAndSetLists();
      } catch (error) {
        console.log("Error deleting list:", error);
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
    setIsChecked(false);
    setTaskError("");
  };

  const handleListUpdate = async ({ selectedListId, selecteddataId }) => {
    if (user) {
      if (!newUpdatedList.trim()) {
        setTaskError("Task cannot be empty");
        return;
      }
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
      } catch (error) {
        console.error("Error in updation", error);
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
      }
    } catch (error) {
      console.error("Error in button click: ", error);
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
    setIsChecked(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="grid grid-cols-2 h-full p-10 bg-gray-100 gap-20 rounded-md">
        <div className="flex flex-col gap-5 items-center">
          <div className="flex justify-center items-center mb-4">
            {updateMode === "add" ? (
              <div>
                <h1 className="text-2xl font-subTag font-semibold mb-3">
                  Add Task
                </h1>
                <div className="flex">
                  <div>
                    <input
                      type="text"
                      placeholder="Add your task"
                      value={newList}
                      onChange={handleInputChange}
                      className="p-2 border-2 border-gray-200 shadow-md shadow-slate-400 rounded-md mr-2  placeholder-slate-900"
                    />
                    {TaskError && (
                      <p className="text-red-500 text-sm">{TaskError}</p>
                    )}
                  </div>
                  <button
                    onClick={handleAddList}
                    className="h-11 bg-slate-200 border-2 border-gray-300 shadow-lg shadow-gray-400 py-2 px-4 rounded-md hover:bg-slate-300 transition duration-300 ease-in-out"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-subTag mb-3">Update Task</h1>
                <div className="flex gap-5">
                  <div className="flex gap-5 items-center justify-center">
                    <div>
                      <input
                        type="text"
                        placeholder="Update list"
                        value={newUpdatedList}
                        onChange={handleUpdateInputChange}
                        className="p-2 border-2 border-gray-200  shadow-md shadow-slate-400 rounded-md  placeholder-slate-900"
                      />
                      {TaskError && (
                        <p className="text-red-500 text-sm">{TaskError}</p>
                      )}
                    </div>
                    <label className="bg-white py-2 px-3 border-2 border-gray-200  shadow-md shadow-slate-400 rounded-md">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      Completed
                    </label>
                  </div>
                  <button
                    onClick={() =>
                      handleListUpdate({ selectedListId, selecteddataId })
                    }
                    className="h-11 bg-slate-200 border-2 border-gray-300 shadow-lg shadow-gray-400 py-2 px-4 rounded-md hover:bg-slate-300 transition duration-300 ease-in-out"
                  >
                    Confirm Update
                  </button>
                </div>
              </div>
            )}
          </div>
          <Calendar
            onDateClick={handleDateClick}
            selectedDate={selectedDate}
            className="p-4"
          />
        </div>
        <div>
          <h2 className="text-5xl mb-4 font-mainTag text-slate-900">
            <span className="text-slate-950 text-6xl">T</span>ask
            <span className="text-slate-950 text-6xl">M</span>ate
          </h2>
          <div className="flex flex-col gap-4 pt-6">
            <h3 className="text-3xl font-subTag font-medium mb-2">
              Tasks for {moment(selectedDate).format("DD-MM-YYYY")}
            </h3>
            {lists &&
            lists.filter(
              (list) =>
                moment(new Date(list.date)).format("YYYY-MM-DD") ===
                moment(selectedDate).format("YYYY-MM-DD")
            ).length === 0 ? (
              <p className="text-gray-500 text-lg">No data available</p>
            ) : (
              <table className="min-w-full shadow-md shadow-gray-400">
                <thead className="tableHead text-white">
                  <tr className="font-allTag">
                    <th className="py-2 px-4 border border-gray-100">List</th>
                    <th className="py-2 px-4 border border-gray-100">Status</th>
                    <th className="py-2 px-4 border border-gray-100">Action</th>
                  </tr>
                </thead>
                <tbody className="tbleBody font-allTag">
                  {lists &&
                    lists
                      .filter(
                        (list) =>
                          moment(new Date(list.date)).format("YYYY-MM-DD") ===
                          moment(selectedDate).format("YYYY-MM-DD")
                      )
                      .map((list) =>
                        list.data.map((item) => (
                          <tr
                            key={item._id}
                            className="mb-2 border p-2 text-gray-800 "
                          >
                            <td className="py-2 px-4 border border-gray-100 break-all">
                              {item.list}
                            </td>
                            <td className="py-2 px-4 border border-gray-100">
                              <button
                                onClick={() =>
                                  handleButtonClick({
                                    dataId: list._id,
                                    listId: item._id,
                                  })
                                }
                                className={`${
                                  item.isCompleted
                                    ? "bg-green-200 "
                                    : "bg-yellow-200"
                                } text-black py-1 px-2 rounded-md shadow-sm shadow-black border-2 border-white`}
                              >
                                {item.isCompleted ? "Completed" : "Incomplete"}
                              </button>
                            </td>
                            <td className="py-2 px-4 border border-gray-100">
                              <div className="flex justify-center gap-3">
                                <button
                                  onClick={() =>
                                    handleDelete({
                                      dataId: list._id,
                                      listId: item._id,
                                    })
                                  }
                                  className="bg-red-200 border-2 border-white text-black py-1 px-2 rounded-md shadow-sm shadow-black"
                                >
                                  Delete
                                </button>

                                <button
                                  className="bg-blue-200 border-2 border-white text-black py-1 px-2 rounded-md shadow-sm shadow-black"
                                  onClick={() =>
                                    handleUpdate({
                                      dataId: list._id,
                                      listId: item._id,
                                    })
                                  }
                                >
                                  Update
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Journal;
