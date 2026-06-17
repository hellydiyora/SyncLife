const fs = require("fs");
const path = require("path");
const Gratitude = require("../models/Gratitude");

const convertHeicToJpg = async (filename) => {
  const ext = path.extname(filename).toLowerCase();
  if (ext !== ".heic" && ext !== ".heif") {
    return filename;
  }

  const inputPath = path.join(__dirname, "..", "assets", "images", filename);
  const baseName = path.basename(filename, ext);
  const outputFilename = `${baseName}.jpg`;
  const outputPath = path.join(__dirname, "..", "assets", "images", outputFilename);

  try {
    const convert = require("heic-convert");
    const inputBuffer = await fs.promises.readFile(inputPath);
    const outputBuffer = await convert({
      buffer: inputBuffer,
      format: "JPEG",
      quality: 0.85
    });

    await fs.promises.writeFile(outputPath, outputBuffer);
    await fs.promises.unlink(inputPath);
    console.log(`HEIC converted successfully to JPEG: ${outputFilename}`);
    return outputFilename;
  } catch (err) {
    console.error("Failed to convert HEIC to JPEG:", err);
    return filename;
  }
};

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
    const { date, entry } = req.body;
    const user_id = req.user._id;
    let gratitude = await Gratitude.findOne({ user_id, date });

    let finalFilename = "blank.jpg";
    if (req.file) {
      finalFilename = await convertHeicToJpg(req.file.filename);
    }

    if (gratitude) {
      gratitude.entry = entry ? entry : gratitude.entry;
      if (req.file) {
        const oldImage = gratitude.image;
        gratitude.image = finalFilename;
        if (oldImage && oldImage !== "blank.jpg" && oldImage !== finalFilename) {
          const oldImagePath = path.join(__dirname, "..", "assets", "images", oldImage);
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error("Error deleting old gratitude image:", err);
          });
        }
      }
    } else {
      gratitude = new Gratitude({
        date,
        entry,
        image: finalFilename,
        user_id,
      });
    }
    await gratitude.save();

    res.status(201).json(gratitude);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteGratitude = async (req, res) => {
  const { newDate } = req.body;
  const user_id = req.user._id;
  const date = newDate;

  try {
    const data = await Gratitude.findOneAndDelete({ user_id, date });
  
    if (!data) {
      return res.status(404).json({ message: "Entry not found" });
    }

    if (data.image && data.image !== "blank.jpg") {
      const imagePath = path.join(__dirname, "..", "assets", "images", data.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting gratitude image:", err);
      });
    }

    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchGratitude, createGratitude , deleteGratitude};
