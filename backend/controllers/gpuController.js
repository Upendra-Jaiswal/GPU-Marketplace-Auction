const GPU = require("../models/GPUModel"); // Adjust path as necessary
const User = require("../models/UserModel"); // Assuming you have a User model
const BidModel = require("../models/BidModel"); // Assuming you have a Bid model

// Controller function to add a new GPU
const addGPU = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      name,
      model,
      price,

      status = "available",
      winner = null,
      bids = [],
    } = req.body;

    // Validate required fields
    if (!name || !model || !price || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate price
    if (price < 0) {
      return res
        .status(400)
        .json({ message: "Price must be a positive number" });
    }

    // Check if the owner exists
    const owner = await User.findById(userId);
    if (!owner) {
      return res.status(400).json({ message: "Owner not found" });
    }

    // Validate bids (check if bid IDs exist in the database)
    const validBids = [];
    for (let bidId of bids) {
      const bid = await BidModel.findById(bidId);
      if (bid) {
        validBids.push(bidId);
      }
    }

    // Create a new GPU instance
    const newGPU = new GPU({
      name,
      model,
      price,
      owner: userId,
      status,
      winner,
      bids: validBids, // Store only valid bids
    });

    const savedGPU = await newGPU.save();
    await User.findByIdAndUpdate(
      userId,
      { $push: { listedGPUs: savedGPU._id } }, // Push the new GPU's _id into the listedGPUs array
      { new: true } // Return the updated user document
    );

    // Save the GPU to the database

    res.status(201).json({ message: "GPU added successfully", gpu: savedGPU });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Controller function to fetch all GPUs
const fetchAllGPUs = async (req, res) => {
  const userId = req.user._id;

  try {
    const gpus = await GPU.find();
    const user = await User.findById(userId).populate("listedGPUs");

    if (gpus.length === 0) {
      return res.status(404).json({ message: "No GPUs found" });
    }

    // Respond with the list of GPUs
    res.status(200).json({ gpus, userId, listedGPUs: user.listedGPUs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const fetchGPUById = async (req, res) => {
  const gpuId = req.params.id; // Get GPU ID from the URL parameters
  const userId = req.user._id; // Get the logged-in user's ID

  try {
    // Find the GPU by its ID
    const gpu = await GPU.findById(gpuId);

    // If GPU doesn't exist
    if (!gpu) {
      return res.status(404).json({ message: "GPU not found" });
    }

    // Fetch the user to check if the GPU is in their listedGPUs
    const user = await User.findById(userId).populate("listedGPUs");

    // Check if the GPU is in the logged-in user's listed GPUs
    const isListedByUser = user.listedGPUs.some(
      (listedGPU) => listedGPU._id.toString() === gpuId
    );

    // Respond with the GPU details and whether it's listed by the user
    res.status(200).json({
      gpu,
      isListedByUser, // True if the user has listed this GPU
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Controller function to update an existing GPU
const updateGPU = async (req, res) => {
  try {
    // const gpuId = req.params.gpuId; // Get GPU ID from URL parameters
    const userId = req.user._id; // Get the logged-in user's ID from the request

    const { name, model, price, gpuId } = req.body;

    // Validate the input fields
    if (!name || !model || !price || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate price
    if (price < 0) {
      return res
        .status(400)
        .json({ message: "Price must be a positive number" });
    }

    // Check if the GPU exists
    const gpu = await GPU.findById(gpuId);

    if (!gpu) {
      return res.status(404).json({ message: "GPU not found" });
    }

    // Check if the user is the owner of the GPU
    if (gpu.owner.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not the owner of this GPU" });
    }

    // Update the GPU
    gpu.name = name;
    gpu.model = model;
    gpu.price = price;

    // Save the updated GPU
    const updatedGPU = await gpu.save();

    // Return the updated GPU
    res
      .status(200)
      .json({ message: "GPU updated successfully", gpu: updatedGPU });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to close the auction for a GPU
const closeAuction = async (req, res) => {
  const { gpuId } = req.params; // Get GPU ID from the route parameter
  const gpu = await GPU.findById(gpuId);
  const userId = req.user._id;
  console.log(userId, "userid");
  const { status } = req.body; // Get the status from the request body

  if (status !== "closed") {
    return res
      .status(400)
      .json({ message: "Invalid status. It must be 'closed'." });
  }

  if (gpu.owner.toString() !== userId.toString()) {
    return res
      .status(403)
      .json({ message: "Unauthorized to close this auction" });
  }

  try {
    const userId = req.user._id;
    const bids = await BidModel.find({ gpu: gpuId }).sort({ amount: -1 });
    // console.log(bids, "bids");
    const highestBidder = bids[0].bidder;

    console.log(userId, "useridd");

    //  return;

    // const updatedGPU = await GPU.findByIdAndUpdate(
    //   gpuId,
    //   { winner: highestBid.bidder },
    //   { new: true } // Return the updated document
    // );

    // Find and update the GPU status to 'closed'
    // const gpu = await GPU.findByIdAndUpdate(
    //   gpuId,

    //   { winner: highestBidder },
    //   { new: true }
    // );

    // const gpu3 = await GPU.findByIdAndUpdate(
    //   gpuId,
    //   { status: "closed" },

    //   { new: true }
    // );

    const gpu = await GPU.findByIdAndUpdate(
      gpuId,
      {
        $set: {
          winner: highestBidder,
          status: "closed",
        },
      },
      { new: true }
    );

    const newUser = await User.findByIdAndUpdate(
      highestBidder,
      { $push: { boughtGPUs: gpuId } },
      { new: true }
    );

    if (!gpu) {
      return res.status(404).json({ message: "GPU not found." });
    }

    res.status(200).json({ message: "Auction closed successfully", gpu });
  } catch (err) {
    console.error("Error closing auction:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteGPU = async (req, res) => {
  try {
    const { gpuId } = req.params; // Get GPU ID from URL parameters
    const userId = req.user._id; // Get logged-in user's ID

    // Find the GPU by its ID
    const gpu = await GPU.findById(gpuId);

    if (!gpu) {
      return res.status(404).json({ message: "GPU not found" });
    }

    // Ensure that only the owner can delete their GPU
    if (gpu.owner.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this GPU" });
    }

    // Remove the GPU from the user's listedGPUs array
    await User.findByIdAndUpdate(userId, { $pull: { listedGPUs: gpuId } });

    // Delete the GPU from the database
    await GPU.findByIdAndDelete(gpuId);

    res.status(200).json({ message: "GPU deleted successfully" });
  } catch (error) {
    console.error("Error deleting GPU:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addGPU,
  fetchAllGPUs,
  updateGPU,
  fetchGPUById,
  closeAuction,
  deleteGPU,
};
