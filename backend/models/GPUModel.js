const mongoose = require("mongoose");
const { Schema } = mongoose;

const GPUSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    model: { type: String, required: true },

    price: {
      type: Number,
      required: true, // Ensures the price is required
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to User (owner)
    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available", // Tracks whether GPU is for auction, auctioned, or sold
    },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the user who won the auction (if auctioned)
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }], // One-to-Many (GPU → Bids)
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const GPU = mongoose.model("GPU", GPUSchema);
module.exports = GPU;
