const User = require("../models/Users");
const Otp = require("../models/Otp");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const otpGenerator = require("otp-generator");
const secret = process.env.SECRET_KEY;
const userEmail = process.env.EMAIL;
const userPassword = process.env.PASSWORD;
const brevoApiKey = process.env.BREVO_API_KEY;

const createToken = (_id) => {
  return jwt.sign({ _id }, secret, { expiresIn: "3d" });
};

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, birthDate, password, otp } = req.body;

    if (!firstName || !lastName || !email || !birthDate || !password || !otp) {
      throw Error("All fields must be filled, including the verification OTP.");
    }

    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      throw Error("Password is not strong enough");
    }

    const currentDate = new Date();
    const userBirthDate = new Date(birthDate);
    const age = currentDate.getFullYear() - userBirthDate.getFullYear();
    if (age < 12) {
      throw Error("User must be at least 12 years old");
    }
    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({ error: "This email is already in use." });
    }

    // Verify OTP code
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ error: "Invalid or expired verification code." });
    }

    // Delete verified OTP record
    await Otp.deleteOne({ email });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      birthDate,
      email,
      password: hashedPassword,
    });

    console.log(user)
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendSignupOtp = async (req, res) => {
  try {
    const { firstName, lastName, email, birthDate, password } = req.body;

    if (!firstName || !lastName || !email || !birthDate || !password) {
      throw Error("All fields must be filled.");
    }

    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      throw Error("Password is not strong enough");
    }

    const currentDate = new Date();
    const userBirthDate = new Date(birthDate);
    const age = currentDate.getFullYear() - userBirthDate.getFullYear();
    if (age < 12) {
      throw Error("User must be at least 12 years old");
    }
    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({ error: "This email is already in use." });
    }

    // Generate 6-digit OTP
    const generatedOTP = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Save or update OTP in database
    await Otp.findOneAndUpdate(
      { email },
      { otp: generatedOTP, createdAt: new Date() },
      { upsert: true, new: true }
    );

    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "SyncLife",
        link: "http://localhost:5173/",
      },
    });

    const response = {
      body: {
        name: firstName,
        intro:
          "Welcome to SyncLife! You are receiving this email to verify your email address for creating a new account. This is your OTP (one-time password). Do not share it with anyone else.",
        outro: generatedOTP,
      },
    };

    const mail = mailGenerator.generate(response);

    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": brevoApiKey,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          sender: { name: "SyncLife", email: userEmail },
          to: [{ email: email }],
          subject: "Verify Your Email - SyncLife Registration",
          htmlContent: mail
        })
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Error sending signup verification email via Brevo API:", data);
        return res.status(500).json({ error: "Error sending verification email" });
      }

      console.log("Email sent successfully to:", email, "| Message ID:", data?.messageId);
      res.status(200).json({ message: "Verification code sent to your email" });
    } catch (err) {
      console.error("Brevo API request exception:", err);
      res.status(500).json({ error: "Error sending verification email" });
    }
  } catch (error) {
    console.error("Error in sendSignupOtp:", error);
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw Error("All fields must be filled");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw Error("Email does not exist");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("Incorrect Password");
    }

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user_id = req.user._id;
    const userData = await User.findById(user_id).select("-password");

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const forgotUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error("All fields must be filled");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Email does not exist");
    }

    const generatedOTP = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Save or update OTP in database
    await Otp.findOneAndUpdate(
      { email },
      { otp: generatedOTP, createdAt: new Date() },
      { upsert: true, new: true }
    );

    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "SyncLife",
        link: "http://localhost:5173/",
      },
    });

    const userName = user.firstName;
    const response = {
      body: {
        name: userName,
        intro:
          "You have received this email because a password reset request for your account was received.This is your OTP(one time password).Do not share it with anyone else",
        outro: generatedOTP,
      },
    };

    const mail = mailGenerator.generate(response);

    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": brevoApiKey,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          sender: { name: "SyncLife", email: userEmail },
          to: [{ email: email }],
          subject: "Reset Password - SyncLife",
          htmlContent: mail
        })
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Error sending password reset email via Brevo API:", data);
        return res.status(500).json({ error: "Error sending email" });
      }

      console.log("Password reset email sent successfully to:", email, "| Message ID:", data?.messageId);
      res.status(201).json({
        email,
      });
    } catch (err) {
      console.error("Brevo API password reset exception:", err);
      res.status(500).json({ error: "Error sending email" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const checkOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    const otpRecord = await Otp.findOne({ email });
    if (otpRecord && otpRecord.otp === otp) {
      console.log("otp verified");
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const resetUser = async (req, res) => {
  try {
    const { email, password, otp } = req.body;

    if (!email || !password || !otp) {
      throw Error("All fields must be filled");
    }

    if (!validator.isStrongPassword(password)) {
      throw Error("Password is not strong enough");
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      throw Error("Email does not exist");
    }

    // Verify OTP code
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ error: "Invalid or expired verification code." });
    }

    // Delete verified OTP record
    await Otp.deleteOne({ email });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;

    const token = createToken(user._id);
    await user.save();
    res
      .status(200)
      .json({ email, token, message: "Password reset successful" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const user_id = req.user._id;
  const { firstName, lastName, nickname, birthDate, bio, phoneNumber, favoriteQuote } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { firstName, lastName, nickname, birthDate, bio, phoneNumber, favoriteQuote },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getUser, signup, login, forgotUser, resetUser, checkOtp, sendSignupOtp, updateUser };
