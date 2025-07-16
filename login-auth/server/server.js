require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("./models/User");
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Register API
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPwd = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPwd });

  try {
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login API
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  res.json({ message: "Login successful" });
});

// Connect to MongoDB & Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

  app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
    })
  })
  .catch((err) => console.log("MongoDB error:", err));
