import mongoose from "mongoose";

const MovementSchema = new mongoose.Schema(
  {
    source: { type: String, default: "Movement" },
    inDate: { type: String, required: true },
    inTime: { type: String, required: true },
    inLocation: { type: String, required: true },
    outDate: { type: String, required: true },
    outTime: { type: String, required: true },
    outLocation: { type: String, required: true },
    reasonCycle: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true,
  }
);

// FIX: Export the model directly instead of assigning it to 'const Movement' first
export default mongoose.models.Movement ||
  mongoose.model("Movement", MovementSchema, "movements");
