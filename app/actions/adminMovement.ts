"use server";

import mongoose from "mongoose";           
import Movement from "../models/movement";

// Connect to MongoDB helper
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI!);
}

// 1. Get ALL user movements for admin review
export async function getAllUserMovements() {
  try {
    await connectDB();
    const movements = await Movement.find({}).sort({ createdAt: -1 });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(movements)),
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 2. Approve or Reject a specific movement
export async function updateMovementApproval(
  id: string,
  newStatus: "approved" | "rejected"
) {
  try {
    await connectDB();

    const updated = await Movement.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

    if (!updated) {
      return { success: false, error: "Record not found" };
    }

    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
