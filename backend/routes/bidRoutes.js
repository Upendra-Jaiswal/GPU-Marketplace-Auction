const express = require("express");
const router = express.Router();
const {
  placeBid,
  fetchAllBids,
  getBidsByGPU,
} = require("../controllers/bidController");

const authenticateToken = require("../middleware/authMiddleware");

// Route to place a bid
router.post("/placeBid", authenticateToken, placeBid);

router.get("/fetchBids", fetchAllBids);

router.get("/fetchBids/:gpuId", authenticateToken, getBidsByGPU);

module.exports = router;
