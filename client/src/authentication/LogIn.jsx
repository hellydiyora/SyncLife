import React from "react";
import loginImg from "../assets/images/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/authSlice";

const LogIn = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { isLoading, error } = useSelector((state) => state.auth);
  const [logInSuccess, setLogInSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleRedirect = () => {
    dispatch({ type: "auth/clearError" });
    navigate("/signup");
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    dispatch({ type: "auth/clearError" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(loginData));
      setLogInSuccess(true);
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  
  const handleForgotClick = () => {
    dispatch({ type: "auth/clearError" });
  }
  
  useEffect(() => {
    if (logInSuccess && !error) {
      navigate("/home");
      setLogInSuccess(false);
    } else if (error) {
      console.error("LogIn error:", error);
      setLogInSuccess(false);
    }
  }, [logInSuccess, error, navigate]);

  return (
    <div className="h-screen flex bg-[#FAF8F5] text-[#2D2A26] font-sans overflow-hidden">
      {/* Left side — Cozy physical notebook image */}
      <div className="hidden md:block md:w-1/2 relative image-light-overlay h-screen">
        <img
          src={loginImg}
          alt="Clean open journal notebook layout"
          className="w-full h-full object-cover"
        />
        {/* Floating warm-colored serif quote */}
        <div className="absolute bottom-12 left-12 right-12 z-10 text-left">
          <p className="font-serif text-white text-lg md:text-xl font-light italic leading-relaxed drop-shadow-md">
            "The life of every man is a diary in which he means to write one story, and writes another."
          </p>
          <p className="text-white/80 text-[10px] tracking-[0.2em] uppercase mt-3 font-semibold drop-shadow-sm">
            — J.M. Barrie
          </p>
        </div>
      </div>

      {/* Right side — Clean, spacious login form */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center px-8 sm:px-16 lg:px-24 overflow-y-auto">
        <div className="w-full max-w-md animate-scaleIn text-left">
          {/* Elegant Serif Branding */}
          <Link to="/" className="inline-block mb-10">
            <span className="font-serif text-2xl font-semibold tracking-wide text-[#2D2A26]">
              Sync<span className="text-[#7E8F7A] italic font-normal">Life</span>
            </span>
          </Link>

          {/* Heading block */}
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#2D2A26] tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-[#736E67] text-sm font-light mb-10">
            Take a breath, center yourself, and pick up where you left off.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col">
              <label
                htmlFor="login-email"
                className="text-[#736E67] text-xs font-semibold tracking-wider uppercase mb-1"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="input-cozy"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="login-password"
                  className="text-[#736E67] text-xs font-semibold tracking-wider uppercase"
                >
                  Password
                </label>
                <Link
                  to="/forgotPassword"
                  className="text-xs font-medium text-[#C38A72] hover:text-[#7E8F7A] transition-colors duration-300"
                  onClick={handleForgotClick}
                >
                  Forgot?
                </Link>
              </div>
              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="input-cozy"
              />
            </div>

            {/* Error notifications */}
            {error && (
              <div className="py-3.5 px-4 bg-[#D66B6B]/10 border border-[#D66B6B]/20 rounded-lg">
                <p className="text-[#D66B6B] text-sm font-light">{error}</p>
              </div>
            )}

            {/* Solid warm Sage pill CTA */}
            <button
              className="btn-cozy-primary w-full mt-4 py-3"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging you in..." : "Log In"}
            </button>
          </form>

          {/* Signup redirect */}
          <div className="mt-10 pt-8 border-t border-[#736E67]/10">
            <p className="text-[#736E67] text-sm font-light">
              Don't have an account yet?{" "}
              <button
                type="button"
                className="font-medium text-[#C38A72] hover:text-[#7E8F7A] transition-colors duration-300 ml-1"
                onClick={handleRedirect}
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
