

import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Fallback: If frontend sends 'username' instead of 'email', map it automatically
    const email = body.email || body.username;
    const password = body.password;

    // 1. Validation check
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    // 2. Connect to MongoDB
    await connectToDatabase();

    // 3. Find the user using the clean email address
    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // 4. Compare the typed password with the hashed password in the DB
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // 5. Success!
    return NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}