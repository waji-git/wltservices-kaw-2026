"use server";

import mongoose from "mongoose";
import Movement from "../models/movement";
import User from "../models/User"; // Adjust this relative path to match your User model location

// Connect to MongoDB helper
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI!);
}

// 1. Get ALL user movements for admin review (with Employee Details)
export async function getAllUserMovements() {
  try {
    await connectDB();

    // Fetch movements
    const movements = await Movement.find({}).sort({ createdAt: -1 }).lean();

    // Fetch all user details referenced in these movements
    const userIds = movements.map((m: any) => m.userId).filter(Boolean);
    const users = await User.find({ _id: { $in: userIds } }).lean();

    // Create a fast lookup map for Users
    const userMap = new Map();
    users.forEach((u: any) => {
      userMap.set(u._id.toString(), u);
    });

    // Merge User details into each movement record
    const formattedData = movements.map((item: any) => {
      const stringUserId = item.userId ? item.userId.toString() : "";
      const userObj = userMap.get(stringUserId);

      return {
        ...item,
        _id: item._id.toString(),
        userId: stringUserId || "N/A",
        // Extract employee number and name from the matched user object
        employeeNo:
          userObj?.employeeNo ||
          userObj?.empNo ||
          item.employeeNo ||
          item.empNo ||
          "N/A",
        employeeName:
          userObj?.name || userObj?.employeeName || item.employeeName || "N/A",
      };
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(formattedData)),
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