import React from 'react';
import signupImg from "../assets/images/signup.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../reducers/authSlice";
import { useSelector } from "react-redux";
import axiosNew from "../reducers/axioInstance";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    password: "",
  });
  const [step, setStep] = useState("form"); // "form" or "otp"
  const [otp, setOtp] = useState("");
  const [localError, setLocalError] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleRedirect = () => {
    dispatch({ type: "auth/clearError" });
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError("");
    dispatch({ type: "auth/clearError" });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLocalLoading(true);
    setLocalError("");
    setResendStatus("");
    dispatch({ type: "auth/clearError" });

    try {
      await axiosNew.post("/signup/send-otp", formData);
      setStep("otp");
    } catch (err) {
      console.error("Error sending OTP:", err);
      setLocalError(err.response?.data?.error || "Failed to send verification code. Please check your fields.");
    } finally {
      setLocalLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    if (!otp) {
      setLocalError("Please enter the verification code.");
      return;
    }
    setLocalError("");
    try {
      await dispatch(registerUser({ ...formData, otp })).unwrap();
      setRegistrationSuccess(true);
    } catch (err) {
      console.error("Registration error:", err);
      setRegistrationSuccess(false);
    }
  };

  const handleResendOtp = async () => {
    setLocalLoading(true);
    setLocalError("");
    setResendStatus("");
    try {
      await axiosNew.post("/signup/send-otp", formData);
      setResendStatus("Code resent successfully!");
    } catch (err) {
      console.error("Error resending OTP:", err);
      setLocalError(err.response?.data?.error || "Failed to resend verification code.");
    } finally {
      setLocalLoading(false);
    }
  };

  useEffect(() => {
    if (registrationSuccess && !error) {
      navigate("/home");
      setRegistrationSuccess(false);
    } else if (error) {
      console.error("Registration error:", error);
      setRegistrationSuccess(false);
    }
  }, [registrationSuccess, error, navigate]);
  
  return (
    <div className="h-screen flex bg-[#FAF8F5] text-[#2D2A26] font-sans overflow-hidden">
      {/* Left side — Clean, spacious signup form */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center px-8 sm:px-16 lg:px-24 py-8 overflow-y-auto">
        <div className="w-full max-w-md animate-scaleIn text-left">
          {/* Logo */}
          <Link to="/" className="inline-block mb-10">
            <span className="font-serif text-2xl font-semibold tracking-wide text-[#2D2A26]">
              Sync<span className="text-[#7E8F7A] italic font-normal">Life</span>
            </span>
          </Link>

          {/* Heading */}
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#2D2A26] tracking-tight mb-2">
            Create your space
          </h1>
          <p className="text-[#736E67] text-sm font-light mb-8">
            Start syncing your life in a cozy digital notebook.
          </p>

          {/* Form step conditional rendering */}
          {step === "form" ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              {/* 2-column Name layout */}
              <div className="grid grid-cols-1 signup:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="signup-firstName"
                    className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="signup-firstName"
                    placeholder="Helly"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-cozy"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="signup-lastName"
                    className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    id="signup-lastName"
                    type="text"
                    placeholder="Diyora"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input-cozy"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="signup-email"
                  className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="signup-email"
                  placeholder="you@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-cozy"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="signup-birthDate"
                  className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1"
                >
                  Birthdate
                </label>
                <input
                  id="signup-birthDate"
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="input-cozy text-[#736E67]"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="signup-password"
                  className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1"
                >
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  placeholder="Create a strong password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-cozy"
                />
              </div>

              {/* Error handling */}
              {localError && (
                <div className="py-3.5 px-4 bg-[#D66B6B]/10 border border-[#D66B6B]/20 rounded-lg">
                  <p className="text-[#D66B6B] text-sm font-light">{localError}</p>
                </div>
              )}

              {/* Submit pill CTA */}
              <button
                className="btn-cozy-accent w-full mt-4 py-3"
                type="submit"
                disabled={localLoading}
              >
                {localLoading ? "Sending verification code..." : "Verify Email"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyAndRegister} className="space-y-6">
              <div className="flex flex-col">
                <p className="text-[#736E67] text-sm font-light mb-4">
                  We sent a 6-digit verification code to <span className="font-semibold text-[#2D2A26]">{formData.email}</span>. Please enter it below to verify your email.
                </p>
                
                <label
                  htmlFor="signup-otp"
                  className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1"
                >
                  Verification Code
                </label>
                <input
                  type="text"
                  id="signup-otp"
                  maxLength="6"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setLocalError("");
                  }}
                  className="input-cozy text-center tracking-[0.5em] text-lg font-mono"
                />
              </div>

              {/* Error & Success handling */}
              {(error || localError) && (
                <div className="py-3.5 px-4 bg-[#D66B6B]/10 border border-[#D66B6B]/20 rounded-lg">
                  <p className="text-[#D66B6B] text-sm font-light">{error || localError}</p>
                </div>
              )}

              {resendStatus && (
                <div className="py-3.5 px-4 bg-[#7E8F7A]/10 border border-[#7E8F7A]/20 rounded-lg">
                  <p className="text-[#7E8F7A] text-sm font-light">{resendStatus}</p>
                </div>
              )}

              <button
                className="btn-cozy-accent w-full mt-4 py-3"
                type="submit"
                disabled={isLoading || localLoading}
              >
                {isLoading ? "Creating your account..." : "Verify & Create Account"}
              </button>

              <div className="flex justify-between items-center text-xs mt-4">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={localLoading}
                  className="text-[#C38A72] hover:text-[#7E8F7A] font-medium transition-colors duration-300"
                >
                  {localLoading ? "Sending..." : "Resend Code"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep("form");
                    setLocalError("");
                    setResendStatus("");
                    dispatch({ type: "auth/clearError" });
                  }}
                  className="text-[#736E67] hover:text-[#2D2A26] font-medium transition-colors duration-300"
                >
                  Edit details
                </button>
              </div>
            </form>
          )}

          {/* Login redirect */}
          <div className="mt-8 pt-6 border-t border-[#736E67]/10">
            <p className="text-[#736E67] text-sm font-light">
              Already have an account?{" "}
              <button
                type="button"
                className="font-medium text-[#C38A72] hover:text-[#7E8F7A] transition-colors duration-300 ml-1"
                onClick={handleRedirect}
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right side — Cozy physical notebook image */}
      <div className="hidden md:block md:w-1/2 relative image-light-overlay h-screen">
        <img
          src={signupImg}
          alt="Hands writing thoughts in a calm notebook journal"
          className="w-full h-full object-cover"
        />
        {/* Floating warm-colored serif quote */}
        <div className="absolute bottom-12 left-12 right-12 z-10 text-left">
          <p className="font-serif text-white text-lg md:text-xl font-light italic leading-relaxed drop-shadow-md">
            "Start where you are. Use what you have. Do what you can."
          </p>
          <p className="text-white/80 text-[10px] tracking-[0.2em] uppercase mt-3 font-semibold drop-shadow-sm">
            — Arthur Ashe
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
