const express = require("express");
const {
  addGPU,
  fetchAllGPUs,
  updateGPU,
  fetchGPUById,
  closeAuction,
  deleteGPU,
} = require("../controllers/gpuController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/addgpu", authenticateToken, addGPU);
router.get("/fetchAllGPUs", authenticateToken, fetchAllGPUs);
router.put("/updateGPU/:id", authenticateToken, updateGPU);
router.get("/fetchGPUById/:id", authenticateToken, fetchGPUById);
router.patch("/updateGPUStatus/:gpuId", authenticateToken, closeAuction);

router.delete("/delete/:gpuId", authenticateToken, deleteGPU); // Delete route

module.exports = router;
