const { GoogleGenerativeAI } = require("@google/generative-ai");
const Journal = require("../models/Journal");
const Habit = require("../models/Habit");
const Mood = require("../models/Mood");
const Gratitude = require("../models/Gratitude");
const moment = require("moment");


/**
 * Aggregates all user data across modules and generates
 * AI-powered productivity insights via OpenAI or Google Gemini.
 */
const getInsights = async (req, res) => {
  try {
    const user_id = req.user._id;

    // ── Fetch all user data in parallel ──────────────────────────
    const [journals, habits, moods, gratitudes] = await Promise.all([
      Journal.find({ user_id }),
      Habit.find({ user_id }),
      Mood.find({ user_id }),
      Gratitude.find({ user_id }),
    ]);

    // ── Build task summary ───────────────────────────────────────
    let totalTasks = 0;
    let completedTasks = 0;
    const recentTasks = [];

    journals.forEach((journal) => {
      journal.data.forEach((item) => {
        totalTasks++;
        if (item.isCompleted) completedTasks++;
      });

      // Collect last 7 days of tasks for context
      const journalDate = moment(journal.date);
      if (journalDate.isAfter(moment().subtract(7, "days"))) {
        journal.data.forEach((item) => {
          recentTasks.push({
            task: item.list,
            completed: item.isCompleted,
            date: journalDate.format("YYYY-MM-DD"),
          });
        });
      }
    });

    const taskCompletionRate =
      totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

    // ── Build habit summary ──────────────────────────────────────
    const habitSummaries = habits.map((habit) => {
      const totalDays = habit.data.length;
      const completedDays = habit.data.filter((d) => d.isCompleted).length;
      const consistency =
        totalDays > 0 ? ((completedDays / totalDays) * 100).toFixed(1) : 0;

      return {
        name: habit.name,
        startDate: moment(habit.startDate).format("YYYY-MM-DD"),
        endDate: moment(habit.endDate).format("YYYY-MM-DD"),
        totalDays,
        completedDays,
        consistency: `${consistency}%`,
      };
    });

    // ── Build mood summary ───────────────────────────────────────
    const moodDistribution = { Excellent: 0, Happy: 0, Average: 0, Sad: 0, Terrible: 0 };
    const recentMoods = [];

    moods.forEach((mood) => {
      if (moodDistribution.hasOwnProperty(mood.feeling.value)) {
        moodDistribution[mood.feeling.value]++;
      }

      const moodDate = moment(mood.date);
      if (moodDate.isAfter(moment().subtract(14, "days"))) {
        const activities = [];
        if (mood.activity && mood.activity.length > 0) {
          mood.activity.forEach((cat) => {
            Object.keys(cat).forEach((key) => {
              if (Array.isArray(cat[key])) {
                cat[key].forEach((a) => {
                  if (a.value) activities.push(a.value);
                });
              }
            });
          });
        }
        recentMoods.push({
          date: moodDate.format("YYYY-MM-DD"),
          feeling: mood.feeling.value,
          activities,
        });
      }
    });

    // ── Build gratitude summary ──────────────────────────────────
    const gratitudeCount = gratitudes.length;
    const recentGratitudes = gratitudes
      .filter((g) => moment(g.date).isAfter(moment().subtract(7, "days")))
      .map((g) => ({
        date: moment(g.date).format("YYYY-MM-DD"),
        entry: g.entry || "(image only)",
      }));

    // ── Compose the prompt ───────────────────────────────────────
    const userDataSummary = {
      tasks: {
        totalTasks,
        completedTasks,
        completionRate: `${taskCompletionRate}%`,
        recentTasks: recentTasks.slice(0, 15),
      },
      habits: {
        totalHabits: habits.length,
        details: habitSummaries.slice(0, 10),
      },
      moods: {
        totalEntries: moods.length,
        distribution: moodDistribution,
        recentMoods: recentMoods.slice(0, 10),
      },
      gratitude: {
        totalEntries: gratitudeCount,
        recentEntries: recentGratitudes.slice(0, 5),
      },
    };

    const systemPrompt = `You are an expert productivity and well-being coach integrated into a self-management app called SyncLife. Analyze the user's data and return ONLY valid JSON (no markdown fences, no extra text) with this exact structure:
{
  "productivityScore": <number 0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "taskInsights": {
    "title": "Task Analysis",
    "points": ["<insight 1>", "<insight 2>", "<insight 3>"]
  },
  "habitInsights": {
    "title": "Habit Coaching",
    "points": ["<tip 1>", "<tip 2>", "<tip 3>"]
  },
  "moodInsights": {
    "title": "Mood Patterns",
    "points": ["<observation 1>", "<observation 2>", "<observation 3>"]
  },
  "recommendations": {
    "title": "Today's Action Plan",
    "points": ["<actionable rec 1>", "<actionable rec 2>", "<actionable rec 3>", "<actionable rec 4>"]
  },
  "motivationalQuote": "<short motivational quote>"
}

Rules:
- Be specific and reference actual data patterns (e.g., exact completion rates, habit names, mood trends)
- If a section has no data, give encouraging starter advice
- Keep each point concise (1-2 sentences max)
- The productivity score should be calculated from task completion rate (40%), habit consistency (40%), and mood positivity (20%)
- Be warm, supportive, and actionable`;

    const userPrompt = `Here is my SyncLife data:\n\n${JSON.stringify(userDataSummary, null, 2)}`;

    let responseText = "";

    // ── Call AI Engine ───────────────────────────────────────────
    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({
        error: "Missing API Key. Please configure GEMINI_API_KEY in your Server/.env file.",
      });
    }

    console.log("Using Google Gemini API...");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
      systemInstruction: systemPrompt,
    });

    let result;
    let attempts = 3;
    let delayMs = 1000;
    while (attempts > 0) {
      try {
        result = await model.generateContent(userPrompt);
        const response = await result.response;
        responseText = response.text().trim();
        break;
      } catch (geminiError) {
        attempts--;
        console.error(`Gemini API attempt failed (remaining attempts: ${attempts}):`, geminiError.message);
        
        const isTransient = 
          geminiError.status === 503 || 
          geminiError.status === 429 || 
          geminiError.message.includes("503") || 
          geminiError.message.includes("429") ||
          geminiError.message.includes("Service Unavailable");

        if (attempts > 0 && isTransient) {
          console.log(`Retrying in ${delayMs}ms due to transient error...`);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
          delayMs *= 2;
        } else {
          throw geminiError;
        }
      }
    }

    // Parse the JSON response (strip markdown fences if present)
    let insights;
    try {
      const cleanedResponse = responseText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      insights = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.error("Raw response:", responseText);
      return res.status(500).json({
        error: "Failed to parse AI response. Please try again.",
      });
    }

    // Attach the raw data summary for frontend context
    insights.dataSummary = {
      totalTasks,
      completedTasks,
      taskCompletionRate: `${taskCompletionRate}%`,
      totalHabits: habits.length,
      totalMoodEntries: moods.length,
      totalGratitudeEntries: gratitudeCount,
    };

    res.status(200).json(insights);
  } catch (error) {
    console.error("AI Insights Error:", error);

    const errorMessage = error?.message || "";

    if (
      error?.status === 401 ||
      error?.code === "invalid_api_key" ||
      errorMessage.includes("API key not valid") ||
      errorMessage.includes("invalid key")
    ) {
      return res
        .status(500)
        .json({ error: "Invalid API key. Please check your configuration." });
    }

    if (
      error?.status === 429 ||
      errorMessage.includes("Quota exceeded") ||
      errorMessage.includes("insufficient_quota") ||
      errorMessage.includes("rate limit") ||
      errorMessage.includes("429")
    ) {
      return res
        .status(429)
        .json({ error: "AI rate limit or quota exceeded. Please try again later or check billing details." });
    }

    res.status(500).json({ error: "Failed to generate AI insights. Please try again." });
  }
};

module.exports = { getInsights };
