import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "custom"],
    default: "daily"
  },
  progress: [
    {
      date: { type: Date },
      completed: { type: Boolean, default: false }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Habit = mongoose.model("Habit", habitSchema);

export default Habit;