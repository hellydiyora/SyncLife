import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import data from "../../assets/data/homeData";
import { useNavigate } from "react-router-dom";

import homeImg from "../../assets/images/home1.png";
import homeImg3 from "../../assets/images/home3.jpg";

const Home = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (index, link) => {
    setSelectedCard(index);
    navigate(link);
  };

  return (
    <div>
      <Navbar />
      <div className="relative h-screen">
        <div
          className="absolute inset-0 "
          style={{
            backgroundImage: `url(${homeImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-7xl font-danceTag text-slate-900 bg-orange-50 px-1">
            Welcome to SyncLife
          </h1>
          <p className="text-md font-mainTag mt-3 px-2 bg-slate-900 text-orange-200 inline-block">
            Navigating TODAY, designing TOMORROW
          </p>
        
        </div>
      </div>
      <div className="relative h-screen">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${homeImg3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        ></div>
        <div className="w-full absolute mt-60 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-center text-white">
          <h1 className="px-3 mb-16 inline-block text-6xl font-danceTag bg-slate-900 text-orange-200  font-thin">
            What we provide
          </h1>
          <div className="grid grid-cols-4 gap-5 mx-10">
            {data.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col cardBg rounded-xl p-4 max-w-xs mx-auto h-full ${
                  selectedCard === index ? "selected" : ""
                }`}
                onClick={() => handleCardClick(index, item.link)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover h-64 mb-4 rounded-md"
                />
                <h1 className="font-subTag font-bold text-2xl text-white mb-2">
                  {item.title}
                </h1>
                <p className="text-white font-mainTag">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative h-screen">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${homeImg3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        ></div>
        <div className="w-full absolute mt-60 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-center text-white flex flex-col items-center">
          <h1 className="  px-2  inline-block text-6xl font-danceTag bg-slate-900 text-orange-200 font-thin">
            Our Vision
          </h1>
         
          <p className="m-20 p-10 w-4/6 bg-white text-black font-mono">
              <span>  At SyncLife, our vision revolves around empowering individuals on their journey towards holistic well-being. We provide a seamless and intuitive platform featuring three essential modules. The Planner module is designed to help users effortlessly manage their daily tasks, fostering a balanced and organized lifestyle. Through the Habit Tracker module, users can cultivate positive habits with ease, receiving insights and progress tracking to support their journey of continuous improvement. Lastly, our Gratitude module inspires mindfulness and appreciation, encouraging users to reflect on the positive aspects of their lives.</span>
              <span>
              Incorporating these modules into the SyncLife platform allows individuals to harmonize their daily routines, cultivate positive habits, and deepen their sense of gratitude. We believe that this integrated approach leads to a more fulfilling and synchronized life, enabling users to navigate their personal growth and organizational needs with confidence and purpose.
              </span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
