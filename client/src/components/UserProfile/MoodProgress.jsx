import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoodData, setMoodData } from "../../reducers/moodSlice";
import { selectUser } from "../../reducers/authSlice";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MoodProgress = () => {
  const moods = useSelector((state) => state.mood.moodData);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [view, setView] = useState("week");

  const fetchAndSetMoods = async () => {
    try {
      if (user) {
        const response = await dispatch(fetchMoodData(user.token));
        dispatch(setMoodData(response.payload));
      } else {
        console.log("No user from mood");
      }
    } catch (error) {
      console.log("error in fetching mood:", error);
    }
  };

  useEffect(() => {
    fetchAndSetMoods();
  }, [dispatch]);

  const feelingColors = {
    Excellent: "rgba(126,143,122,0.6)",
    Happy: "rgba(126,143,122,0.35)",
    Average: "rgba(195,138,114,0.4)",
    Sad: "rgba(115,110,103,0.35)",
    Terrible: "rgba(214,107,107,0.4)",
  };

  const borderColors = {
    Excellent: "#7E8F7A",
    Happy: "#7E8F7A",
    Average: "#C38A72",
    Sad: "#736E67",
    Terrible: "#D66B6B",
  };

  const calculateFeelingCounts = (moods, startDate, endDate) => {
    const feelingCounts = {
      Excellent: 0,
      Happy: 0,
      Average: 0,
      Sad: 0,
      Terrible: 0,
    };

    moods.forEach((mood) => {
      const moodDate = moment(new Date(mood.date)).format("YYYY-MM-DD");
      if (
        moodDate >= startDate &&
        moodDate <= endDate &&
        feelingCounts.hasOwnProperty(mood.feeling.value)
      ) {
        feelingCounts[mood.feeling.value]++;
      }
    });
    return feelingCounts;
  };

  const updateData = (feelingCounts) => {
    const labels = Object.keys(feelingCounts);
    const totalCount = Object.values(feelingCounts).reduce(
      (acc, cv) => acc + cv
    );

    const datasets = [
      {
        label: "Entries",
        data: labels.map((label) => feelingCounts[label]),
        backgroundColor: labels.map((label) => feelingColors[label]),
        borderColor: labels.map((label) => borderColors[label]),
        borderWidth: 2,
        borderRadius: 8,
        barThickness: 32,
        minBarLength: 3,
      },
    ];
    const data = { labels, datasets };

    return { totalCount, data };
  };

  const today = moment().format("YYYY-MM-DD");
  const startOfMonth = moment(today).startOf("month").format("YYYY-MM-DD");
  const lastWeek = moment(today).subtract(7, "days").format("YYYY-MM-DD");

  const yearlyFeelingCounts = calculateFeelingCounts(moods, "0000-01-01", today);
  const monthlyFeelingCounts = calculateFeelingCounts(moods, startOfMonth, today);
  const weeklyFeelingCounts = calculateFeelingCounts(moods, lastWeek, today);

  const yearlyData = updateData(yearlyFeelingCounts);
  const monthlyData = updateData(monthlyFeelingCounts);
  const weeklyData = updateData(weeklyFeelingCounts);

  const makeOptions = (title) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        position: "bottom",
        text: title,
        font: { family: "'Inter', sans-serif", size: 12, weight: "500" },
        color: "#736E67",
        padding: { top: 16 },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: "'Inter', sans-serif", size: 11 }, color: "#736E67" },
      },
      y: {
        grid: { color: "rgba(115,110,103,0.06)" },
        ticks: { font: { family: "'Inter', sans-serif", size: 11 }, color: "#736E67", stepSize: 1 },
      },
    },
  });

  const viewButtons = [
    { key: "week", label: "Weekly" },
    { key: "month", label: "Monthly" },
    { key: "year", label: "All Time" },
  ];

  const getCurrentView = () => {
    switch (view) {
      case "week":
        return { ...weeklyData, title: "Weekly Mood Distribution" };
      case "month":
        return { ...monthlyData, title: "Monthly Mood Distribution" };
      case "year":
        return { ...yearlyData, title: "All Time Mood Distribution" };
      default:
        return { ...weeklyData, title: "Weekly" };
    }
  };

  const currentView = getCurrentView();

  /**activity analysis */
  const goodMoodData = moods.filter(
    (mood) =>
      mood.feeling.value === "Excellent" || mood.feeling.value === "Happy"
  );

  const activities = [];
  goodMoodData.forEach((mood) => {
    if (mood.activity && mood.activity.length > 0) {
      mood.activity.forEach((activityCategory) => {
        Object.keys(activityCategory).forEach((category) => {
          if (Array.isArray(activityCategory[category])) {
            activityCategory[category].forEach((activity) => {
              activities.push(activity.value);
            });
          }
        });
      });
    }
  });

  const activityCount = {};
  activities.forEach((activity) => {
    activityCount[activity] = (activityCount[activity] || 0) + 1;
  });
  const activityCountArray = Object.entries(activityCount)
    .filter(([, count]) => count > 0)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const goodBarData = {
    labels: activityCountArray.map((a) => a.name),
    datasets: [
      {
        label: "count",
        data: activityCountArray.map((a) => a.count),
        backgroundColor: "rgba(126,143,122,0.4)",
        borderColor: "#7E8F7A",
        borderWidth: 2,
        borderRadius: 8,
        barThickness: 28,
        minBarLength: 3,
      },
    ],
  };

  const badMoodEntries = moods.filter(
    (mood) =>
      mood.feeling.value === "Sad" ||
      mood.feeling.value === "Terrible" ||
      mood.feeling.value === "Average"
  );

  const badActivities = [];
  badMoodEntries.forEach((mood) => {
    if (mood.activity && mood.activity.length > 0) {
      mood.activity.forEach((activityCategory) => {
        Object.keys(activityCategory).forEach((category) => {
          if (Array.isArray(activityCategory[category])) {
            activityCategory[category].forEach((activity) => {
              badActivities.push(activity.value);
            });
          }
        });
      });
    }
  });

  const badActivityCount = {};
  badActivities.forEach((activity) => {
    badActivityCount[activity] = (badActivityCount[activity] || 0) + 1;
  });
  const badActivityCountArray = Object.entries(badActivityCount)
    .filter(([, count]) => count > 0)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const badBarData = {
    labels: badActivityCountArray.map((a) => a.name),
    datasets: [
      {
        label: "count",
        data: badActivityCountArray.map((a) => a.count),
        backgroundColor: "rgba(214,107,107,0.3)",
        borderColor: "#D66B6B",
        borderWidth: 2,
        borderRadius: 8,
        barThickness: 28,
        minBarLength: 3,
      },
    ],
  };

  const activityChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: "'Inter', sans-serif", size: 10 }, color: "#736E67" },
      },
      y: {
        grid: { color: "rgba(115,110,103,0.06)" },
        ticks: { font: { family: "'Inter', sans-serif", size: 10 }, color: "#736E67", stepSize: 1 },
      },
    },
  };

  return (
    <div className="space-y-10">
      {/* Mood Tracking Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[#C38A72] text-[10px] font-semibold tracking-wider uppercase mb-1">Emotions</p>
            <h3 className="font-serif text-xl font-semibold text-[#2D2A26]">Mood Tracking</h3>
          </div>
          <div className="flex items-center gap-2 bg-[#FAF8F5] p-1 rounded-full border border-[#736E67]/[0.08]">
            {viewButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => setView(btn.key)}
                className={`py-2 px-4 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${view === btn.key
                  ? "bg-[#7E8F7A] text-white shadow-sm"
                  : "text-[#736E67] hover:text-[#2D2A26]"
                  }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {moods && moods.length > 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-[#2D2A26] font-serif text-2xl font-semibold mb-4">
              {currentView.totalCount} <span className="text-base font-sans font-normal text-[#736E67]">entries</span>
            </p>
            <div className="w-full h-[250px] sm:h-[300px]">
              <Bar data={currentView.data} options={makeOptions(currentView.title)} />
            </div>
          </div>
        ) : (
          <p className="text-[#736E67]/60 text-sm font-light py-8 text-center">No data available</p>
        )}
      </div>

      {/* Activity Affectors Section */}
      {moods && moods.length > 0 && (
        <div className="pt-6 border-t border-[#736E67]/[0.08] space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Good mood */}
            <div className="bg-[#FAF8F5] rounded-xl border border-[#736E67]/[0.06] p-5">
              <p className="text-[#7E8F7A] text-[10px] font-semibold tracking-wider uppercase mb-1">Positive</p>
              <h4 className="font-serif text-base font-semibold text-[#2D2A26] mb-4">Good Mood Factors</h4>
              <div className="w-full h-[200px]">
                <Bar data={goodBarData} options={activityChartOptions} />
              </div>
            </div>

            {/* Bad mood */}
            <div className="bg-[#FAF8F5] rounded-xl border border-[#736E67]/[0.06] p-5">
              <p className="text-[#D66B6B] text-[10px] font-semibold tracking-wider uppercase mb-1">Negative</p>
              <h4 className="font-serif text-base font-semibold text-[#2D2A26] mb-4">Bad Mood Factors</h4>
              <div className="w-full h-[200px]">
                <Bar data={badBarData} options={activityChartOptions} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodProgress;
