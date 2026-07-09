import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "your_mongodb_connection_string_here";
const client = new MongoClient(uri);

// Base standard allowances
const INITIAL_LEAVE_ALLOWANCE = {
  "Casual Leave": 7,
  "Annual Leave": 14,
  "Medical Leave": 14,
};

export async function GET() {
  try {
    await client.connect();
    const db = client.db("kawservices");
    const collection = db.collection("leave");

    // Aggregate total days taken per leave category
    const takenLeaves = await collection
      .aggregate([
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

    // Calculate remaining balances dynamically
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
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch balances." },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
