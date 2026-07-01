import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    
    const { name, email, password } = await request.json();
    // 1. Basic validation check
      
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    // 2. Connect to MongoDB
    await connectToDatabase();

    // 3. Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email is already registered." },
        { status: 400 }
      );
    }

    // 4. Encrypt/Hash the password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Create and save the new user document to MongoDB
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully!",
        userId: newUser._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("MongoDB Registration Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error during registration." },
      { status: 500 }
    );
  }
}
