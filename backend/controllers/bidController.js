const Bid = require("../models/BidModel");
const GPU = require("../models/GPUModel");
const User = require("../models/UserModel");

const placeBid = async (req, res) => {
  const userId = req.user._id;

  const { bidAmount, gpuId } = req.body;

  try {
    // Find GPU and user
    const gpu = await GPU.findById(gpuId);
    const user = await User.findById(userId);

    if (!gpu || !user) {
      return res.status(404).json({ error: "GPU or User not found." });
    }

    if (gpu.owner.toString() === userId.toString()) {
      return res
        .status(403)
        .json({ message: "Owner can not bid on his own GPU" });
    }

    // Check if the bid amount is valid
    if (bidAmount < gpu.price) {
      return res.status(400).json({
        error: "Bid amount must be greater than or equal to the GPU price.",
      });
    }

    // Create a new bid
    const newBid = new Bid({
      amount: bidAmount,
      bidder: userId,
      gpu: gpuId,
      owner: userId,
    });

    await newBid.save();

    // Add the bid to the GPU's and user's bids arrays
    gpu.bids.push(newBid);
    user.bids.push(newBid);

    await gpu.save();
    await user.save();

    res.status(200).json({ message: "Bid placed successfully", bid: newBid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
};

const fetchAllBids = async (req, res) => {
  try {
    const fetchAllBids = await Bid.find()
      .populate("bidder", "name email") // Populate bidder details
      .populate("gpu", "name price brand"); // Populate GPU details

    return res.status(200).json(fetchAllBids);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const getBidsByGPU = async (req, res) => {
  try {
    const { gpuId } = req.params; // Get GPU ID from request params

    const bids = await Bid.find({ gpu: gpuId })
      .populate("bidder", "name email") // Populate bidder details
      .populate("owner", "name email") // Populate owner details
      .sort({ amount: -1 }); // Sort bids in descending order

    if (bids.length === 0) {
      return res.status(404).json({ message: "No bids found for this GPU." });
    }

    res.status(200).json(bids);
  } catch (error) {
    console.error("Error fetching bids for GPU:", error);
    res.status(500).json({ message: "Error fetching bids for GPU" });
  }
};

module.exports = { placeBid, fetchAllBids, getBidsByGPU };
