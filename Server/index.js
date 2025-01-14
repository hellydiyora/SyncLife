const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const habitRoutes = require("./routes/habitRoutes");
const journalRoutes = require("./routes/journalRoutes");
const authRoutes = require("./routes/authRoute");
const gratiRoutes = require("./routes/gratiRoute");
const moodRoute = require("./routes/moodRoute");
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use('/', express.static('assets'));

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("Failed to connect to MongoDB Atlas", err));

app.use('/journal', journalRoutes);
app.use('/habits', habitRoutes);
app.use('/gratitude', gratiRoutes);
app.use('/mood', moodRoute);
app.use('/', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
