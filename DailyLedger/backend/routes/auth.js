import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  }  catch (err) {
    console.error("Error in /register:", err);
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User does not exist" });
  
      // compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
  
      // sign token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  
      res.json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: err.message });
    }
  });
  
export default router;