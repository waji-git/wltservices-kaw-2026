

"use strict";
"use server";

import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Movement from "@/app/models/movement";
import { revalidatePath } from "next/cache";

export async function addMovement(formData: FormData) {
  try {
    await connectDB();

    // 1. Check if an ID exists in the form (indicates an EDIT operation)
    const id = formData.get("id");

    const movementData = {
      inDate: formData.get("inDate"),
      inTime: formData.get("inTime"),
      inLocation: formData.get("inLocation"),
      outDate: formData.get("outDate"),
      outTime: formData.get("outTime"),
      outLocation: formData.get("outLocation"),
      reasonCycle: formData.get("reasonCycle"),
    };

    if (id) {
      // 2. EDIT MODE: Update the existing document by its ID
      await Movement.findByIdAndUpdate(
        id,
        { $set: movementData },
        { runValidators: true } // Ensures schema validation rules apply to updates
      );
    } else {
      // 3. CREATE MODE: Add a brand new row if no ID is passed
      const newMovement = new Movement({
        ...movementData,
        status: "pending", // Only default to pending for brand-new items
      });
      await newMovement.save();
    }

    // Revalidate the path to refresh the UI
    revalidatePath("/dashboard/movement");

    return {
      success: true,
      message: id
        ? "Movement entry updated successfully!"
        : "Movement entry saved successfully!",
    };
  } catch (error: any) {
    console.error("Database operation error:", error);
    return {
      success: false,
      error: error.message || "Failed to process entry.",
    };
  }
}

export async function getMovements() {
  try {
    await connectDB();

    const data = await Movement.find({}).lean();

    const formattedData = data.map((item: any) => ({
      id: item._id.toString(),
      inDate: item.inDate,
      inTime: item.inTime,
      inLocation: item.inLocation,
      outDate: item.outDate,
      outTime: item.outTime,
      outLocation: item.outLocation,
      reason: item.reasonCycle,
      status: item.status || "pending",
      action: "Read-only",
    }));

    return { success: true, data: formattedData };
  } catch (error: any) {
    console.error("Fetch Error:", error);
    return { success: false, error: error.message, data: [] };
  }
}

// ===================================================
// ADDED: EXPORTED FUNCTION TO DELETE FROM DATABASE
// ===================================================
export async function deleteMovement(id: string) {
  try {
    await connectDB();

    if (!id) {
      return { success: false, error: "No document ID provided for deletion." };
    }

    // Deletes the matching row permanently from MongoDB using its ID
    const deletedItem = await Movement.findByIdAndDelete(id);

    if (!deletedItem) {
      return { success: false, error: "Document not found in the database." };
    }

    // Refresh Next.js layout data cache
    revalidatePath("/dashboard/movement");

    return {
      success: true,
      message: "Movement permanently deleted from database.",
    };
  } catch (error: any) {
    console.error("Database delete error:", error);
    return {
      success: false,
      error: error.message || "Failed to delete database entry.",
    };
  }
}