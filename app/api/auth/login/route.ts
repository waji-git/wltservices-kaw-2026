

const typedPassword = "password"; // What the user enters in the login form
const databaseHash =
  "$2b$10$2ZxtiVAVbYSE.dnsxtwV/OVjQ6hWfheH5bGVqjqHKGM9AmarUH6/K";

const isMatch = await bcrypt.compare(typedPassword, databaseHash);

if (isMatch) {
  console.log("Password is correct!");
} else {
  console.log("Wrong password!");
}

import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose"; // Using jose for Next.js cookie creation

export async function POST(request: Request) {
  try {
    const { name, password } = await request.json();

    // 1. Validate that Name and Password are provided
    if (!name || !password) {
      return NextResponse.json(
        { success: false, message: "Name and password are required." },
        { status: 400 }
      );
    }

    // 2. Connect to MongoDB
    await connectToDatabase();

    // 3. Find user by NAME instead of email inside 'register' collection
    const foundUserByName = await User.findOne({ name }).lean();

    // 🚨 SAFETY CHECK: Stop right here if no user profile was found or password field is missing
    if (!foundUserByName || !foundUserByName.password) {
      return NextResponse.json(
        { success: false, message: "Invalid name or password." },
        { status: 401 }
      );
    }

    // 4. Check if the password matches using the matched variable
    const isPasswordMatch = await bcrypt.compare(
      password,
      foundUserByName.password
    );
    if (!isPasswordMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid name or password." },
        { status: 401 }
      );
    }

    const secretKey = "wlt_services_super_secure_key_2026_fixed";
    const secret = new TextEncoder().encode(secretKey);

    // 5. Generate token using the correct variable id mapping
    const token = await new SignJWT({ userId: foundUserByName._id.toString() })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(secret);

    // 6. Return response and save the token into an HTTP-only cookie
    const response = NextResponse.json(
      { success: true, message: "Login successful!" },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true, // Prevents client-side scripts from stealing the token
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day expiration
    });

    return response;
  } catch (error: any) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error during login." },
      { status: 500 }
    );
  }
}
