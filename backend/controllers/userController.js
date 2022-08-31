const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// @desc Post Register New User
// @route POST /api/users
// @access Public
const registrUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check if there is any empty field
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if user already exits
  const userExits = await User.findOne({ email });
  if (userExits) {
    res.status(400);
    throw new Error("User already exits");
  }

  // hash the password using bycrptjs
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  // returning response if user added successfully
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc Post Login User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for email if it's registerd or not
  const user = await User.findOne({ email });
  const comparePass = await bcrypt.compare(password, user.password);

  if (user && comparePass) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credential");
  }
});

// @desc Get User Data
// @route Get /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    _id,
    name,
    email,
  });
});

// Generating JWT tokens
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SCERET, { expiresIn: "10m" });
};

module.exports = {
  registrUser,
  loginUser,
  getMe,
};
