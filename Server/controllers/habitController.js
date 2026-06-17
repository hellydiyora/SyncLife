const Habit = require("../models/Habit");

const moment = require("moment");

const fetchHabit = async (req, res) => {
    try {
      const user_id = req.user._id;
      const habits = await Habit.find({user_id});
      res.json(habits);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const createHabit = async (req,res) => {
    try {
        const { name, startDate, endDate } = req.body;
        const user_id = req.user._id;
        const habit = new Habit({
          name,
          startDate,
          endDate,
          data: generateDatasArray(startDate, endDate),
          user_id,
        });
        await habit.save();
    
        res.status(201).json(habit);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server Error" });
      }
};

const deleteHabit = async (req,res) => {
    try {
        const habit = await Habit.findOneAndDelete({ _id: req.params.id, user_id: req.user._id });
        if (!habit) {
          return res.status(404).json({ message: "Habit not found or unauthorized" });
        }
        res.json({message:"Deleted successfully"});
      } catch(error){
        res.status(500).json({error:error.message});
      }
};

const updateHabit = async (req, res) => {
    try {
        const { id } = req.params;
        const { name , startDate , endDate } = req.body;
    
        const habit = await Habit.findOne({ _id: id, user_id: req.user._id });
    
        if(!habit)
        {
          return res.status(404).json({message: "Habit not found or unauthorized"});
        }

        const datesChanged = 
          moment.utc(habit.startDate).format("YYYY-MM-DD") !== moment.utc(startDate).format("YYYY-MM-DD") ||
          moment.utc(habit.endDate).format("YYYY-MM-DD") !== moment.utc(endDate).format("YYYY-MM-DD");

        habit.name = name;
    
        if (datesChanged) {
          const newData = generateDatasArray(startDate, endDate);
          const existingStatusMap = {};
          habit.data.forEach((d) => {
            const key = moment.utc(d.date).format("YYYY-MM-DD");
            existingStatusMap[key] = d.isCompleted;
          });

          newData.forEach((d) => {
            const key = moment.utc(d.date).format("YYYY-MM-DD");
            if (existingStatusMap.hasOwnProperty(key)) {
              d.isCompleted = existingStatusMap[key];
            }
          });

          habit.data = newData;
          habit.startDate = startDate;
          habit.endDate = endDate;
        }
    
        await habit.save();
    
        res.json(habit);
      }
      catch(error){
        res.status(500).json({ error: error.message });
      }
};

const completeHabit = async (req,res) => {
    try {
        const { id } = req.params;
    
        const habit = await Habit.findOne({ _id: id, user_id: req.user._id });
    
        if (!habit) {
          return res.status(404).json({ message: "Habit not found or unauthorized" });
        }
    
        const { date } = req.body;
        const habitDate = habit.data.find(
          (d) => moment.utc(d.date).format("YYYY-MM-DD") === moment.utc(date).format("YYYY-MM-DD")
        );
    
        if (habitDate) {
          habitDate.isCompleted = !habitDate.isCompleted;
          await habit.save();
          res.json(habit);
        } else {
          res.status(404).json({ message: "Date not found for the habit" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
};

function generateDatasArray(startDate, endDate) {
    const data = [];
  
    let currentDate = moment.utc(startDate);
  while (currentDate.isSameOrBefore(moment.utc(endDate) , 'day')) {
    
    data.push({  date: currentDate.format("YYYY-MM-DD"), isCompleted: false });
    currentDate.add(1, "day");
  }
  return data;
};

module.exports = { fetchHabit , createHabit , deleteHabit , updateHabit ,completeHabit};