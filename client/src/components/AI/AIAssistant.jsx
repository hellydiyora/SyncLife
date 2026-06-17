import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAIInsights, clearInsights } from "../../reducers/aiSlice";
import { selectUser } from "../../reducers/authSlice";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";

/* ─── Animated circular progress ring ──────────────────────────── */
const ScoreRing = ({ score, size = 140, stroke = 10 }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const timer = setTimeout(() => {
      const progress = ((100 - score) / 100) * circumference;
      setOffset(progress);
    }, 300);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  const getColor = (s) => {
    if (s >= 75) return "#7E8F7A";
    if (s >= 50) return "#C38A72";
    if (s >= 25) return "#D4A574";
    return "#D66B6B";
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(115,110,103,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(score)}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-3xl font-bold text-[#2D2A26]">{score}</span>
        <span className="text-[10px] text-[#736E67] font-medium tracking-wider uppercase">Score</span>
      </div>
    </div>
  );
};

/* ─── Shimmer loading skeleton ──────────────────────────────────── */
const ShimmerCard = () => (
  <div className="bg-white rounded-2xl border border-[#736E67]/[0.06] p-6 animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-[#736E67]/[0.08]"></div>
      <div className="h-4 w-32 rounded-full bg-[#736E67]/[0.08]"></div>
    </div>
    <div className="space-y-3">
      <div className="h-3 w-full rounded-full bg-[#736E67]/[0.06]"></div>
      <div className="h-3 w-4/5 rounded-full bg-[#736E67]/[0.06]"></div>
      <div className="h-3 w-3/5 rounded-full bg-[#736E67]/[0.06]"></div>
    </div>
  </div>
);

/* ─── Data stat mini badge ──────────────────────────────────────── */
const StatBadge = ({ label, value, icon }) => (
  <div className="flex items-center gap-2.5 bg-[#FAF8F5] rounded-xl border border-[#736E67]/[0.06] px-4 py-3">
    <span className="text-[#7E8F7A]">{icon}</span>
    <div>
      <p className="text-[#2D2A26] font-semibold text-sm">{value}</p>
      <p className="text-[#736E67] text-[10px] font-medium tracking-wider uppercase">{label}</p>
    </div>
  </div>
);

/* ─── Insight card component ────────────────────────────────────── */
const InsightCard = ({ icon, iconColor, title, points, delay = 0 }) => (
  <div
    className="bg-white rounded-2xl border border-[#736E67]/[0.08] p-6 hover:shadow-md hover:border-[#7E8F7A]/20 transition-all duration-500 group"
    style={{ animation: `fadeSlideUp 0.6s ease-out ${delay}ms both` }}
  >
    <div className="flex items-center gap-3 mb-5">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
        style={{ backgroundColor: iconColor }}
      >
        {icon}
      </div>
      <h3 className="font-serif text-base font-semibold text-[#2D2A26] tracking-wide">{title}</h3>
    </div>
    <ul className="space-y-3">
      {points.map((point, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-[#736E67] leading-relaxed font-light">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: iconColor }}></span>
          {point}
        </li>
      ))}
    </ul>
  </div>
);

/* ─── Main AI Assistant page ────────────────────────────────────── */
const AIAssistant = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { insights, loading, error } = useSelector((state) => state.ai);

  const handleGenerate = () => {
    if (user) {
      dispatch(fetchAIInsights(user.token));
    }
  };

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  /* Card config for insight sections */
  const insightCards = insights
    ? [
        {
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          ),
          iconColor: "#7E8F7A",
          title: insights.taskInsights?.title || "Task Analysis",
          points: insights.taskInsights?.points || [],
        },
        {
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          ),
          iconColor: "#C38A72",
          title: insights.habitInsights?.title || "Habit Coaching",
          points: insights.habitInsights?.points || [],
        },
        {
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          iconColor: "#8B7EC8",
          title: insights.moodInsights?.title || "Mood Patterns",
          points: insights.moodInsights?.points || [],
        },
        {
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
          iconColor: "#D4A574",
          title: insights.recommendations?.title || "Today's Action Plan",
          points: insights.recommendations?.points || [],
        },
      ]
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#2D2A26] font-sans">
      <Navbar />

      {/* ── Hero Section ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7E8F7A]/[0.06] via-[#C38A72]/[0.04] to-transparent"></div>
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-[#7E8F7A]/[0.04] blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-[#C38A72]/[0.04] blur-3xl"></div>

        <div className="relative z-10 py-16 px-6 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-warm-card/80 backdrop-blur-sm rounded-full px-4 py-1.5 border border-[#7E8F7A]/15 mb-6 shadow-sm">
            <svg className="w-3.5 h-3.5 text-[#7E8F7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
            <span className="text-xs font-semibold text-[#7E8F7A] tracking-wider uppercase">AI-Powered</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-[#2D2A26] mb-4">
            Productivity <span className="text-[#7E8F7A] italic font-normal">Insights</span>
          </h1>
          <p className="text-[#736E67] text-base md:text-lg font-light tracking-wide max-w-xl mx-auto mb-8">
            Your personal AI coach analyzes your tasks, habits, moods, and gratitude entries to deliver actionable insights tailored just for you.
          </p>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-medium text-sm tracking-wide shadow-sm transition-all duration-300 ${
              loading
                ? "bg-[#736E67]/20 text-[#736E67] cursor-not-allowed"
                : "bg-[#7E8F7A] text-white hover:bg-[#6B7D67] hover:shadow-md active:scale-[0.98]"
            }`}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing your data...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                Generate Insights
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="flex-grow px-6 md:px-12 pb-20 max-w-7xl mx-auto w-full">
        {/* Error State */}
        {error && (
          <div className="bg-[#D66B6B]/[0.06] border border-[#D66B6B]/20 rounded-2xl p-5 mb-8 flex items-start gap-3 animate-fadeIn">
            <svg className="w-5 h-5 text-[#D66B6B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-[#D66B6B]">Something went wrong</p>
              <p className="text-xs text-[#D66B6B]/70 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-6">
            {/* Shimmer score card */}
            <div className="bg-white rounded-2xl border border-[#736E67]/[0.06] p-8 animate-pulse flex flex-col items-center">
              <div className="w-36 h-36 rounded-full bg-[#736E67]/[0.06] mb-4"></div>
              <div className="h-4 w-48 rounded-full bg-[#736E67]/[0.06] mb-2"></div>
              <div className="h-3 w-64 rounded-full bg-[#736E67]/[0.05]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
            </div>
          </div>
        )}

        {/* Insights Display */}
        {!loading && insights && (
          <div className="space-y-8" style={{ animation: "fadeSlideUp 0.5s ease-out" }}>
            {/* ── Score + Summary Hero Card ───────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#736E67]/[0.08] shadow-sm p-8 sm:p-10">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Score ring */}
                <div className="flex-shrink-0">
                  <ScoreRing score={insights.productivityScore || 0} />
                </div>

                {/* Summary text */}
                <div className="flex-1 text-center lg:text-left">
                  <p className="text-[#C38A72] text-[10px] font-semibold tracking-wider uppercase mb-2">Your Productivity</p>
                  <h2 className="font-serif text-2xl font-semibold text-[#2D2A26] mb-3">
                    {insights.productivityScore >= 75
                      ? "Excellent Progress!"
                      : insights.productivityScore >= 50
                      ? "Good Momentum"
                      : insights.productivityScore >= 25
                      ? "Room to Grow"
                      : "Let's Get Started"}
                  </h2>
                  <p className="text-[#736E67] text-sm font-light leading-relaxed">{insights.summary}</p>

                  {/* Motivational quote */}
                  {insights.motivationalQuote && (
                    <div className="mt-5 flex items-start gap-2 bg-[#FAF8F5] rounded-xl p-4 border border-[#736E67]/[0.06]">
                      <svg className="w-4 h-4 text-[#C38A72] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-xs text-[#736E67] italic font-light leading-relaxed">
                        {insights.motivationalQuote}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Data summary badges */}
              {insights.dataSummary && (
                <div className="mt-8 pt-6 border-t border-[#736E67]/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <StatBadge
                    label="Tasks"
                    value={`${insights.dataSummary.completedTasks}/${insights.dataSummary.totalTasks}`}
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  />
                  <StatBadge
                    label="Habits"
                    value={insights.dataSummary.totalHabits}
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    }
                  />
                  <StatBadge
                    label="Mood Entries"
                    value={insights.dataSummary.totalMoodEntries}
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                      </svg>
                    }
                  />
                  <StatBadge
                    label="Gratitude"
                    value={insights.dataSummary.totalGratitudeEntries}
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    }
                  />
                </div>
              )}
            </div>

            {/* ── Insight Cards Grid ─────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {insightCards.map((card, index) => (
                <InsightCard
                  key={index}
                  icon={card.icon}
                  iconColor={card.iconColor}
                  title={card.title}
                  points={card.points}
                  delay={index * 100}
                />
              ))}
            </div>

            {/* ── Regenerate prompt ──────────────────────────────── */}
            <div className="text-center pt-4">
              <button
                onClick={handleGenerate}
                className="inline-flex items-center gap-2 text-sm text-[#736E67] hover:text-[#2D2A26] font-medium transition-colors duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                </svg>
                Regenerate insights
              </button>
            </div>
          </div>
        )}

        {/* Empty State (no insights yet, not loading) */}
        {!loading && !insights && !error && (
          <div className="flex flex-col items-center justify-center py-20 text-center" style={{ animation: "fadeSlideUp 0.5s ease-out" }}>
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7E8F7A]/10 to-[#C38A72]/10 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-[#7E8F7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#2D2A26] mb-2">Ready to discover your patterns?</h3>
            <p className="text-[#736E67] text-sm font-light max-w-sm leading-relaxed">
              Click <strong className="font-medium">Generate Insights</strong> above to let your AI coach analyze your tasks, habits, moods, and gratitude entries.
            </p>
          </div>
        )}
      </div>

      <Footer />

      {/* ── Inline keyframe animation ────────────────────────────── */}
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AIAssistant;
