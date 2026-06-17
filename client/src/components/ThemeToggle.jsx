import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className="p-2 rounded-full text-[#736E67] hover:text-[#2D2A26] dark:text-[#9E988E] dark:hover:text-[#FAF8F5] hover:bg-[#736E67]/[0.05] dark:hover:bg-[#FAF8F5]/[0.05] transition-all duration-300 focus:outline-none flex items-center justify-center"
      title={isDark ? "Activate Light Mode" : "Activate Dark Mode"}
    >
      {isDark ? (
        // Sun icon
        <svg
          className="w-[18px] h-[18px] transform hover:rotate-45 transition-transform duration-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m0 13.5V21M4.22 4.22l1.59 1.59m12.38 12.38l1.59 1.59M21 12h-2.25M5.25 12H3m14.78-7.78l-1.59 1.59M6.03 17.97l-1.59 1.59M12 18.75a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5z"
          />
        </svg>
      ) : (
        // Moon icon
        <svg
          className="w-[18px] h-[18px] transform hover:-rotate-12 transition-transform duration-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
