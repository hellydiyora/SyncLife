import journal from "../images/journal.png";
import habitT from '../images/habit.png';
import gratitudeJ from '../images/gratitude.png';
import moodT from '../images/mood.png';
import dashboardImg from '../images/home2.jpg';
import aiInsight from '../images/aiInsight.png';
import dashboard from '../images/dashboard.png';

const data = [
  {
    title: "TaskMate",
    description: "Just check off the things that you finish!",
    image: journal,
    link: "/journal",
  },
  {
    title: "GoalMinder",
    description: "Like a friendly helper for your daily habits.",
    image: habitT,
    link: "/habits",
  },
  {
    title: "GratiMemo",
    description: "Simple way to appreciate the good stuff.",
    image: gratitudeJ,
    link: "/gratitude",
  },
  {
    title: "EmoSense",
    description: "A Personal diary for your emotions.",
    image: moodT,
    link: "/mood",
  },
  {
    title: "AI Insights",
    description: "Your personal AI coach for smarter productivity.",
    image: aiInsight,
    link: "/ai",
  },
  {
    title: "Dashboard",
    description: "See your progress across all modules at a glance.",
    image: dashboard,
    link: "/user",
  },
];

export default data;
