const User = require("../models/Users");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const secret = process.env.SECRET_KEY;

const createToken = (_id) => {
  return jwt.sign({_id} , secret , {expiresIn: "3d"})
}

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, birthDate, password } = req.body;
  
    if(!firstName || !lastName || !email || !birthDate || !password){
      throw Error("All fields must be filled.");
    }

    if(!validator.isEmail(email))
    {
      throw Error("Email is not valid");
    }

    if(!validator.isStrongPassword(password))
    {
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);

    const user = await User.create({firstName , lastName , birthDate , email , password: hashedPassword });

    const token = createToken(user._id);

    res.status(200).json({ firstName , token });
  } catch (error) {
    res.status(500).json({ error:error.message});
  }
};

const login = async (req, res) => {
  try{
    const {email , password} = req.body;

    if(!email || !password){
      throw Error("All fields must be filled");
    }

    const user = await User.findOne({email});

    if(!user)
    {
      throw Error("Email does not exist");
    }

    const match = await bcrypt.compare(password , user.password);

    if(!match){
      throw Error("Incorrect Password");
    }

    const token = createToken(user._id)

    res.status(200).json({firstName:user.firstName , token})

  }catch(error){
    res.status(500).json({error:error.message});
  }
};

const getUser = async (req, res) => {
    const {firstName} = req.query;
    try {
          const userData = await User.findOne({firstName});
      
          if (!userData) {
            return res.status(404).json({ error: "User not found" });
          }
      
          res.json(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  module.exports = {getUser , signup, login };