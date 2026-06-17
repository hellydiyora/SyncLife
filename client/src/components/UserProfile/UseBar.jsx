import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser, fetchUser, updateUser } from "../../reducers/authSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useToast } from "../Toast/ToastContext";

const UserBar = ({ userOpen, setUserOpen }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();
  const fetchU = useSelector(selectUser);
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nickname: "",
    birthDate: "",
    bio: "",
    phoneNumber: "",
    favoriteQuote: "",
  });

  const getDetails = () => {
    try {
      const email = fetchU.email;
      if (email && fetchU.token) {
        dispatch(fetchUser({ email, userToken: fetchU.token }));
      }
    } catch (error) {
      console.error("Error in fetching: ", error);
    }
  };

  useEffect(() => {
    getDetails();
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        nickname: userData.nickname || "",
        birthDate: userData.birthDate ? moment(userData.birthDate).format("YYYY-MM-DD") : "",
        bio: userData.bio || "",
        phoneNumber: userData.phoneNumber || "",
        favoriteQuote: userData.favoriteQuote || "",
      });
    }
  }, [userData, isEditing]);

  const handleLogOut = async () => {
    try {
      await dispatch(logoutUser());
      setUserOpen(false);
      navigate("/");
    } catch (error) {
      console.log("Error in logging out: ", error);
    }
  };

  const handleClose = () => {
    setUserOpen(false);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      showToast("First name and Last name are required.", "error");
      return;
    }

    try {
      const result = await dispatch(updateUser({
        userData: {
          email: userData.email,
          ...formData,
        },
        userToken: fetchU.token,
      }));
      if (!result.error) {
        showToast("Profile updated successfully!", "success");
        setIsEditing(false);
      } else {
        showToast(result.error.message || "Failed to update profile", "error");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      showToast("An unexpected error occurred updating profile.", "error");
    }
  };

  return (
    <div className="h-screen w-80 sm:w-96 bg-white border-r border-[#736E67]/10 z-50 flex flex-col justify-between p-8 font-sans shadow-[5px_0_30px_rgba(0,0,0,0.12)] animate-fadeIn">
      {/* Drawer Header */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <h2 className="font-serif text-2xl font-semibold text-[#2D2A26]">
            {isEditing ? "Edit Profile" : "Your Account"}
          </h2>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-[#736E67]/[0.05] text-[#736E67] hover:text-[#2D2A26] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto pr-1 -mr-2 space-y-5">
          {userData && (
            isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4 pb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#736E67] text-[10px] font-semibold tracking-wider uppercase mb-1 block">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-transparent text-[#2D2A26] border border-[#736E67]/20 rounded-xl text-sm focus:outline-none focus:border-[#7E8F7A] dark:focus:border-[#93A68F] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[#736E67] text-[10px] font-semibold tracking-wider uppercase mb-1 block">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-transparent text-[#2D2A26] border border-[#736E67]/20 rounded-xl text-sm focus:outline-none focus:border-[#7E8F7A] dark:focus:border-[#93A68F] transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#736E67] text-[10px] font-semibold tracking-wider uppercase mb-1 block">
                    Nickname (Personal Touch)
                  </label>
                  <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    placeholder="e.g. Helly"
                    className="w-full px-3 py-2 bg-transparent text-[#2D2A26] border border-[#736E67]/20 rounded-xl text-sm focus:outline-none focus:border-[#7E8F7A] dark:focus:border-[#93A68F] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[#736E67] text-[10px] font-semibold tracking-wider uppercase mb-1 block">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-transparent text-[#2D2A26] border border-[#736E67]/20 rounded-xl text-sm focus:outline-none focus:border-[#7E8F7A] dark:focus:border-[#93A68F] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[#736E67] text-[10px] font-semibold tracking-wider uppercase mb-1 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="e.g. +1 (555) 019-2834"
                    className="w-full px-3 py-2 bg-transparent text-[#2D2A26] border border-[#736E67]/20 rounded-xl text-sm focus:outline-none focus:border-[#7E8F7A] dark:focus:border-[#93A68F] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[#736E67] text-[10px] font-semibold tracking-wider uppercase mb-1 block">
                    Favorite Quote
                  </label>
                  <input
                    type="text"
                    name="favoriteQuote"
                    value={formData.favoriteQuote}
                    onChange={handleChange}
                    placeholder="A message that inspires you"
                    className="w-full px-3 py-2 bg-transparent text-[#2D2A26] border border-[#736E67]/20 rounded-xl text-sm focus:outline-none focus:border-[#7E8F7A] dark:focus:border-[#93A68F] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[#736E67] text-[10px] font-semibold tracking-wider uppercase mb-1 block">
                    Bio / About Me
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Write a small bio about yourself..."
                    rows={3}
                    className="w-full px-3 py-2 bg-transparent text-[#2D2A26] border border-[#736E67]/20 rounded-xl text-sm focus:outline-none focus:border-[#7E8F7A] dark:focus:border-[#93A68F] transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="w-full py-2.5 border border-[#736E67]/20 text-[#736E67] rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#736E67]/[0.05] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 bg-[#7E8F7A] text-white rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#6A7B66] transition-all flex items-center justify-center gap-1.5"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white rounded-2xl border border-[#736E67]/[0.08] p-6 shadow-sm space-y-5">
                {/* User Identity */}
                <div className="flex items-center gap-4 pb-4 border-b border-[#736E67]/[0.06]">
                  <div className="w-14 h-14 bg-[#7E8F7A] text-white font-serif rounded-full flex flex-shrink-0 items-center justify-center text-2xl font-bold">
                    {userData.firstName?.[0]?.toUpperCase() || "S"}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-2">
                      <p className="font-serif text-lg font-semibold text-[#2D2A26] leading-tight">
                        {userData.firstName} {userData.lastName}
                      </p>
                    </div>
                    {userData.nickname && (
                      <span className="inline-block mt-1 bg-[#7E8F7A]/10 text-[#7E8F7A] text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider">
                        "{userData.nickname}"
                      </span>
                    )}
                    <p className="text-xs text-[#736E67] font-light mt-1 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-[#7E8F7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      Journal Owner
                    </p>
                  </div>
                </div>

                {/* Details Section */}
                <div className="space-y-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-[#736E67] text-[10px] font-semibold tracking-wider uppercase mb-0.5">
                      Email Address
                    </span>
                    <span className="text-[#2D2A26] font-light break-all">{userData.email}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[#736E67] text-[10px] font-semibold tracking-wider uppercase mb-0.5">
                      Date of Birth
                    </span>
                    <span className="text-[#2D2A26] font-light">
                      {userData.birthDate ? moment(userData.birthDate).format("MMMM DD, YYYY") : "Not specified"}
                    </span>
                  </div>

                  {userData.phoneNumber && (
                    <div className="flex flex-col">
                      <span className="text-[#736E67] text-[10px] font-semibold tracking-wider uppercase mb-0.5">
                        Phone Number
                      </span>
                      <span className="text-[#2D2A26] font-light">{userData.phoneNumber}</span>
                    </div>
                  )}

                  {userData.favoriteQuote && (
                    <div className="flex flex-col pt-1">
                      <span className="text-[#736E67] text-[10px] font-semibold tracking-wider uppercase mb-1">
                        Favorite Quote
                      </span>
                      <div className="border-l-2 border-[#7E8F7A]/40 pl-3 italic text-[#2D2A26]/85 font-serif text-xs leading-relaxed">
                        "{userData.favoriteQuote}"
                      </div>
                    </div>
                  )}

                  {userData.bio && (
                    <div className="flex flex-col">
                      <span className="text-[#736E67] text-[10px] font-semibold tracking-wider uppercase mb-0.5">
                        Bio / About Me
                      </span>
                      <p className="text-[#2D2A26]/85 font-light text-xs leading-relaxed whitespace-pre-line">
                        {userData.bio}
                      </p>
                    </div>
                  )}
                </div>

                {/* Edit Toggle Button */}
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-2 py-2 border border-[#736E67]/20 hover:bg-[#736E67]/[0.04] text-[#2D2A26] rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 text-[#7E8F7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  Edit Profile
                </button>
              </div>
            )
          )}
        </div>
      </div>

      {/* Logout button */}
      <div className="flex-shrink-0 pt-4 mt-4 border-t border-[#736E67]/10">
        <button
          onClick={handleLogOut}
          className="w-full py-3 border border-[#D66B6B]/40 hover:bg-[#D66B6B]/[0.04] text-[#D66B6B] rounded-full text-sm font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserBar;
