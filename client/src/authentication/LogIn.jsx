import React from 'react';
import mainP from "../assets/images/signup3.jpg";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
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
    dispatch({type: "auth/clearError"});
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
  useEffect(() => {
    if (logInSuccess && !error) {
      navigate("/home");
      setLogInSuccess(false); 
    }else if (error) {
      console.error("LogIn error:", error);
      setLogInSuccess(false);
    }
  }, [logInSuccess, error, navigate]);

  return (
    <div className="flex">
      <div className="h-screen w-6/12 bg-white p-6 flex items-center justify-center">
        <form
          className="gap-6 mt-8 bg-zinc-400 p-10 rounded-md shadow-xl"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-xl text-black text-left"
            >
              Email address:
            </label>
            <input
              id="email"
              type="email"
              placeholder="hellyD@example.com"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg mb-2"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-xl text-black text-left"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg mb-2"
            />
          </div>

          <div className="col-span-2">
            <p
              className="text-sm text-black dark:text-gray-200 mb-2"
              onClick={handleRedirect}
            >
              Don't Have an Account ?{" "}
              <a href="#" className="text-blue-950 underline decoration-solid">
                Sign in here
              </a>
            </p>
          </div>

          <div className="flex justify-center col-span-2">
            <button
              className="flex justify-center w-60 px-6 py-3 text-sm text-white capitalize transition-colors duration-300 transform bg-zinc-800 rounded-2xl hover:bg-zinc-700 "
              type="submit"
              disabled={isLoading}
            >
              Login
            </button>
          </div>
          {error && (
            <div className="flex justify-center col-span-2">
              <p className="text-red-500">{error}</p>
            </div>
          )}
        </form>
      </div>
      <div className="h-screen w-6/12 bg-zinc-100">
        <img
          src={mainP}
          alt="main image"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default LogIn;
