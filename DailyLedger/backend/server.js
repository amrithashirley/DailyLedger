import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from "./routes/auth.js";
import habitRoutes from "./routes/habits.js"; 

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('DailyLedger backend is running!');
});

app.post("/test", (req, res) => {
    console.log("Test route hit!", req.body);
    res.json({ msg: "Test route works!" });
  });

// Log every request
app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.url, req.body);
    next();
  });


app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));