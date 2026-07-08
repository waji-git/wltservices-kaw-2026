
import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Next.js 15 requires this to be awaited
import connectToDatabase from "@/lib/db";
import User from "@/app/models/User";
import { jwtVerify } from "jose";

export async function GET() {
  try {
    await connectToDatabase();

    // 🔥 FIX: Await cookies() in Next.js 15
    const cookieStore = await cookies(); 
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ name: "Guest User" }, { status: 401 });
    }

    const secretKey = "wlt_services_super_secure_key_2026_fixed";
    const secret = new TextEncoder().encode(secretKey);
    
    const { payload } = await jwtVerify(token, secret);

    if (!payload || !payload.userId) {
      return NextResponse.json({ name: "Guest User" }, { status: 401 });
    }

    const currentUser = await User.findById(payload.userId).select("name");

    if (!currentUser) {
      return NextResponse.json({ name: "Guest User" }, { status: 404 });
    }

    // Success! Return the dynamic name to the dashboard
    return NextResponse.json({ name: currentUser.name });

  } catch (error: any) {
    console.error("Session fetch error:", error.message || error);
    return NextResponse.json({ name: "Guest User" }, { status: 401 });
  }
}