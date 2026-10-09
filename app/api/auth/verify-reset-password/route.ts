// app/api/auth/verify-reset-password/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/app/models/User";

export async function POST(req: Request) {
  try {
    const { employeeNo, otp, newPassword } = await req.json();

    if (!employeeNo || !otp || !newPassword) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    await dbConnect();
    const user = await User.findOne({ employeeNo });

    if (!user || user.otp !== otp) {
      return NextResponse.json(
        { message: "Invalid OTP code." },
        { status: 400 }
      );
    }

    // Check OTP Expiry
    if (new Date() > new Date(user.otpExpiresAt)) {
      return NextResponse.json(
        { message: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Hash New Password and Clear OTP Fields
    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error during password reset." },
      { status: 500 }
    );
  }
}
