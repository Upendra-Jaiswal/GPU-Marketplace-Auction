const mongoose = require("mongoose");
const { Schema } = mongoose;

const BidSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    bidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to User (the bidder)
    gpu: { type: mongoose.Schema.Types.ObjectId, ref: "GPU", required: true }, // Reference to GPU being bid on
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    closed: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["active", "won", "lost"],
      default: "active", // Tracks whether the bid is still active, won, or lost
    },

    // Optional: track when the bid was placed
    placedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Bid = mongoose.model("Bid", BidSchema);
module.exports = Bid;
