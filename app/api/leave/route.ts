import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const uri = process.env.MONGODB_URI || "your_mongodb_connection_string_here";
const SECRET_KEY = "wlt_services_super_secure_key_2026_fixed";
const SECRET = new TextEncoder().encode(SECRET_KEY);

export async function POST(request: Request) {
  const client = new MongoClient(uri);
  try {
    // 1. Authenticate the user from the browser cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Please log in." },
        { status: 401 }
      );
    }

    // Decode JWT payload to grab the real userId
    const { payload } = await jwtVerify(token, SECRET);
    const userId = payload.userId as string;

    const body = await request.json();

    // Connect to the cluster
    await client.connect();
    const db = client.db("kawservices");
    const collection = db.collection("leave");

    const requestNo = `REQ-${Date.now()}`;

    // 2. Attach userId explicitly to the document
    const newLeaveRequest = {
      userId, // 🔑 CRITICAL FIX: Explicitly links this entry to the logged-in user
      requestNo,
      leaveAppliedFor: body.leaveAppliedFor, // Must match exactly (e.g., "Casual Leave", "Annual Leave", "Medical Leave")
      fromDate: body.fromDate,
      toDate: body.toDate,
      coveringOfficer: body.coveringOfficer,
      noOfDays: Number(body.noOfDays), // Keeps it as a number for the $sum stage
      purpose: body.purpose,
      remark: body.remark,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newLeaveRequest);

    return NextResponse.json(
      {
        success: true,
        message: "Leave request saved successfully!",
        requestNo,
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Leave creation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to save leave request.",
      },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}