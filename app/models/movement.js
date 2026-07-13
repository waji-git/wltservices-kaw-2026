
  import mongoose from "mongoose";

const MovementSchema = new mongoose.Schema(
  {
    // 🔑 Changed from userEmail to userId to match your JWT payload structure
    userId: { type: String, required: true },

    source: { type: String, default: "Movement" },
    inDate: { type: String, required: true },
    inTime: { type: String, required: true },
    inLocation: { type: String, required: true },
    outDate: { type: String, required: true },
    outTime: { type: String, required: true },
    outLocation: { type: String, required: true },
    reasonCycle: { type: String, required: true },
    status: { type: String, default: "pending" }, // Default status is "pending"
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Movement ||
  mongoose.model("Movement", MovementSchema, "movements");


  // 