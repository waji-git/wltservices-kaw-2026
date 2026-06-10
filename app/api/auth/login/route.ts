import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // ⚠️ REPLACE THIS MOCK VALIDATION WITH YOUR DATABASE OR REVENUE API LOGIC
    if (username === "admin" && password === "password123") {
      return NextResponse.json({
        success: true,
        message: "Authentication successful",
      });
    }

    // Return an error if credentials don't match
    return NextResponse.json(
      { success: false, message: "Invalid username or password." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
