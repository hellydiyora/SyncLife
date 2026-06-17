require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const habitRoutes = require("./routes/habitRoutes");
const journalRoutes = require("./routes/journalRoutes");
const authRoutes = require("./routes/authRoute");
const gratiRoutes = require("./routes/gratiRoute");
const moodRoute = require("./routes/moodRoute");
const aiRoute = require("./routes/aiRoute");
const app = express();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));
app.use(express.json());
app.use("/", express.static("assets"));

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
app.use("/ai", aiRoute);
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.send("API is working!");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

