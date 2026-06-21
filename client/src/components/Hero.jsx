import React from 'react';
import heroLight from "../assets/images/hero_light.png";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Hero = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#151311] text-[#2D2A26] dark:text-[#FAF8F5] font-sans overflow-hidden transition-colors duration-300">
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
          <p className="text-[#C38A72] dark:text-[#DCA086] text-xs font-semibold tracking-[0.2em] uppercase mb-4 opacity-0 animate-fadeIn">
            A Clean Workspace for Your Mind
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] mb-6 opacity-0 animate-slideUp delay-100">
            Sync your life <br />
            <span className="text-[#7E8F7A] dark:text-[#93A68F] italic font-normal">back to place.</span>
          </h1>

          <p className="text-[#736E67] dark:text-[#9E988E] text-lg font-light leading-relaxed max-w-xl mb-4 opacity-0 animate-slideUp delay-200">
            A beautiful, clutter-free digital diary designed to help you cultivate mindfulness, build consistent habits, and track your daily reflections.
          </p>

          <p className="text-[#736E67]/75 dark:text-[#9E988E]/60 text-sm font-light leading-relaxed max-w-lg mb-10 opacity-0 animate-slideUp delay-300">
            Organize tasks, practice daily gratitude, log emotional check-ins, and build sustainable routines in a calm, intentional, and aesthetic journal.
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
          <div className="relative p-2 bg-white dark:bg-[#1E1C19] rounded-2xl shadow-xl shadow-[#2d2a26]/[0.02] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-[#736e67]/[0.05] dark:border-[#FAF8F5]/[0.08]">
            <img
              src={heroLight}
              alt="Cozy workspace layout with notebook and coffee"
              className="w-full h-auto object-cover rounded-xl"
            />
            <div className="absolute inset-0 rounded-xl border border-white/20 dark:border-white/5 pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Elegant Dividers */}
      <div className="max-w-6xl mx-auto px-8 my-8">
        <hr className="border-[#736E67]/10 dark:border-[#FAF8F5]/[0.06]" />
      </div>

      {/* Feature block — 5 distinct modules */}
      <section className="px-8 md:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#7E8F7A] dark:text-[#93A68F] text-xs font-semibold tracking-[0.3em] uppercase text-center mb-3">
            Mindful Modules
          </p>
          <h2 className="font-serif text-3xl font-medium text-center mb-16">
            Cultivate your best self <span className="italic font-normal text-[#736E67] dark:text-[#9E988E]">every single day</span>
          </h2>

          {/* Top row — 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* TaskMate — Daily Planner */}
            <div className="bg-white dark:bg-[#1E1C19] p-8 rounded-xl border border-[#736e67]/[0.06] dark:border-[#FAF8F5]/[0.08] shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-md dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col items-start text-left group">
              <div className="w-12 h-12 bg-[#FAF8F5] dark:bg-[#282522] rounded-full flex items-center justify-center mb-6 text-[#7E8F7A] dark:text-[#93A68F] group-hover:bg-[#7E8F7A] group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold mb-3">TaskMate</h3>
              <p className="text-[#736E67] dark:text-[#9E988E] text-sm leading-relaxed font-light">
                Organize your day with a clean to-do list. Add tasks, set priorities, and check them off as you go — no clutter, just clarity.
              </p>
            </div>

            {/* GoalMinder — Habit Tracker */}
            <div className="bg-white dark:bg-[#1E1C19] p-8 rounded-xl border border-[#736e67]/[0.06] dark:border-[#FAF8F5]/[0.08] shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-md dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col items-start text-left group">
              <div className="w-12 h-12 bg-[#FAF8F5] dark:bg-[#282522] rounded-full flex items-center justify-center mb-6 text-[#C38A72] dark:text-[#DCA086] group-hover:bg-[#C38A72] group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold mb-3">GoalMinder</h3>
              <p className="text-[#736E67] dark:text-[#9E988E] text-sm leading-relaxed font-light">
                Build gentle, sustainable routines. Set date-ranged habits, track daily completions, and watch your consistency grow over time.
              </p>
            </div>

            {/* GratiMemo — Gratitude Journal */}
            <div className="bg-white dark:bg-[#1E1C19] p-8 rounded-xl border border-[#736e67]/[0.06] dark:border-[#FAF8F5]/[0.08] shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-md dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col items-start text-left group">
              <div className="w-12 h-12 bg-[#FAF8F5] dark:bg-[#282522] rounded-full flex items-center justify-center mb-6 text-[#D4A574] dark:text-[#E8C4A0] group-hover:bg-[#D4A574] group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold mb-3">GratiMemo</h3>
              <p className="text-[#736E67] dark:text-[#9E988E] text-sm leading-relaxed font-light">
                Capture what you're thankful for each day. Attach photos, upload memories, and revisit your highlights on a beautiful calendar.
              </p>
            </div>
          </div>

          {/* Bottom row — 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* EmoSense — Mood Tracker */}
            <div className="bg-white dark:bg-[#1E1C19] p-8 rounded-xl border border-[#736e67]/[0.06] dark:border-[#FAF8F5]/[0.08] shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-md dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col items-start text-left group">
              <div className="w-12 h-12 bg-[#FAF8F5] dark:bg-[#282522] rounded-full flex items-center justify-center mb-6 text-[#8B7EC8] dark:text-[#A99BDE] group-hover:bg-[#8B7EC8] group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold mb-3">EmoSense</h3>
              <p className="text-[#736E67] dark:text-[#9E988E] text-sm leading-relaxed font-light">
                Log your daily emotional check-ins. Tag what influenced your mood — weather, social circles, food, health — and spot patterns over time.
              </p>
            </div>

            {/* AI Insights */}
            <div className="bg-white dark:bg-[#1E1C19] p-8 rounded-xl border border-[#736e67]/[0.06] dark:border-[#FAF8F5]/[0.08] shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-md dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col items-start text-left group">
              <div className="w-12 h-12 bg-[#FAF8F5] dark:bg-[#282522] rounded-full flex items-center justify-center mb-6 text-[#7E8F7A] dark:text-[#93A68F] group-hover:bg-[#7E8F7A] group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold mb-3">AI Insights</h3>
              <p className="text-[#736E67] dark:text-[#9E988E] text-sm leading-relaxed font-light">
                Your personal AI coach analyzes tasks, habits, and moods to generate a weekly productivity score with actionable recommendations.
              </p>
            </div>

            {/* Dashboard */}
            <div className="bg-white dark:bg-[#1E1C19] p-8 rounded-xl border border-[#736e67]/[0.06] dark:border-[#FAF8F5]/[0.08] shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-md dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col items-start text-left group">
              <div className="w-12 h-12 bg-[#FAF8F5] dark:bg-[#282522] rounded-full flex items-center justify-center mb-6 text-[#6B8A9E] dark:text-[#8BB0C8] group-hover:bg-[#6B8A9E] group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold mb-3">Dashboard</h3>
              <p className="text-[#736E67] dark:text-[#9E988E] text-sm leading-relaxed font-light">
                See your progress across all modules at a glance. Track streaks, completion rates, and visualize your growth over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="px-8 md:px-16 py-10 border-t border-[#736E67]/10 dark:border-[#FAF8F5]/[0.06] bg-white dark:bg-[#1E1C19] transition-colors duration-300">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-serif text-sm font-semibold tracking-wider text-[#736E67] dark:text-[#A6A097]">
            Sync<span className="text-[#7E8F7A] dark:text-[#9EC49A] italic">Life</span>
          </span>
          <p className="text-xs text-[#736E67]/60 dark:text-[#9E988E]/50">
            &copy; {new Date().getFullYear()} SyncLife. Mindfully crafted.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Hero;
