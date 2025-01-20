const express = require("express");
const { getDashboardData } = require("../controllers/userController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/getDashboardData", authenticateToken, getDashboardData);

module.exports = router;
