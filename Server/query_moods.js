const mongoose = require("mongoose");
const MONGO_URI = "mongodb+srv://diyorahelly:Helly1602@synclife.rbldf.mongodb.net/?appName=SyncLife";
const USER_ID = "6a222958549f21b474f78412"; // ID of hellydiyora16@gmail.com

async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const moodSchema = new mongoose.Schema({}, { strict: false });
    const Mood = mongoose.model("Mood", moodSchema, "moods");

    // Fetch records by converting USER_ID to ObjectId
    const records = await Mood.find({ user_id: new mongoose.Types.ObjectId(USER_ID) });
    console.log(`Found ${records.length} mood records for user ${USER_ID}:`);
    console.log(JSON.stringify(records, null, 2));

    if (records.length === 0) {
      console.log("No records with ObjectId. Fetching first 2 records in collection:");
      const allRecords = await Mood.find({}).limit(2);
      console.log(JSON.stringify(allRecords, null, 2));
    }

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

main();
