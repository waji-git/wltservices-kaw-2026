
// "use strict";
// "use server";

// import mongoose from "mongoose";
// import connectDB from "@/lib/db"; //
// import Movement from "@/app/models/movement";
// import { revalidatePath } from "next/cache";

// export async function addMovement(formData: FormData) {
//   try {
//     await connectDB(); // Ensure DB is connected using your utility

//     // Extract fields securely from UI form inputs
//     const movementData = {
//       inDate: formData.get("inDate"),
//       inTime: formData.get("inTime"),
//       inLocation: formData.get("inLocation"),
//       outDate: formData.get("outDate"),
//       outTime: formData.get("outTime"),
//       outLocation: formData.get("outLocation"),
//       reasonCycle: formData.get("reasonCycle"),
//       status: "pending",
//     };

//     // Create and save to MongoDB
//     const newMovement = new Movement(movementData);
//     await newMovement.save();

//     // Revalidate the path to clear Next.js caches
//     revalidatePath("/dashboard/movement");

//     return { success: true, message: "Movement entry saved successfully!" };
//   } catch (error: any) {
//     console.error("Database insertion error:", error);
//     return { success: false, error: error.message || "Failed to save entry." };
//   }
// }

// export async function getMovements() {
//   try {
//     // FIX: Use your dedicated connection helper here too!
//     await connectDB();

//     // Fetch records from MongoDB and turn them into plain JavaScript objects
//     const data = await Movement.find({}).lean();

//     // Map MongoDB objects into clean, plain JSON objects for the Client Component
//     const formattedData = data.map((item: any) => ({
//       id: item._id.toString(), // Safely stringifies MongoDB ObjectId
//       inDate: item.inDate,
//       inTime: item.inTime,
//       inLocation: item.inLocation,
//       outDate: item.outDate,
//       outTime: item.outTime,
//       outLocation: item.outLocation,
//       reason: item.reasonCycle, // Maps schema key back to UI key
//       status: item.status || "pending",
//       action: "Read-only",
//     }));

//     return { success: true, data: formattedData };
//   } catch (error: any) {
//     console.error("Fetch Error:", error);
//     return { success: false, error: error.message, data: [] };
//   }
// }


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