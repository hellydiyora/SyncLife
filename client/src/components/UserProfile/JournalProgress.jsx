import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../reducers/authSlice";
import { fetchLists, setLists } from "../../reducers/journalSlice";
import { useEffect, useState } from "react";
import moment from "moment";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const JournalProgress = () => {
  const lists = useSelector((state) => state.list.lists);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [view, setView] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(
    moment.utc().format("YYYY-MM-DD")
  );

  const fetchTasks = async () => {
    try {
      if (user) {
        const response = await dispatch(fetchLists(user.token));
        dispatch(setLists(response.payload));
      } else {
        console.log("user not exist");
      }
    } catch (error) {
      console.log("Error in fetching in progress in journal: ", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [dispatch]);

  const chartColors = {
    backgroundColor: ["rgba(195,138,114,0.25)", "rgba(126,143,122,0.35)"],
    borderColor: ["#C38A72", "#7E8F7A"],
  };

  const makeChartData = (incomplete, complete) => ({
    labels: ["Incomplete", "Completed"],
    datasets: [
      {
        label: "Tasks",
        data: [incomplete, complete],
        backgroundColor: chartColors.backgroundColor,
        borderColor: chartColors.borderColor,
        borderWidth: 2,
      },
    ],
  });

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { family: "'Inter', sans-serif", size: 12 },
          color: "#736E67",
          padding: 16,
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
          pointStyle: "circle",
        },
      },
    },
  };

  /**Daily View */
  const today = moment().format("YYYY-MM-DD");
  const totaltask =
    lists &&
    lists.filter((list) => {
      const listDate = moment.utc(new Date(list.date)).format("YYYY-MM-DD");
      return listDate === today;
    });

  const totalTasksToday = totaltask[0] ? totaltask[0].data.length : 0;
  const dailyCompletedTasks = totaltask[0]
    ? totaltask[0].data.filter((task) => task.isCompleted).length
    : 0;
  const dailyIncompletedTasks = totaltask[0]
    ? totaltask[0].data.filter((task) => !task.isCompleted).length
    : 0;

  /**Weekly View */
  const lastweek = moment(today).subtract(7, "days").format("YYYY-MM-DD");
  const weeklytask =
    lists &&
    lists.filter(
      (list) =>
        moment.utc(new Date(list.date)).format("YYYY-MM-DD") >= lastweek &&
        moment.utc(new Date(list.date)).format("YYYY-MM-DD") <= today
    );
  const totalweektask = weeklytask[0]
    ? weeklytask.map((task) => task.data.length).reduce((acc, cv) => acc + cv)
    : 0;
  const weeklyCompletedTasks = weeklytask
    ? weeklytask.flatMap((task) => task.data).filter((task) => task.isCompleted).length
    : 0;
  const weeklyIncompletedTasks = weeklytask
    ? weeklytask.flatMap((task) => task.data).filter((task) => !task.isCompleted).length
    : 0;

  /**Monthly View */
  const startOfMonth = moment(today).startOf("month").format("YYYY-MM-DD");
  const monthlyTask =
    lists &&
    lists.filter(
      (list) =>
        moment.utc(new Date(list.date)).format("YYYY-MM-DD") >= startOfMonth &&
        moment.utc(new Date(list.date)).format("YYYY-MM-DD") <= today
    );
  const totalMonthlytask = monthlyTask[0]
    ? monthlyTask.map((task) => task.data.length).reduce((acc, cv) => acc + cv)
    : 0;
  const monthlyCompletedTasks = monthlyTask
    ? monthlyTask.flatMap((task) => task.data).filter((task) => task.isCompleted).length
    : 0;
  const monthlyIncompletedTasks = monthlyTask
    ? monthlyTask.flatMap((task) => task.data).filter((task) => !task.isCompleted).length
    : 0;

  /**Yearly View */
  const startOfYear = moment(today).startOf("year").format("YYYY-MM-DD");
  const yearlyTask =
    lists &&
    lists.filter(
      (list) =>
        moment.utc(new Date(list.date)).format("YYYY-MM-DD") >= startOfYear &&
        moment.utc(new Date(list.date)).format("YYYY-MM-DD") <= today
    );
  const yearlyTotalTask = yearlyTask[0]
    ? yearlyTask.map((task) => task.data.length).reduce((acc, cv) => acc + cv)
    : 0;
  const yearlyCompletedTask = yearlyTask
    ? yearlyTask.flatMap((task) => task.data).filter((task) => task.isCompleted).length
    : 0;
  const yearlyInompletedTask = yearlyTask
    ? yearlyTask.flatMap((task) => task.data).filter((task) => !task.isCompleted).length
    : 0;

  /**search date */
  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    setView("search");
  };

  const selectedDateTasks =
    lists &&
    lists.filter(
      (list) =>
        moment.utc(new Date(list.date)).format("YYYY-MM-DD") === selectedDate
    );
  const totalSelectedDateTasks = selectedDateTasks[0]
    ? selectedDateTasks.map((task) => task.data.length).reduce((acc, cv) => acc + cv)
    : 0;
  const completedSelectedDateTasks = selectedDateTasks
    ? selectedDateTasks.flatMap((task) => task.data).filter((task) => task.isCompleted).length
    : 0;
  const incompletedSelectedDateTasks = selectedDateTasks
    ? selectedDateTasks.flatMap((task) => task.data).filter((task) => !task.isCompleted).length
    : 0;

  const viewButtons = [
    { key: "daily", label: "Today" },
    { key: "weekly", label: "Week" },
    { key: "monthly", label: "Month" },
    { key: "yearly", label: "Year" },
  ];

  const getViewData = () => {
    switch (view) {
      case "daily":
        return { total: totalTasksToday, data: makeChartData(dailyIncompletedTasks, dailyCompletedTasks), label: "Today's Overview" };
      case "weekly":
        return { total: totalweektask, data: makeChartData(weeklyIncompletedTasks, weeklyCompletedTasks), label: "This Week" };
      case "monthly":
        return { total: totalMonthlytask, data: makeChartData(monthlyIncompletedTasks, monthlyCompletedTasks), label: "This Month" };
      case "yearly":
        return { total: yearlyTotalTask, data: makeChartData(yearlyInompletedTask, yearlyCompletedTask), label: "This Year" };
      case "search":
        return { total: totalSelectedDateTasks, data: makeChartData(incompletedSelectedDateTasks, completedSelectedDateTasks), label: moment(selectedDate).format("MMMM D, YYYY") };
      default:
        return { total: 0, data: makeChartData(0, 0), label: "" };
    }
  };

  const currentView = getViewData();

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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

        <div className="flex items-center gap-3">
          <span className="text-[#736E67] text-xs font-semibold tracking-wider uppercase">Search:</span>
          <input
            type="date"
            className="input-cozy text-sm text-[#736E67] !py-2 !px-3 max-w-[160px]"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      </div>

      {/* Chart Display */}
      <div className="flex flex-col items-center text-center py-4">
        <p className="text-[#C38A72] text-[10px] font-semibold tracking-wider uppercase mb-1">
          {currentView.label}
        </p>

        {currentView.total === 0 ? (
          <div className="py-12">
            <svg className="w-10 h-10 mx-auto text-[#736E67]/30 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-[#736E67]/60 text-sm font-light">No data available</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-[#2D2A26] font-serif text-2xl font-semibold">
              {currentView.total} <span className="text-base font-sans font-normal text-[#736E67]">tasks</span>
            </p>
            <div className="w-52 sm:w-64 mx-auto">
              <Pie data={currentView.data} options={chartOptions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalProgress;
