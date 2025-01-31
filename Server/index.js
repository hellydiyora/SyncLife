const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const habitRoutes = require("./routes/habitRoutes");
const journalRoutes = require("./routes/journalRoutes");
const authRoutes = require("./routes/authRoute");
const gratiRoutes = require("./routes/gratiRoute");
const moodRoute = require("./routes/moodRoute");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
  origin: "https://sync-life-frontend.vercel.app",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use(express.json());
app.use("/", express.static("assets"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://sync-life-frontend.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.options("*", (req, res) => {
  res.sendStatus(200);
});

// Connect to MongoDB Atlas
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas", err));

app.use("/journal", journalRoutes);
app.use("/habits", habitRoutes);
app.use("/gratitude", gratiRoutes);
app.use("/mood", moodRoute);
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.send("API is working!");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

