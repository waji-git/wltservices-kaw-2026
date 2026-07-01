
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// Ensure your MongoDB Connection String is in your .env.local file
const uri = process.env.MONGODB_URI || "your_mongodb_connection_string_here";
const client = new MongoClient(uri);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Connect to the cluster
    await client.connect();

    // Target the 'kawservices' database and 'leave' collection
    const db = client.db("kawservices");
    const collection = db.collection("leave");

    // Generate a simple auto-filled request number format (e.g., REQ-1719312345)
    const requestNo = `REQ-${Date.now()}`;

    const newLeaveRequest = {
      requestNo,
      leaveAppliedFor: body.leaveAppliedFor,
      fromDate: body.fromDate,
      toDate: body.toDate,
      coveringOfficer: body.coveringOfficer,
      noOfDays: Number(body.noOfDays),
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