import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../reducers/authSlice";
import { Link } from "react-router-dom";

const ResetPwd = () => {
  const [resetData, setResetData] = useState({password: "" });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(changePassword(resetData))
    } catch(error) {
      console.error("Error resetting password:", error);
    }
    setResetData({ password: "" });
  };

  const handleChange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2A26] flex items-center justify-center px-6 font-sans">
      <div className="w-full max-w-md animate-scaleIn">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <span className="font-serif text-2xl font-semibold tracking-wide text-[#2D2A26]">
              Sync<span className="text-[#7E8F7A] italic font-normal">Life</span>
            </span>
          </Link>
        </div>

        {/* Cozy White Editorial Card */}
        <div className="bg-white rounded-2xl border border-[#736E67]/[0.08] shadow-lg shadow-[#2D2A26]/[0.02] p-10 text-left">
          <h1 className="font-serif text-3xl font-semibold text-[#2D2A26] tracking-tight mb-2 text-center">
            Reset password
          </h1>
          <p className="text-[#736E67] text-sm font-light mb-10 text-center">
            Pick a secure new password for your digital journal.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col">
              <label
                htmlFor="reset-password"
                className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1"
              >
                New Password
              </label>
              <input
                id="reset-password"
                type="password"
                placeholder="Enter secure new password"
                name="password"
                value={resetData.password}
                onChange={handleChange}
                className="input-cozy"
              />
            </div>
            
            <button
              className="btn-cozy-primary w-full mt-4 py-3"
              type="submit"
            >
              Update Password
            </button>
          </form>

          {/* Return link */}
          <div className="mt-8 pt-6 border-t border-[#736E67]/10 text-center">
            <Link
              to="/login"
              className="text-[#736E67] hover:text-[#2D2A26] text-sm font-medium transition-colors duration-300 inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPwd;
