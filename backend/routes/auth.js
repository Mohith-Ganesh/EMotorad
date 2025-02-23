const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const Profile = require("../models/Profile.js");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  console.log('hii');
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Signin Route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, user: { id: user._id, fullName: user.fullName, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/profiles", async (req, res) => {
    try {
      const { name, email, phone, instagram, youtube } = req.body;
  
      // Validate required fields
      if (!name || !email || !phone) {
        return res.status(400).json({ message: "Name, Email, and Phone are required!" });
      }
  
      // Create and save profile
      const newProfile = new Profile({ name, email, phone, instagram, youtube });
      await newProfile.save();
  
      res.status(201).json({ message: "Profile added successfully", profile: newProfile });
    } catch (error) {
      console.error("Error adding profile:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


module.exports = router;
