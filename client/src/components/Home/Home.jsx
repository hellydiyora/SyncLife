import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import data from "../../assets/data/homeData";
import { useNavigate } from "react-router-dom";

import homeImg from "../../assets/images/home1.png";

const featureDetails = [
  {
    tagline: "Daily Planner",
    color: "#7E8F7A",
    darkColor: "#93A68F",
    highlights: [
      "Add tasks with priority levels",
      "Check off completed items",
      "Auto-sorted by active vs. done",
    ],
  },
  {
    tagline: "Habit Builder",
    color: "#C38A72",
    darkColor: "#DCA086",
    highlights: [
      "Set date-ranged habits",
      "Toggle daily completions",
      "Live consistency tracking",
    ],
  },
  {
    tagline: "Gratitude Journal",
    color: "#D4A574",
    darkColor: "#E8C4A0",
    highlights: [
      "Log daily gratitude entries",
      "Attach photos & PDFs",
      "Calendar with visual highlights",
    ],
  },
  {
    tagline: "Mood Tracker",
    color: "#8B7EC8",
    darkColor: "#A99BDE",
    highlights: [
      "Log feelings from Excellent to Terrible",
      "Tag weather, social, food & more",
      "Review emotional patterns over time",
    ],
  },
  {
    tagline: "AI Coach",
    color: "#7E8F7A",
    darkColor: "#93A68F",
    highlights: [
      "Generate weekly productivity scores",
      "Get personalized action plans",
      "Insights from your real data",
    ],
  },
  {
    tagline: "Progress Overview",
    color: "#6B8A9E",
    darkColor: "#8BB0C8",
    highlights: [
      "View stats across all modules",
      "Track streaks & completion rates",
      "Visualize your growth over time",
    ],
  },
];

const featureIcons = [
  // TaskMate
  <svg key="taskmate" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>,
  // GoalMinder
  <svg key="goalminder" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // GratiMemo
  <svg key="gratimemo" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>,
  // EmoSense
  <svg key="emosense" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
  </svg>,
  // AI Insights
  <svg key="ai" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
  </svg>,
  // Dashboard
  <svg key="dashboard" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>,
];

const Home = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleNavigate = (e, link) => {
    e.stopPropagation();
    navigate(link);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#151311] text-[#2D2A26] dark:text-[#FAF8F5] flex flex-col font-sans transition-colors duration-300">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${homeImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        ></div>
        {/* Gradient overlay — light */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/40 via-[#FAF8F5]/75 to-[#FAF8F5] dark:from-[#151311]/50 dark:via-[#151311]/80 dark:to-[#151311]"></div>

        <div className="relative z-10 text-center px-6 max-w-2xl">
          <p className="text-[#C38A72] dark:text-[#DCA086] text-xs font-semibold tracking-[0.3em] uppercase mb-4 animate-fadeIn">
            Welcome to SyncLife
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight mb-4 animate-slideUp">
            Your mindful <span className="text-[#7E8F7A] dark:text-[#93A68F] italic font-normal">workspace</span>
          </h1>
          <p className="text-[#736E67] dark:text-[#9E988E] text-base md:text-lg font-light tracking-wide animate-slideUp delay-200">
            Navigating today, designing tomorrow. Take a breath and capture the moment.
          </p>
        </div>
      </div>

      {/* Feature Cards Section */}
      <section className="px-6 md:px-12 py-16 flex-grow">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-[#7E8F7A] dark:text-[#93A68F] text-xs font-semibold tracking-[0.3em] uppercase mb-2">
              Your Modules
            </p>
            <h2 className="font-serif text-3xl font-medium">
              A peaceful place to{" "}
              <span className="italic font-normal text-[#736E67] dark:text-[#9E988E]">
                reflect & grow
              </span>
            </h2>
          </div>

          {/* Interactive Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => {
              const details = featureDetails[index];
              const isExpanded = expandedCard === index;

              return (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`group rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border ${
                    isExpanded
                      ? "bg-white dark:bg-[#1E1C19] border-[#7E8F7A]/30 dark:border-[#93A68F]/30 shadow-lg dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] ring-1 ring-[#7E8F7A]/10 dark:ring-[#93A68F]/10"
                      : "bg-white dark:bg-[#1E1C19] border-[#736E67]/[0.08] dark:border-[#FAF8F5]/[0.08] shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-md dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:-translate-y-1"
                  }`}
                >
                  {/* Image section */}
                  <div className="relative h-44 overflow-hidden bg-[#F4F1EC] dark:bg-[#282522]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                        isExpanded ? "scale-105" : "group-hover:scale-105"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/70 dark:from-[#1E1C19]/70 to-transparent"></div>

                    {/* Floating tagline pill */}
                    <div
                      className="absolute bottom-3 left-4 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-white"
                      style={{ backgroundColor: details?.color || "#7E8F7A" }}
                    >
                      {details?.tagline}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <span style={{ color: details?.color || "#7E8F7A" }}>
                          {featureIcons[index]}
                        </span>
                        <h3 className="font-serif text-lg font-semibold tracking-wide">
                          {item.title}
                        </h3>
                      </div>

                      {/* Expand chevron */}
                      <svg
                        className={`w-4 h-4 text-[#736E67] dark:text-[#9E988E] transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>

                    <p className="text-[#736E67] dark:text-[#9E988E] text-sm font-light leading-relaxed">
                      {item.description}
                    </p>

                    {/* Expandable details */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        isExpanded ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
                      }`}
                    >
                      <div className="border-t border-[#736E67]/[0.08] dark:border-[#FAF8F5]/[0.08] pt-4 space-y-2">
                        {details?.highlights.map((point, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 animate-fadeIn"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          >
                            <svg
                              className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                              style={{ color: details?.color || "#7E8F7A" }}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs text-[#736E67] dark:text-[#9E988E] font-light leading-relaxed">
                              {point}
                            </span>
                          </div>
                        ))}

                        {/* Open workspace button */}
                        <button
                          onClick={(e) => handleNavigate(e, item.link)}
                          className="mt-3 w-full py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                          style={{ backgroundColor: details?.color || "#7E8F7A" }}
                        >
                          Open {item.title}
                        </button>
                      </div>
                    </div>

                    {/* Collapsed CTA hint */}
                    {!isExpanded && (
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#C38A72] dark:text-[#DCA086] transition-colors duration-200">
                        <span>Tap for details</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Minimal motivation strip before footer */}
      <section className="px-6 md:px-12 py-14 bg-white dark:bg-[#1E1C19] border-t border-[#736E67]/[0.08] dark:border-[#FAF8F5]/[0.08]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#7E8F7A] dark:text-[#93A68F] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Philosophy
          </p>
          <blockquote className="font-serif text-xl sm:text-2xl italic font-normal text-[#736E67] dark:text-[#9E988E] leading-relaxed">
            "Small daily improvements are the key to staggering long-term results."
          </blockquote>
          <p className="mt-3 text-[#C38A72] dark:text-[#DCA086] text-xs font-medium tracking-wide">
            — Your SyncLife Journey
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
