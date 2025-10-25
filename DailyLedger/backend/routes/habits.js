import express from "express";
import Habit from "../models/Habit.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, frequency } = req.body;
    const habit = new Habit({
        userId: req.user.id,
      title,
      frequency
    });
    await habit.save();
    res.json(habit);
  } catch (err) {
    console.error("Error creating habit:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.id });
    res.json(habits);
  } catch (err) {
    console.error("Error fetching habits:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;