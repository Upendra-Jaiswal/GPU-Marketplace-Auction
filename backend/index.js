const express = require("express");
const connectDB = require("./config/db");
const loadEnv = require("./config/env");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const axios = require("axios");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes"); //authroutes
const userRoutes = require("./routes/userRoutes"); //authroutes
const gpuRoutes = require("./routes/gpuRoutes"); //authroutes
const bidRoutes = require("./routes/bidRoutes"); //authroutes

const authenticateToken = require("./middleware/authMiddleware");

// const { protect, admin, protected } = require("./middleware/authMiddleware");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config(); // Load environment variables

// Load environment variables
loadEnv();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
// app.use(cors());
app.use(cookieParser());

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

const allowedOrigins = process.env.ORIGIN;

const corsOptions = {
  origin: allowedOrigins,
  methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
});

app.use("/api", authRoutes);

app.use("/api", gpuRoutes);
app.use("/api", bidRoutes);
app.use("/api", userRoutes);

app.get("/set-cookie", (req, res) => {
  // Set a cookie with name "name" and value "somename"
  res.cookie("name", "somename", { maxAge: 86400 * 1000, httpOnly: true }); // 86400 seconds = 1 day
  res.send("Cookie has been set");
});

app.get("/get-cookie", (req, res) => {
  const cookieValue = req.cookies.jwt;
  res.send(`Cookie value: ${cookieValue}`);
});

app.get("/", (req, res) => {
  res.json({
    message: "Server running!",
    user: req.user || null, // Include user information if available
  });
});

// Start the server
app.listen(PORT, () => {

});
