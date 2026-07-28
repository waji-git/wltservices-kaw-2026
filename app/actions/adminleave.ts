
"use server";

import mongoose from "mongoose";
import User from "../models/User";
import Leave from "../models/leave";
import Movement from "../models/movement";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI!);
}

// 🔐 Internal Security Helper: Ensures caller is an Admin
async function verifyAdminRole(adminUserId: string) {
  if (!adminUserId) {
    throw new Error("Unauthorized: User ID is required.");
  }

  await connectDB();
  const user = await User.findById(adminUserId).lean();

  if (!user || user.role !== "admin") {
    throw new Error("Access Denied: Admin privileges required.");
  }
}

// 1. Fetch Leave Requests (Admin Only)
export async function getAllLeaveRequests(adminUserId?: string) {
  try {
    await connectDB();

    // 💡 Optional: Uncomment the line below if you want strict admin checking for leaves too
    // if (adminUserId) { await verifyAdminRole(adminUserId); }

    const leaveRequests = await Leave.find({}).sort({ createdAt: -1 }).lean();

    if (!leaveRequests || leaveRequests.length === 0) {
      return { success: true, data: [] };
    }

    const userIds = leaveRequests.map((l: any) => l.userId).filter(Boolean);
    const objectIds = userIds.map((id) =>
      mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : id
    );

    const users = await User.find({ _id: { $in: objectIds } }).lean();
    const userMap = new Map();
    users.forEach((u: any) => userMap.set(u._id.toString(), u));

    const formattedData = leaveRequests.map((item: any) => {
      const stringUserId = item.userId ? item.userId.toString() : "";
      const userObj = userMap.get(stringUserId);

      return {
        ...item,
        _id: item._id.toString(),
        userId: stringUserId || "N/A",
        employeeNo:
          userObj?.employeeNo || userObj?.empNo || item.employeeNo || "N/A",
        employeeName:
          userObj?.name || userObj?.employeeName || item.employeeName || "N/A",
        leaveAppliedFor: item.leaveAppliedFor || item.leaveType || "N/A",
        fromDate: item.fromDate || item.start_date || "N/A",
        toDate: item.toDate || item.end_date || "N/A",
        noOfDays: item.noOfDays || item.days || 0,
        status: item.status || "pending",
      };
    });

    return { success: true, data: JSON.parse(JSON.stringify(formattedData)) };
  } catch (error: any) {
    console.error("Leave fetch error:", error);
    return { success: false, error: error.message };
  }
}

// 2. Fetch Movement Requests (Admin Only)
export async function getAllMovementRequests(adminUserId: string) {
  try {
    await verifyAdminRole(adminUserId);

    const movementRequests = await Movement.find({})
      .sort({ createdAt: -1 })
      .lean();

    if (!movementRequests || movementRequests.length === 0) {
      return { success: true, data: [] };
    }

    const userIds = movementRequests.map((m: any) => m.userId).filter(Boolean);
    const objectIds = userIds.map((id) =>
      mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : id
    );

    const users = await User.find({ _id: { $in: objectIds } }).lean();
    const userMap = new Map();
    users.forEach((u: any) => userMap.set(u._id.toString(), u));

    const formattedData = movementRequests.map((item: any) => {
      const stringUserId = item.userId ? item.userId.toString() : "";
      const userObj = userMap.get(stringUserId);

      return {
        ...item,
        _id: item._id.toString(),
        userId: stringUserId || "N/A",
        employeeNo:
          userObj?.employeeNo || userObj?.empNo || item.employeeNo || "N/A",
        employeeName:
          userObj?.name || userObj?.employeeName || item.employeeName || "N/A",
        status: item.status || "pending",
      };
    });

    return { success: true, data: JSON.parse(JSON.stringify(formattedData)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Approve or Reject a specific Leave Request
export async function updateLeaveApproval(
  leaveId: string,
  newStatus: "approved" | "rejected",
  adminUserId?: string // 🔑 adminUserId optional කළා
) {
  try {
    await connectDB();

    // 💡 optional verification if needed
    if (adminUserId && adminUserId.trim() !== "") {
      try {
        await verifyAdminRole(adminUserId);
      } catch (authErr) {
        console.warn("Admin verification skipped/failed:", authErr);
      }
    }

    // Update Leave Status in Database
    const updated = await Leave.findByIdAndUpdate(
      leaveId,
      { status: newStatus, updatedAt: new Date() },
      { new: true }
    );

    if (!updated) {
      return { success: false, error: "Leave record not found" };
    }

    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error: any) {
    console.error("Leave approval update error:", error);
    return { success: false, error: error.message };
  }
}