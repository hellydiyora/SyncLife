import React from 'react';
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Hero from "./components/Hero";
import Home from "./components/Home/Home";
import Journal from "./components/Journal/Journal";
import Habit from "./components/Habit/Habit";
import Gratitude from "./components/Gratitude/Gratitude";
import Mood from "./components/Mood/Mood";
import UserProfile from "./components/UserProfile/UserProfile";
import SignUp from "./authentication/SignUp";
import LogIn from "./authentication/LogIn";

import { useSelector } from "react-redux";
import { selectUser } from "./reducers/authSlice";


function App() {
  const user = useSelector(selectUser);
  const checkUser = user ? user.firstName : null;

  return (
    <div className="App font-allTag">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={!checkUser ? <Hero /> : <Navigate to="/home" />}
          />
          <Route
            path="/home"
            element={checkUser ? <Home /> : <Navigate to="/" />}
          />
          <Route path="/journal" element={<Journal />} />
          <Route
            path="/habits"
            element={checkUser ? <Habit /> : <Navigate to="/" />}
          />
          <Route
            path="/gratitude"
            element={checkUser ? <Gratitude /> : <Navigate to="/" />}
          />
          <Route
            path="/mood"
            element={checkUser ? <Mood /> : <Navigate to="/" />}
          />
          <Route
            path="/user"
            element={checkUser ? <UserProfile /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!checkUser ? <SignUp /> : <Navigate to="/home" />}
          />
          <Route
            path="/login"
            element={!checkUser ? <LogIn /> : <Navigate to="/home" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
