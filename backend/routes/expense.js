const router = require("express").Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

// Add Expense
router.post("/", auth, async (req, res) => {
  const { title, amount, category } = req.body;

  const expense = new Expense({
    userId: req.user.id,
    title,
    amount,
    category
  });

  await expense.save();
  res.json(expense);
});

// Get Expenses
router.get("/", auth, async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id });
  res.json(expenses);
});

module.exports = router;