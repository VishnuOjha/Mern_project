// import asyncHandler to handle all async work
const asyncHandler = require("express-async-handler");
// importing data schema for adding a data into database
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc Get GOALS
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.find({ user: req.user.id });
  res.status(200).json(goal);
});

// @desc Set GOAL
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add text field");
  }

  const addGoal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(addGoal);
});

// @desc Update GOAL
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  console.log(goal);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  // check if user exits or not
  if (!user) {
    res.status(400);
    throw new Error("User Not Found");
  }

  // make sure logged in user is same as goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorised");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @desc Delete GOAL
// @route DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  // check if user exits or not
  if (!user) {
    res.status(400);
    throw new Error("User Not Found");
  }

  // make sure logged in user is same as goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorised");
  }

  //   const deleteGoal = await Goal.findByIdAndDelete(req.params.id);

  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
