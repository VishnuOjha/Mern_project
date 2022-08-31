const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

// if we have same routes then we can user router.route and do chaining on that
router.route("/").get(getGoals).post(setGoal);

router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
