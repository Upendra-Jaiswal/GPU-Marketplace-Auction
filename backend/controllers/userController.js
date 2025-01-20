const User = require("../models/UserModel"); // Import User model
//import User from "../models/userModel.js"; // Adjust the path based on your project structure

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

//const JWT_SECRET = process.env.JWT_SECRET; // Access JWT secret from environment variables
const JWT_EXPIRES_IN = "1h"; // Token expiration time

// Sign Up Function
const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, user: savedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      //  secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "lax", // Adjust based on your needs
    });
    // Send success response
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Server error during logout" });
  }
};

const verifyAuth = (req, res) => {
  try {
    const token = req.cookies.jwt; // Retrieve token from cookies

    if (!token) {
      return res.status(401).json({ message: "No JWT token found" });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    res.status(200).send({
      userId: decoded.userId,
      isAdmin: decoded.isAdmin, // Assuming you store role in the token payload
      name: decoded.name,
      message: "Authenticated",
    });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};
// };

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If password does not match
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    // Set the JWT token as an HTTP-only cookie
    res.cookie("jwt", token, {
      maxAge: 86400 * 1000, // Cookie expires in 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "None", // Adjust based on your needs
    });

    console.log(token);

    res.status(200).json({ token, user });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Server error" });
  }
};

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id; // Ensure authentication middleware provides user ID

    const user = await User.findById(userId)
      .populate("listedGPUs")
      .populate("boughtGPUs")
      .populate({
        path: "bids",
        populate: { path: "gpu", model: "GPU" }, // Populating GPU details in bids
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      listedGPUs: user.listedGPUs,
      boughtGPUs: user.boughtGPUs,
      bids: user.bids,
      userId,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  signUp,
  signIn,
  logout,
  verifyAuth,
  getDashboardData,
};
