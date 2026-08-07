"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import connectDB from "@/lib/db";
import PersonalModel, { IPersonal } from "@/app/models/Personal";
import User from "@/app/models/User";

export interface PersonalDetails {
  employeeNo: string;
  surname: string;
  fullName: string;
  nicNo: string;
  dateOfBirth: string;
  gender?: string;
  maritalStatus?: string;
  civilStatus?: string;
  address?: string;
  mobileNo?: string;
  email?: string;
}

// Helper to decode user details from your custom token cookie
async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const secretKey =
      process.env.JWT_SECRET || "wlt_services_super_secure_key_2026_fixed";
    const secret = new TextEncoder().encode(secretKey);
    const { payload } = await jwtVerify(token, secret);

    // Fetch employeeNo from User collection if not directly inside payload
    await connectDB();
    const dbUser = await User.findById(payload.userId).lean();
    return dbUser
      ? { userId: payload.userId, employeeNo: dbUser.employeeNo }
      : null;
  } catch (error) {
    return null;
  }
}

export async function getPersonalDetails() {
  try {
    const user = await getAuthUser();
    if (!user || !user.employeeNo) {
      return {
        success: false,
        error: "Unauthorized or missing Employee Number",
      };
    }

    await connectDB();
    const doc = await PersonalModel.findOne({
      employeeNo: user.employeeNo,
    }).lean<IPersonal>();

    return {
      success: true,
      employeeNo: user.employeeNo,
      data: doc
        ? {
            employeeNo: doc.employeeNo || user.employeeNo,
            surname: doc.surname || "",
            fullName: doc.fullName || "",
            nicNo: doc.nicNo || "",
            dateOfBirth: doc.dateOfBirth || "",
            gender: doc.gender || "",
            maritalStatus: doc.maritalStatus || "",
            civilStatus: doc.civilStatus || "",
            address: doc.address || "",
            mobileNo: doc.mobileNo || "",
            email: doc.email || "",
          }
        : null,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to load details",
    };
  }
}

export async function savePersonalDetails(details: PersonalDetails) {
  try {
    const user = await getAuthUser();
    if (!user || !user.employeeNo) {
      return { success: false, error: "Unauthorized user" };
    }

    await connectDB();
    await PersonalModel.findOneAndUpdate(
      { employeeNo: user.employeeNo },
      { $set: { ...details, employeeNo: user.employeeNo } },
      { upsert: true, new: true }
    );

    revalidatePath("/dashboard/personal-details");
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to save details",
    };
  }
}
