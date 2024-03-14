import React from 'react';
import mainImg from "../assets/images/login.jpg";
import mainImg2 from "../assets/images/mainP3.png";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="flex">
      <div className="h-screen w-6/12 bg-slate-100 flex-col">
        <div
          className="absolute inset-0 w-6/12 bg-cover h-6/12"
          style={{
            backgroundImage: `url(${mainImg2})`,
          }}
        ></div>
        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
          <h1 className="text-9xl m-5 font-mainTag text-red-900">
            <span className="text-red-950">S</span>ync
            <span className="text-red-950">L</span>ife
          </h1>
          <p className="p-4 text-4xl font-subTag tracking-tighter text-amber-950">
            Want to sync your life?
          </p>
          <p className="mb-10 pl-10 pr-10 text-lg text-lime-950">
            <span>Efficiently organize your daily tasks and </span><br />
            <span>workflow in a modern manner, enhancing</span><br />
            <span>your productivity effortlessly.</span>
          </p>
          <div >
          <button className="bg-gradient-to-r from-green-800 to-orange-800 text-white font-mono text-xl font-semibold py-2 px-4 rounded ">
            <Link to="/signup">Join Now</Link>
          </button>
          </div>
        </div>
      </div>

      <div className="h-screen w-6/12 bg-zinc-300">
        <img
          src={mainImg}
          alt="main image"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default Hero;
