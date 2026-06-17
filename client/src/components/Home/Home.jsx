import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import data from "../../assets/data/homeData";
import { useNavigate } from "react-router-dom";

import homeImg from "../../assets/images/home1.png";

const Home = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (index, link) => {
    setSelectedCard(index);
    navigate(link);
  };

  // Clean, high-end vector icons for the cards
  const featureIcons = [
    // TaskMate — journal/note icon
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>,
    // GoalMinder — daily habits check
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    // GratiMemo — heart/gratitude
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>,
    // EmoSense — face mood tracker
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
    </svg>,
    // AI Insights — sparkles icon
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2A26] flex flex-col font-sans">
      <Navbar />

      {/* Spacious Ivory Banner */}
      <div className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        {/* Soft background parallax overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${homeImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        ></div>
        {/* Bright/warm paper vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/40 via-[#FAF8F5]/75 to-[#FAF8F5]"></div>

        {/* Content banner */}
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <p className="text-[#C38A72] text-xs font-semibold tracking-[0.3em] uppercase mb-4 animate-fadeIn">
            Welcome to SyncLife
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight text-[#2D2A26] mb-4 animate-slideUp">
            Your mindful <span className="text-[#7E8F7A] italic font-normal">workspace</span>
          </h1>
          <p className="text-[#736E67] text-base md:text-lg font-light tracking-wide animate-slideUp delay-200">
            Navigating today, designing tomorrow. Take a breath and capture the moment.
          </p>
        </div>
      </div>

      {/* What We Provide Card Grid */}
      <section className="px-6 md:px-12 py-16 flex-grow">
        <div className="max-w-6xl mx-auto">
          {/* Section title */}
          <div className="text-center mb-12">
            <p className="text-[#7E8F7A] text-xs font-semibold tracking-[0.3em] uppercase mb-2">Modules</p>
            <h2 className="font-serif text-[#2D2A26] text-3xl font-medium">
              A peaceful place to <span className="italic font-normal text-[#736E67]">reflect & grow</span>
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {data.map((item, index) => (
              <div
                key={index}
                className={`cozy-card rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full ${
                  selectedCard === index ? "ring-2 ring-[#7E8F7A]" : ""
                }`}
                onClick={() => handleCardClick(index, item.link)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image preview with soft warming filter */}
                <div className="relative h-48 overflow-hidden bg-[#F4F1EC]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle paper aesthetic layer */}
                  <div className="absolute inset-0 bg-[#C38A72]/5 mix-blend-multiply"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-60"></div>
                </div>

                {/* Details layout */}
                <div className="p-6 flex flex-col flex-grow items-start text-left bg-white">
                  <div className="flex items-center gap-2.5 mb-3 text-[#7E8F7A]">
                    {featureIcons[index]}
                    <h3 className="font-serif text-lg font-semibold text-[#2D2A26] tracking-wide">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-[#736E67] text-sm font-light leading-relaxed flex-grow">
                    {item.description}
                  </p>

                  {/* Gentle hover interaction pointer */}
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#C38A72] transition-colors duration-200">
                    <span>Open Workspace</span>
                    <svg className="w-3.5 h-3.5 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
