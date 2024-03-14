const mongoose = require("mongoose");

const gratitudeSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  greatfulFor: {
    type: String,
    required: true,
  },
  lookingForward: {
    type: String,
    required: true,
  },
  goodThings: {
    type: String,
    required: true,
  },
  better:{
        type: String,
        required: true,
  },
  user_id: {
    type:String,
    required:true,
},
});

const Gratitude = mongoose.model("Gartitude", gratitudeSchema);

module.exports = Gratitude;
