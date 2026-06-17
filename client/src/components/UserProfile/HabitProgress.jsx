import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../reducers/authSlice";
import { fetchHabits, setHabits } from "../../reducers/habitSlice";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(ArcElement, Legend, Tooltip);

const chartOptions = {
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        font: { family: "'Inter', sans-serif", size: 11 },
        color: "#736E67",
        padding: 12,
        usePointStyle: true,
        boxWidth: 8,
        boxHeight: 8,
        pointStyle: "circle",
      },
    },
  },
};

const makeData = (completed, incomplete) => ({
  labels: ["Completed", "Incomplete"],
  datasets: [
    {
      data: [completed, incomplete],
      backgroundColor: ["rgba(126,143,122,0.35)", "rgba(195,138,114,0.25)"],
      borderColor: ["#7E8F7A", "#C38A72"],
      borderWidth: 2,
    },
  ],
});

const HabitCard = ({ habit, isExpired }) => {
  const completed = habit.data.filter((day) => day.isCompleted).length;
  const incomplete = habit.data.length - completed;
  const percent = habit.data.length > 0 ? Math.round((completed / habit.data.length) * 100) : 0;

  const message =
    completed === habit.data.length
      ? "You achieved it ✌️"
      : completed === 0
      ? "Try harder 💪"
      : completed > habit.data.length / 2
      ? "Almost there 🤞"
      : "Keep trying 👊";

  return (
    <div className={`bg-[#FAF8F5] rounded-xl border border-[#736E67]/[0.06] p-5 flex flex-col items-center text-center ${isExpired ? "opacity-70" : ""}`}>
      <h4 className={`font-serif text-lg font-semibold capitalize mb-1 ${isExpired ? "text-[#736E67] line-through" : "text-[#2D2A26]"}`}>
        {habit.name}
      </h4>
      <p className="text-[#736E67] text-xs font-light mb-3">
        {habit.data.length} day streak · {percent}% done
      </p>
      <div className="w-36 mb-3">
        <Pie data={makeData(completed, incomplete)} options={chartOptions} />
      </div>
      <p className="text-sm font-medium text-[#7E8F7A]">{message}</p>
    </div>
  );
};

const HabitProgress = () => {
  const habits = useSelector((state) => state.habit.habits);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const today = moment();

  const fetchHabitData = async () => {
    try {
      if (user) {
        const response = await dispatch(fetchHabits(user.token));
        dispatch(setHabits(response.payload));
      } else {
        console.log("User doesn't exist");
      }
    } catch (error) {
      console.log("Error in fetching habits in progress page: ", error);
    }
  };

  useEffect(() => {
    fetchHabitData();
  }, [dispatch]);

  const activeHabits = habits ? habits.filter((h) => moment(h.endDate).isAfter(today)) : [];
  const expiredHabits = habits ? habits.filter((h) => moment(h.endDate).isBefore(today)) : [];

  return (
    <div className="space-y-10">
      {/* Active Habits */}
      <div>
        <h3 className="text-[#C38A72] text-[10px] font-semibold tracking-wider uppercase mb-1">In Progress</h3>
        <p className="font-serif text-xl font-semibold text-[#2D2A26] mb-5">Active Habits</p>

        {activeHabits.length === 0 ? (
          <p className="text-[#736E67]/60 text-sm font-light py-8 text-center">No active habits to display.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeHabits.map((habit) => (
              <HabitCard key={habit._id} habit={habit} isExpired={false} />
            ))}
          </div>
        )}
      </div>

      {/* Expired Habits */}
      {expiredHabits.length > 0 && (
        <div className="pt-6 border-t border-[#736E67]/[0.08]">
          <h3 className="text-[#736E67] text-[10px] font-semibold tracking-wider uppercase mb-1">Completed</h3>
          <p className="font-serif text-xl font-semibold text-[#2D2A26] mb-5">Expired Habits</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {expiredHabits.map((habit) => (
              <HabitCard key={habit._id} habit={habit} isExpired={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitProgress;
