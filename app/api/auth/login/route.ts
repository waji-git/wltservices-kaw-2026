
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(request: Request) {
  try {
    const { name, password } = await request.json();

    // 1. Validate input
    if (!name || !password) {
      return NextResponse.json(
        { success: false, message: "Name and password are required." },
        { status: 400 }
      );
    }

    // 2. Connect to MongoDB
    await connectToDatabase();

    // 3. Find user
    const foundUserByName = await User.findOne({ name }).lean();

    if (!foundUserByName || !foundUserByName.password) {
      return NextResponse.json(
        { success: false, message: "Invalid name or password." },
        { status: 401 }
      );
    }

    // 4. Compare passwords
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

    // 🔑 Determine Role (Defaults to 'employee' if not specified in DB)
    const userRole = foundUserByName.role || "employee";

    const secretKey =
      process.env.JWT_SECRET || "wlt_services_super_secure_key_2026_fixed";
    const secret = new TextEncoder().encode(secretKey);

    // 5. Generate token containing BOTH userId and role
    const token = await new SignJWT({
      userId: foundUserByName._id.toString(),
      role: userRole,
      name: foundUserByName.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(secret);

    // 6. Send role in JSON response for client-side redirection
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful!",
        role: userRole, // 👈 Required for frontend routing
      },
      { status: 200 }
    );

    // Save token in HTTP-only cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
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