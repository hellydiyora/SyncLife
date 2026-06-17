import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, checkOtp, forgotUser } from "../reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";
import signupImg from "../assets/images/signup.jpg";

const ForgotPwd = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [otpData, setOtpData] = useState({ otp: "" });
  const [otpMode, setOtpMode] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resetData, setResetData] = useState({ email: "", password: "", otp: "" });
  const [otpError, setOtpError] = useState("");
  const [logInSuccess, setLogInSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(forgotUser(formData));
      setResetData((prev) => ({ ...prev, email: formData.email }));
      setOtpMode(true);
    } catch (error) {
      console.error("Forgot pwd email error:", error);
    }
    setFormData({ email: "" });
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(checkOtp({ email: resetData.email, otp: otpData.otp }));
      if (response.payload.message === "OTP verified successfully") {
        setResetData((prev) => ({ ...prev, otp: otpData.otp }));
        setOtpVerified(true);
      }
    } catch (error) {
      setOtpError("Invalid OTP code");
      console.error("Forgot pwd OTP verification error:", error);
    }
    setOtpData({ otp: "" });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      if (await dispatch(changePassword(resetData))) {
        setLogInSuccess(true);
      }
    } catch (error) {
      console.error("Error resetting password");
    }
  };

  const handleResetChange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtpData({ ...otpData, [e.target.name]: e.target.value });
    setOtpError("");  
  };

  useEffect(() => {
    if (logInSuccess && !error) {
      navigate("/home");
      setLogInSuccess(false);
    } else if (error) {
      console.error("Password change post-navigation error:", error);
      setLogInSuccess(false);
    }
  }, [logInSuccess, error, navigate]);

  const getStepInfo = () => {
    if (otpVerified) {
      return { title: "Set new password", subtitle: "Choose a secure password to protect your diary." };
    }
    if (otpMode) {
      return { title: "Enter verification code", subtitle: "Please check your inbox for the OTP code we sent." };
    }
    return { title: "Reset your password", subtitle: "Enter your registered email address and we'll send a code." };
  };

  const stepInfo = getStepInfo();

  return (
    <div className="min-h-screen flex bg-[#FAF8F5] text-[#2D2A26] font-sans">
      {/* Left side — Cozy physical notebook image */}
      <div className="hidden md:block md:w-1/2 relative image-light-overlay">
        <img
          src={signupImg}
          alt="Hands writing reflections in a notebook"
          className="w-full h-full object-cover"
        />
        {/* Floating quote */}
        <div className="absolute bottom-16 left-16 right-16 z-10 text-left">
          <p className="font-serif text-white text-xl md:text-2xl font-light italic leading-relaxed drop-shadow-md">
            "Every moment is a fresh beginning."
          </p>
          <p className="text-white/80 text-xs tracking-[0.2em] uppercase mt-4 font-semibold drop-shadow-sm">
            — T.S. Eliot
          </p>
        </div>
      </div>

      {/* Right side — Clean, multi-step forgot form */}
      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center px-8 sm:px-16 lg:px-24">
        <div className="w-full max-w-md animate-scaleIn text-left">
          {/* Logo */}
          <Link to="/" className="inline-block mb-10">
            <span className="font-serif text-2xl font-semibold tracking-wide text-[#2D2A26]">
              Sync<span className="text-[#7E8F7A] italic font-normal">Life</span>
            </span>
          </Link>

          {/* Simple organic progress step bar */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`w-10 h-1.5 rounded-full ${!otpMode && !otpVerified ? 'bg-[#7E8F7A]' : 'bg-[#736E67]/15'} transition-all duration-300`}></div>
            <div className={`w-10 h-1.5 rounded-full ${otpMode && !otpVerified ? 'bg-[#7E8F7A]' : 'bg-[#736E67]/15'} transition-all duration-300`}></div>
            <div className={`w-10 h-1.5 rounded-full ${otpVerified ? 'bg-[#7E8F7A]' : 'bg-[#736E67]/15'} transition-all duration-300`}></div>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl font-semibold text-[#2D2A26] tracking-tight mb-2">
            {stepInfo.title}
          </h1>
          <p className="text-[#736E67] text-sm font-light mb-10">
            {stepInfo.subtitle}
          </p>

          {otpVerified ? (
            /* STEP 3: Change Password Form */
            <form onSubmit={handlePasswordSubmit} className="space-y-8">
              <div className="flex flex-col">
                <label
                  htmlFor="forgot-reset-email"
                  className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1"
                >
                  Confirm Email
                </label>
                <input
                  id="forgot-reset-email"
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  value={resetData.email}
                  onChange={handleResetChange}
                  className="input-cozy"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="forgot-reset-password"
                  className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1"
                >
                  New Password
                </label>
                <input
                  id="forgot-reset-password"
                  type="password"
                  placeholder="Enter secure new password"
                  name="password"
                  value={resetData.password}
                  onChange={handleResetChange}
                  className="input-cozy"
                />
              </div>
              <button className="btn-cozy-primary w-full mt-4 py-3" type="submit">
                Update Password
              </button>
            </form>
          ) : otpMode ? (
            /* STEP 2: OTP Verification Form */
            <form onSubmit={handleOtpSubmit} className="space-y-8">
              <div className="flex flex-col">
                <label
                  htmlFor="forgot-otp"
                  className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1"
                >
                  Verification OTP
                </label>
                <input
                  id="forgot-otp"
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit code"
                  value={otpData.otp}
                  onChange={handleOtpChange}
                  className="input-cozy text-center tracking-[0.2em] font-medium"
                />
              </div>
              {otpError && (
                <div className="py-3 px-4 bg-[#D66B6B]/10 border border-[#D66B6B]/20 rounded-lg">
                  <p className="text-[#D66B6B] text-sm font-light">{otpError}</p>
                </div>
              )}
              <button className="btn-cozy-primary w-full mt-4 py-3" type="submit">
                Verify Code
              </button>
            </form>
          ) : (
            /* STEP 1: Email Input Form */
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex flex-col">
                <label
                  htmlFor="forgot-email"
                  className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1"
                >
                  Email Address
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-cozy"
                />
              </div>
              {error && (
                <div className="py-3 px-4 bg-[#D66B6B]/10 border border-[#D66B6B]/20 rounded-lg">
                  <p className="text-[#D66B6B] text-sm font-light">{error}</p>
                </div>
              )}
              <button
                className="btn-cozy-primary w-full mt-4 py-3"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Sending email..." : "Send Verification Code"}
              </button>
            </form>
          )}

          {/* Return link */}
          <div className="mt-10 pt-8 border-t border-[#736E67]/10">
            <Link
              to="/login"
              className="text-[#736E67] hover:text-[#2D2A26] text-sm font-medium transition-colors duration-300 flex items-center gap-2"
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

export default ForgotPwd;
