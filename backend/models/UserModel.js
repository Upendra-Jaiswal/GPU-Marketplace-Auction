const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    listedGPUs: [{ type: mongoose.Schema.Types.ObjectId, ref: "GPU" }], // One-to-Many (User → GPUs)
    boughtGPUs: [{ type: mongoose.Schema.Types.ObjectId, ref: "GPU" }], // One-to-Many (User → Bought GPUs - GPUs won in auction)
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }], // One-to-Many (User → Bids)
  },

  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const User = mongoose.model("User", userSchema);

// export default User;

module.exports = User;
