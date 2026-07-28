import mongoose, { Schema, models, model } from "mongoose";

const LeaveSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Links to your User model
      required: true,
    },
    requestNo: {
      type: String,
      required: true,
      unique: true,
    },
    leaveAppliedFor: {
      type: String,
      required: true,
    },
    fromDate: {
      type: String,
      required: true,
    },
    toDate: {
      type: String,
      required: true,
    },
    coveringOfficer: {
      type: String,
      default: "",
    },
    noOfDays: {
      type: Number,
      required: true,
    },
    purpose: {
      type: String,
      default: "",
    },
    remark: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Prevent overwrite model error during Next.js hot reloads
const Leave = models.Leave || model("Leave", LeaveSchema, "leave");

export default Leave;
