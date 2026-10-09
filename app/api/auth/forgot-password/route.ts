// app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // or your hashing library
import dbConnect from "@/lib/db"; // your MongoDB connection helper
import User from "@/app/models/User"; // your User Mongoose model

export async function POST(req: Request) {
  try {
    const { name, employeeNo, newPassword } = await req.json();

    if (!name || !employeeNo || !newPassword) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    await dbConnect();

    // Verify user identity using Name and Employee Number
    const user = await User.findOne({ name, employeeNo });

    if (!user) {
      return NextResponse.json(
        { message: "User not found with provided credentials." },
        { status: 444 }
      );
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: "Password updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error occurred during password reset." },
      { status: 500 }
    );
  }
}
