import React, { useEffect, useRef, useState } from "react";
import Footer from "../Home/Footer";
import Navbar from "../Home/Navbar";
import GratiCalender from "../Calendar/GratiCalender";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../reducers/authSlice";
import {
  addGratitude,
  fetchGratitudes,
  setGratitudes,
} from "../../reducers/gratiSlice";
import GratiDetails from "./GratiDetails";
import ConfirmBox from "../ConfirmBox";

const Gratitude = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    date: "",
    entry: "",
    file: null,
  });
  const [gratiDetailsVisible, setGratiDetailsVisible] = useState(false);
  const [confirmBoxVisible, setConfirmBoxVisible] = useState(false);
  const [confirmAddEntry, setConfirmAddEntry] = useState(false);
  const [dataError, setDataError] = useState("");

  const fileInputRef = useRef(null);

  const user = useSelector(selectUser);
  const gratitudes = useSelector((state) => state.gratitude.gratitudes);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setDataError("");
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
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
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [dispatch]);

  const handleUpload = async () => {
    try {
      if (user) {
        const { date, entry, file } = formData;
        const imageFile = file ? file : "blank.jpg";

        await dispatch(
          addGratitude({
            date,
            entry,
            imageFile,
            userToken: user.token,
          })
        );

        setFormData({
          date: "",
          entry: "",
          file: null,
        });

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
      fetchAndSetGratitude();
    } catch (error) {
      console.error("Error in submitting gratitude:", error);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setGratiDetailsVisible(true);
  };

  const closeGratiDetails = () => {
    setGratiDetailsVisible(false);
    fetchAndSetGratitude();
  };

  useEffect(() => {
    if (gratiDetailsVisible || confirmBoxVisible || confirmAddEntry) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [gratiDetailsVisible, confirmBoxVisible, confirmAddEntry]);

  const handleConfirmCancel = () => {
    setConfirmBoxVisible(false);
    setFormData({
      date: "",
      entry: "",
      file: null,
    });
  };

  const handleConfirmChange = async () => {
    setConfirmBoxVisible(false);
    const { date, entry, file } = formData;
    const imageFile = file ? file : "blank.jpg";
    await dispatch(
      addGratitude({
        date,
        entry,
        imageFile,
        userToken: user.token,
      })
    );

    setFormData({
      date: "",
      entry: "",
      file: null,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    fetchAndSetGratitude();
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (user) {
      const { date } = formData;

      if (!formData.date.trim()) {
        setDataError("Date cannot be empty");
        return;
      }
      const existingEntry = gratitudes.filter((gratitude) =>
        moment.utc(gratitude.date).format("YYYY-MM-DD") === date
      );

      if (existingEntry.length > 0) {
        setConfirmBoxVisible(true);
        return;
      } else {
        setConfirmAddEntry(true);
      }
    }
  };
  const handleAddConfirm = (e) => {
    setConfirmAddEntry(false);
    handleUpload();
  };

  const handleAddCancel = () => {
    setConfirmAddEntry(false);
    setFormData({
      date: "",
      entry: "",
      file: null,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#2D2A26] font-sans">
      <Navbar />

      {/* Header */}
      <div className="py-12 px-6 max-w-7xl mx-auto w-full text-center">
        <p className="text-[#C38A72] text-xs font-semibold tracking-[0.3em] uppercase mb-2">Gratitude Log</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-[#2D2A26]">
          Grati<span className="text-[#7E8F7A] italic font-normal">Memo</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start flex-grow">
        {/* Left Side: Calendar Log */}
        <div className="lg:col-span-6 w-full flex justify-center pt-4">
          <div className="flex flex-col items-center gap-6 w-full max-w-md">
            <h3 className="font-serif text-xl font-semibold text-[#2D2A26] text-left w-full">
              Your Gratitude Calendar
            </h3>
            <GratiCalender
              onDateClick={handleDateClick}
              selectedDate={selectedDate}
            />
            <p className="text-xs text-[#736E67] font-light leading-relaxed text-center">
              Click on any highlighted date in the calendar to review or reflect on past happy memories.
            </p>
          </div>
        </div>

        {/* Right Side: Add Entry Form */}
        <div className="lg:col-span-6 w-full flex justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl border border-[#736E67]/[0.08] shadow-sm p-6 sm:p-8 text-left">
            <h3 className="font-serif text-xl font-semibold text-[#2D2A26] mb-6">
              Enter Your Happy Moment
            </h3>
            <form className="space-y-6" onSubmit={handleAddSubmit}>
              <div className="flex flex-col">
                <label className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1">
                  Select Date
                </label>
                <input
                  className="input-cozy text-[#736E67]"
                  type="date"
                  name="date"
                  onChange={handleChange}
                  value={formData.date}
                />
                {dataError && (
                  <p className="text-[#D66B6B] text-xs mt-1.5 font-light">{dataError}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1">
                  What are you grateful for?
                </label>
                <input
                  className="input-cozy"
                  type="text"
                  name="entry"
                  placeholder="I am grateful for..."
                  onChange={handleChange}
                  value={formData.entry}
                />
              </div>

              {/* Photo attachment commented out for now as requested */}
              {/* <div className="flex flex-col">
                <label className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1.5">
                  Attach an Image
                </label>
                <input
                  className="w-full text-xs text-[#736E67] font-light file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#7E8F7A]/10 file:text-[#7E8F7A] file:hover:bg-[#7E8F7A]/20 transition-all cursor-pointer"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </div> */}

              <button
                type="submit"
                className="btn-cozy-primary w-full py-3 pt-2"
              >
                Save Moment
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Details modal drawer */}
      {selectedDate && gratiDetailsVisible && (
        <GratiDetails date={selectedDate} onClose={closeGratiDetails} />
      )}

      <Footer />

      <ConfirmBox
        visible={confirmAddEntry}
        message="Are you sure you want to add this gratitude entry?"
        onCancel={handleAddCancel}
        onConfirm={handleAddConfirm}
      />
      <ConfirmBox
        visible={confirmBoxVisible}
        message="An entry already exists for this date. Do you want to overwrite it?"
        onCancel={handleConfirmCancel}
        onConfirm={handleConfirmChange}
      />
    </div>
  );
};

export default Gratitude;
