import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  fetchUser,
  selectUser,
} from "../../reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import UserBar from "../UserProfile/UseBar";
import ThemeToggle from "../ThemeToggle";

const NavBox = ({ onClose }) => {
  return (
    <div>
      <div
        className="z-50 bg-[#FAF8F5] dark:bg-[#1E1C19] border border-[#736E67]/[0.08] dark:border-[#9E988E]/10 shadow-lg rounded-bl-xl p-2"
        onClick={onClose}
      >
        <ul className="flex flex-col text-left text-sm text-[#736E67] dark:text-[#9E988E] font-medium tracking-wide">
          <li className="hover:bg-[#7E8F7A]/10 hover:text-[#2D2A26] dark:hover:bg-[#93A68F]/20 dark:hover:text-[#FAF8F5] rounded-lg px-6 py-3 transition-colors duration-200">
            <Link to="/journal">TaskMate</Link>
          </li>
          <li className="hover:bg-[#7E8F7A]/10 hover:text-[#2D2A26] dark:hover:bg-[#93A68F]/20 dark:hover:text-[#FAF8F5] rounded-lg px-6 py-3 transition-colors duration-200">
            <Link to="/habits">GoalMinder</Link>
          </li>
          <li className="hover:bg-[#7E8F7A]/10 hover:text-[#2D2A26] dark:hover:bg-[#93A68F]/20 dark:hover:text-[#FAF8F5] rounded-lg px-6 py-3 transition-colors duration-200">
            <Link to="/mood">EmoSense</Link>
          </li>
          <li className="hover:bg-[#7E8F7A]/10 hover:text-[#2D2A26] dark:hover:bg-[#93A68F]/20 dark:hover:text-[#FAF8F5] rounded-lg px-6 py-3 transition-colors duration-200">
            <Link to="/gratitude">GratiMemo</Link>
          </li>
          <li className="hover:bg-[#7E8F7A]/10 hover:text-[#2D2A26] dark:hover:bg-[#93A68F]/20 dark:hover:text-[#FAF8F5] rounded-lg px-6 py-3 transition-colors duration-200">
            <Link to="/ai">AI Insights</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const dispatch = useDispatch();
  const fetchU = useSelector(selectUser);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const getDetails = () => {
      try {
        if (fetchU?.email && fetchU?.token) {
          dispatch(fetchUser({ email: fetchU.email, userToken: fetchU.token }));
        }
      } catch (error) {
        console.error("Error in fetching user details: ", error);
      }
    };
    getDetails();
  }, [dispatch, fetchU]);

  const handleToggle = () => {
    setIsVisible(!isVisible);
    setUserOpen(false);
  };

  useEffect(() => {
    if (isVisible || userOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [isVisible, userOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        const toggleButton = document.getElementById("profile-toggle-btn");
        if (toggleButton && toggleButton.contains(event.target)) {
          return;
        }
        setUserOpen(false);
      }
    };

    if (userOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userOpen]);

  const handleClick = () => {
    setUserOpen(!userOpen);
    setIsVisible(false);
  };

  const handleClose = () => {
    setUserOpen(false);
  };

  return (
    <div className="sticky top-0 z-40 bg-[#FAF8F5]/80 backdrop-blur-md border-b border-[#736E67]/[0.06]">
      <div className="max-w-7xl mx-auto grid grid-cols-4 sm:grid-cols-5 px-6 md:px-12 py-4 items-center relative">
        {/* Elegant Serif Logo */}
        <div>
          <Link to="/home" className="text-left inline-block">
            <span className="font-serif text-xl font-semibold tracking-wide text-[#2D2A26] dark:text-[#FAF8F5]">
              Sync<span className="text-[#7E8F7A] dark:text-[#9EC49A] italic font-normal">Life</span>
            </span>
          </Link>
        </div>

        {/* Center Desktop Links */}
        <div className="sm:col-span-3">
          <div className="hidden sm:block">
            <ul className="flex items-center justify-center gap-10 text-sm font-medium text-[#736E67] tracking-wide">
              <Link to="/journal" className="hover:text-[#2D2A26] transition-colors duration-200 py-1">
                TaskMate
              </Link>
              <Link to="/habits" className="hover:text-[#2D2A26] transition-colors duration-200 py-1">
                GoalMinder
              </Link>
              <Link to="/mood" className="hover:text-[#2D2A26] transition-colors duration-200 py-1">
                EmoSense
              </Link>
              <Link to="/gratitude" className="hover:text-[#2D2A26] transition-colors duration-200 py-1">
                GratiMemo
              </Link>
              <Link to="/ai" className="hover:text-[#2D2A26] transition-colors duration-200 py-1 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-[#7E8F7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                Insights
              </Link>
            </ul>
          </div>
        </div>

        {/* Right side — user control SVG triggers */}
        <div className="col-span-2 sm:col-span-1 flex justify-end items-center gap-4">
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {/* Progress button */}
            <Link
              to="/user"
              className="text-[#736E67] hover:text-[#2D2A26] transition-colors duration-200 p-2 rounded-full hover:bg-[#736E67]/[0.05]"
              title="Progress Profile"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </Link>

            {/* Profile Drawer trigger */}
            <div className="relative">
              <button
                id="profile-toggle-btn"
                onClick={handleClick}
                className="text-[#736E67] hover:text-[#2D2A26] transition-colors duration-200 p-2 rounded-full hover:bg-[#736E67]/[0.05]"
                title="Profile Settings"
              >
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {userOpen && (
                <div
                  className="fixed inset-0 bg-[#2D2A26]/30 backdrop-blur-sm z-40"
                  onClick={handleClose}
                ></div>
              )}
              <div
                ref={sidebarRef}
                className={`fixed top-0 bottom-0 h-screen z-50 shadow-2xl transition-all duration-500 ease-in-out ${
                  userOpen ? "left-0" : "-left-[400px]"
                }`}
              >
                <UserBar userOpen={userOpen} setUserOpen={setUserOpen} />
              </div>
            </div>
          </div>

          {/* Mobile responsive toggle */}
          <div
            className="block sm:hidden cursor-pointer p-1.5 hover:bg-[#736E67]/[0.05] rounded-full text-[#736E67] hover:text-[#2D2A26] transition-colors duration-200"
            onClick={handleToggle}
          >
            {isVisible ? (
              <CloseIcon fontSize="small" />
            ) : (
              <MenuIcon fontSize="small" />
            )}
          </div>
        </div>

        {/* Mobile dropdown slider */}
        {isVisible && (
          <div
            className="fixed inset-0 bg-[#2D2A26]/20 backdrop-blur-sm z-40"
            onClick={handleToggle}
          ></div>
        )}
        <div
          className={`absolute top-full right-4 z-50 w-48 transition-all duration-300 ${
            isVisible ? "opacity-100 scale-100 translate-y-2" : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <NavBox onClose={handleToggle} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
