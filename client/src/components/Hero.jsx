import React from 'react';
import heroLight from "../assets/images/hero_light.png";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Hero = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2A26] font-sans overflow-hidden">
      {/* Elegant Header */}
      <nav className="flex items-center justify-between px-4 sm:px-8 md:px-16 py-5 animate-slideDown">
        <div className="flex items-center">
          <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-[#2D2A26] dark:text-[#FAF8F5]">
            Sync<span className="text-[#7E8F7A] dark:text-[#9EC49A] italic font-normal">Life</span>
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-6 md:gap-8">
          <ThemeToggle />
          <Link
            to="/login"
            className="text-xs sm:text-sm font-medium tracking-wide text-[#736E67] dark:text-[#9E988E] hover:text-[#2D2A26] dark:hover:text-[#FAF8F5] transition-colors duration-300 whitespace-nowrap"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="btn-cozy-primary text-[10px] sm:text-xs tracking-wider uppercase py-1.5 px-3 sm:py-2.5 sm:px-6 whitespace-nowrap"
          >
            Sign up
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 md:px-16 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Editorial Typography */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <p className="text-[#C38A72] text-xs font-semibold tracking-[0.2em] uppercase mb-4 opacity-0 animate-fadeIn">
            A Clean Workspace for Your Mind
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] text-[#2D2A26] mb-6 opacity-0 animate-slideUp delay-100">
            Sync your life <br />
            <span className="text-[#7E8F7A] italic font-normal">back to place.</span>
          </h1>

          <p className="text-[#736E67] text-lg font-light leading-relaxed max-w-xl mb-4 opacity-0 animate-slideUp delay-200">
            A beautiful, clutter-free digital diary designed to help you cultivate mindfulness, build consistent habits, and track your daily reflections.
          </p>

          <p className="text-[#736E67]/75 text-sm font-light leading-relaxed max-w-lg mb-10 opacity-0 animate-slideUp delay-300">
            Write down thoughts, practice daily gratitude, log emotional check-ins, and build sustainable routines in a calm, intentional, and aesthetic journal.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-4 opacity-0 animate-slideUp delay-400">
            <Link to="/signup" className="btn-cozy-primary px-6 sm:px-9 py-2.5 sm:py-3">
              Get Started
            </Link>
            <Link to="/login" className="btn-cozy-outline px-6 sm:px-9 py-2.5 sm:py-3">
              Log In
            </Link>
          </div>
        </div>

        {/* Right Side: Cozy Flatlay Showcase */}
        <div className="lg:col-span-6 opacity-0 animate-scaleIn delay-200">
          <div className="relative p-2 bg-white rounded-2xl shadow-xl shadow-[#2d2a26]/[0.02] border border-[#736e67]/[0.05]">
            <img
              src={heroLight}
              alt="Cozy workspace layout with notebook and coffee"
              className="w-full h-auto object-cover rounded-xl"
            />
            {/* Subtle soft gradient border */}
            <div className="absolute inset-0 rounded-xl border border-white/20 pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Elegant Dividers */}
      <div className="max-w-6xl mx-auto px-8 my-8">
        <hr className="border-[#736E67]/10" />
      </div>

      {/* Feature block */}
      <section className="px-8 md:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#7E8F7A] text-xs font-semibold tracking-[0.3em] uppercase text-center mb-3">
            Mindful Modules
          </p>
          <h2 className="font-serif text-[#2D2A26] text-3xl font-medium text-center mb-16">
            Cultivate your best self <span className="italic font-normal text-[#736E67]">every single day</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-xl border border-[#736e67]/[0.06] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start text-left group">
              <div className="w-12 h-12 bg-[#FAF8F5] rounded-full flex items-center justify-center mb-6 text-[#7E8F7A] group-hover:bg-[#7E8F7A] group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#2D2A26] mb-3">Personal Journal</h3>
              <p className="text-[#736E67] text-sm leading-relaxed font-light">
                Capture the day's special moments, thoughts, and lessons. Write down ideas freely in a quiet, organic workspace.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-xl border border-[#736e67]/[0.06] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start text-left group">
              <div className="w-12 h-12 bg-[#FAF8F5] rounded-full flex items-center justify-center mb-6 text-[#7E8F7A] group-hover:bg-[#7E8F7A] group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#2D2A26] mb-3">Habit Tracker</h3>
              <p className="text-[#736E67] text-sm leading-relaxed font-light">
                Build gentle, sustainable routines. Track your consistent progress daily without pressure or stress.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-xl border border-[#736e67]/[0.06] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start text-left group">
              <div className="w-12 h-12 bg-[#FAF8F5] rounded-full flex items-center justify-center mb-6 text-[#7E8F7A] group-hover:bg-[#7E8F7A] group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#2D2A26] mb-3">Daily Gratitude</h3>
              <p className="text-[#736E67] text-sm leading-relaxed font-light">
                Log the small things that bring you happiness. Practice regular gratitude to invite more peace and joy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="px-8 md:px-16 py-10 border-t border-[#736E67]/10 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-serif text-sm font-semibold tracking-wider text-[#736E67] dark:text-[#A6A097]">
            Sync<span className="text-[#7E8F7A] dark:text-[#9EC49A] italic">Life</span>
          </span>
          <p className="text-xs text-[#736E67]/60">
            &copy; {new Date().getFullYear()} SyncLife. Mindfully crafted.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Hero;
