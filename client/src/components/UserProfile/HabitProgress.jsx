import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../reducers/authSlice";
import { fetchHabits, setHabits } from "../../reducers/habitSlice";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Legend, Tooltip);

const HabitProgress = ({ onClose }) => {
  const [view, setView] = useState("daily");
  const habits = useSelector((state) => state.habit.habits);
  console.log(habits);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

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

  const toggleView = (selectedView) => {
    setView(selectedView);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl underline decoration-1 font-serif mb-6">
          Progress in GoalMinder
        </h1>
      </div>
      <div className="m-2 min-h-96">
        <div className="grid grid-cols-4 gap-4">
          {habits &&
            habits.map((habit, index) => (
              <div key={habit._id} className="mb-4">
                <p className="text-2xl font-mono">{habit.name}</p>
                <p>Total Streak Days: {habit.data.length}</p>
                <div className="flex items-center justify-center w-60 ">
                  <Pie
                    data={{
                      labels: ["Completed days", "Incompleted days"],
                      datasets: [
                        {
                          data: [
                            habit.data.filter((day) => day.isCompleted).length,
                            habit.data.length -
                              habit.data.filter((day) => day.isCompleted)
                                .length,
                          ],
                          backgroundColor: [
                            "rgba(65, 109, 25 , 0.8)",
                            "rgba(179, 19, 18, 0.8)",
                          ],
                          borderColor: [
                            "rgba(19, 255, 19, 1)",
                            "rgba(255, 19, 19, 1)",
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                </div>
                <p className="text-lg mt-4 font-semibold">
                  {habit.data.length ===
                  habit.data.filter((day) => day.isCompleted).length
                    ? "You achieved it✌"
                    : habit.data.filter((day) => day.isCompleted).length === 0
                    ? "Try harder💪"
                    : habit.data.filter((day) => day.isCompleted).length ===
                      habit.data.length / 2
                    ? "You are on the right path👍"
                    : habit.data.filter((day) => day.isCompleted).length >
                      habit.data.length / 2
                    ? "You are almost there🤞"
                    : "Keep trying👊"}
                </p>{" "}
              </div>
            ))}
        </div>
      </div>{" "}
      <button
        onClick={onClose}
        className="bg-slate-200 shadow-lg shadow-slate-400 p-2 rounded-md mt-2 text-black"
      >
        Back to progress page
      </button>
    </div>
  );
};
export default HabitProgress;
