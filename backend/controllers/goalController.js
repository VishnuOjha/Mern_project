// @desc Get GOALS
// @route GET /api/goals
// @access Private
const getGoals = (req, res) => {
  res.status(200).json({
    message: "Get Goals",
  });
};

// @desc Set GOAL
// @route POST /api/goals
// @access Private
const setGoal = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add text field");
  }
  res.status(200).json({
    message: "Set Goals",
  });
};

// @desc Update GOAL
// @route PUT /api/goals/:id
// @access Private
const updateGoal = (req, res) => {
  res.status(200).json({
    message: `Update goal ${req.params.id}`,
  });
};

// @desc Delete GOAL
// @route DELETE /api/goals
// @access Private
const deleteGoal = (req, res) => {
  res.status(200).json({
    message: `Delete goal ${req.params.id}`,
  });
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
