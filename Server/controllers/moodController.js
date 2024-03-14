const Mood = require("../models/Mood");

const fetchMoodData = async (req, res) => {
  try {
    const user_id = req.user._id;
    const moodData = await Mood.find({ user_id });
    res.json(moodData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMoodData = async (req, res) => {
  try {
    const { date, feeling , activity } = req.body;
    const user_id = req.user._id;

    const dateExist = await Mood.findOne({ user_id, date });

    if (dateExist) {
      dateExist.feeling = feeling;
      dateExist.activity = activity;
      await dateExist.save();
      res.status(200).json(dateExist);
    } else {
      const moodData = new Mood({
        date,
        feeling,
        activity,
        user_id,
      });

      await moodData.save();
      res.status(201).json(moodData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { fetchMoodData, createMoodData };
