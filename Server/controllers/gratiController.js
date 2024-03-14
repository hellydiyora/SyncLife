const Gratitude = require("../models/Gratitude");

const fetchGratitude = async (req, res) => {
  try {
    const user_id = req.user._id;
    const gratitudes = await Gratitude.find({ user_id });
    res.json(gratitudes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createGratitude = async (req, res) => {
  try {
    const { date, greatfulFor, lookingForward, goodThings, better } = req.body;
    const user_id = req.user._id;
    const gratitude = new Gratitude({
      date,
      greatfulFor,
      lookingForward,
      goodThings,
      better,
      user_id,
    });

    await gratitude.save();

    res.status(201).json(gratitude);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { fetchGratitude, createGratitude };
