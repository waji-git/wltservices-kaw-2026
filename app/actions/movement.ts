
"use strict";
"use server";

import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Movement from "@/app/models/movement";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { jwtVerify } from "jose"; // 👈 Import jwtVerify to unpack your cookie payload

const SECRET_KEY = "wlt_services_super_secure_key_2026_fixed";
const SECRET = new TextEncoder().encode(SECRET_KEY);

// Helper function to extract the true userId from the HTTP-only cookie
async function getCustomSessionUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // Reads the cookie named "token"

  if (!token) return null;

  try {
    // Verify and decode the JWT payload using jose
    const { payload } = await jwtVerify(token, SECRET);
    return payload.userId as string; // 👈 Extracts the raw userId string safely!
  } catch (error) {
    console.error("JWT validation error in actions:", error);
    return null;
  }
}

export async function addMovement(formData: FormData) {
  try {
    await connectDB();

    // 1. Authenticate and retrieve the explicit userId
    const userId = await getCustomSessionUserId();
    if (!userId) {
      return { success: false, error: "Unauthorized: Please log in." };
    }

    const id = formData.get("id");

    const movementData = {
      userId: userId, // Bind entry explicitly to this user's object ID
      inDate: formData.get("inDate"),
      inTime: formData.get("inTime"),
      inLocation: formData.get("inLocation"),
      outDate: formData.get("outDate"),
      outTime: formData.get("outTime"),
      outLocation: formData.get("outLocation"),
      reasonCycle: formData.get("reasonCycle"),
    };

    if (id) {
      // 2. EDIT MODE: Match both document ID and userId
      const updatedDoc = await Movement.findOneAndUpdate(
        { _id: id, userId: userId },
        { $set: movementData },
        { runValidators: true, new: true }
      );

      if (!updatedDoc) {
        return { success: false, error: "Record not found or unauthorized." };
      }
    } else {
      // 3. CREATE MODE: Add a new row
      const newMovement = new Movement({
        ...movementData,
        status: "pending",
      });
      await newMovement.save();
    }

    revalidatePath("/dashboard/movement");
    return { success: true, message: "Movement saved successfully!" };
  } catch (error: any) {
    console.error("Database operation error:", error);
    return { success: false, error: error.message };
  }
}

export async function getMovements() {
  try {
    await connectDB();

    const userId = await getCustomSessionUserId();
    if (!userId) {
      return { success: false, error: "Unauthorized", data: [] };
    }

    // 2. Query documents matching ONLY this verified userId
    const data = await Movement.find({ userId: userId }).lean();

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
    return { success: false, error: error.message, data: [] };
  }
}

export async function deleteMovement(id: string) {
  try {
    await connectDB();

    const userId = await getCustomSessionUserId();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const deletedDoc = await Movement.findOneAndDelete({
      _id: id,
      userId: userId,
    });

    if (!deletedDoc) {
      return { success: false, error: "Record not found or unauthorized." };
    }

    revalidatePath("/dashboard/movement");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}