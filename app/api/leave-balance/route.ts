
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const uri = process.env.MONGODB_URI || "your_mongodb_connection_string_here";

// Use a shared client context strategy or connect each instance carefully
const SECRET_KEY = "wlt_services_super_secure_key_2026_fixed";
const SECRET = new TextEncoder().encode(SECRET_KEY);

const INITIAL_LEAVE_ALLOWANCE = {
  "Casual Leave": 7,
  "Annual Leave": 14,
  "Medical Leave": 14,
};

export async function GET() {
  const client = new MongoClient(uri);
  try {
    // 1. Unpack the user identity token securely from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Please log in." },
        { status: 401 }
      );
    }

    // Decode JWT payload to match documents against the real user
    const { payload } = await jwtVerify(token, SECRET);
    const userId = payload.userId as string;

    await client.connect();
    const db = client.db("kawservices");
    const collection = db.collection("leave");

    // 2. Aggregate total days taken filtering explicitly by THIS user
    const takenLeaves = await collection
      .aggregate([
        {
          // 🔑 CRITICAL FIX: Isolates calculation data strictly to the logged-in user
          $match: { userId: userId },
        },
        {
          $group: {
            _id: "$leaveAppliedFor",
            totalDaysTaken: { $sum: "$noOfDays" },
          },
        },
      ])
      .toArray();

    // Map aggregated results to lookup object
    const takenMap: Record<string, number> = {};
    takenLeaves.forEach((item) => {
      if (item._id) {
        takenMap[item._id] = item.totalDaysTaken;
      }
    });

    // Calculate remaining balances dynamically user by user
    const leaveBalances = [
      {
        type: "Casual",
        balance:
          INITIAL_LEAVE_ALLOWANCE["Casual Leave"] -
          (takenMap["Casual Leave"] || 0),
      },
      {
        type: "Annual",
        balance:
          INITIAL_LEAVE_ALLOWANCE["Annual Leave"] -
          (takenMap["Annual Leave"] || 0),
      },
      {
        type: "Medical",
        balance:
          INITIAL_LEAVE_ALLOWANCE["Medical Leave"] -
          (takenMap["Medical Leave"] || 0),
      },
    ];

    return NextResponse.json(
      { success: true, balances: leaveBalances },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Leave Balance Aggregation Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch balances." },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}