
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

    // 3. Find user by NAME instead of email
    const user = await User.findOne({ name });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid name or password." },
        { status: 401 }
      );
    }

    // 4. Check if the password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid name or password." },
        { status: 401 }
      );
    }

    const secretKey = "wlt_services_super_secure_key_2026_fixed";
    const secret = new TextEncoder().encode(secretKey);

    const token = await new SignJWT({ userId: user._id.toString() })
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

// Look at the bottom of your app/api/auth/login/route.ts file where response.cookies.set is called:
