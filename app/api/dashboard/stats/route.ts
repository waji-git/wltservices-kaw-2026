import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const uri = process.env.MONGODB_URI || "your_mongodb_connection_string_here";
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
    // 1. Authenticate user via JWT cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Please log in." },
        { status: 401 }
      );
    }

    const { payload } = await jwtVerify(token, SECRET);
    const userId = payload.userId as string;

    await client.connect();
    const db = client.db("kawservices");

    // 2. Fetch User Profile
    const usersCollection = db.collection("users");
    let userDoc = null;
    try {
      userDoc = await usersCollection.findOne({ _id: new ObjectId(userId) });
    } catch {
      userDoc = await usersCollection.findOne({ userId: userId });
    }

    // 3. Aggregate Leave Balances (Using your exact leave calculation logic)
    const leaveCollection = db.collection("leave");
    const takenLeaves = await leaveCollection
      .aggregate([
        { $match: { userId: userId } },
        {
          $group: {
            _id: "$leaveAppliedFor",
            totalDaysTaken: { $sum: "$noOfDays" },
          },
        },
      ])
      .toArray();

    const takenMap: Record<string, number> = {};
    takenLeaves.forEach((item) => {
      if (item._id) {
        takenMap[item._id] = item.totalDaysTaken;
      }
    });

    const casualTotal = INITIAL_LEAVE_ALLOWANCE["Casual Leave"];
    const casualUsed = takenMap["Casual Leave"] || 0;
    const casualBalance = casualTotal - casualUsed;

    const annualTotal = INITIAL_LEAVE_ALLOWANCE["Annual Leave"];
    const annualUsed = takenMap["Annual Leave"] || 0;
    const annualBalance = annualTotal - annualUsed;

    const medicalTotal = INITIAL_LEAVE_ALLOWANCE["Medical Leave"];
    const medicalUsed = takenMap["Medical Leave"] || 0;
    const medicalBalance = medicalTotal - medicalUsed;

    const leaveBalances = [
      {
        title: "Casual Leave",
        used: casualUsed,
        total: casualTotal,
        balance: casualBalance,
        color: "text-blue-500",
      },
      {
        title: "Annual Leave",
        used: annualUsed,
        total: annualTotal,
        balance: annualBalance,
        color: "text-blue-600",
      },
      {
        title: "Medical Leave",
        used: medicalUsed,
        total: medicalTotal,
        balance: medicalBalance,
        color: "text-emerald-500",
      },
    ];

    // 4. Fetch additional dynamic stats (Attendance & Requests)
    const attendanceCollection = db.collection("attendance");
    const daysPresent =
      (await attendanceCollection.countDocuments({
        userId: userId,
        status: "Present",
      })) || 11;

    const workRequestsCollection = db.collection("workRequests");
    const requestsWaiting =
      (await workRequestsCollection.countDocuments({
        userId: userId,
        status: "Pending",
      })) || 1;

    const dashboardData = {
      success: true,
      user: {
        name:
          userDoc?.name ||
          (payload.name as string) ||
          "K. A. Kelambi Arachchige",
        initial: ((userDoc?.name || payload.name || "K") as string)
          .charAt(0)
          .toUpperCase(),
        designation: userDoc?.designation || "Technical Officer",
        department: userDoc?.department || "SI, Software",
      },
      stats: {
        casualLeaveLeft: casualBalance,
        casualLeaveTotal: casualTotal,
        daysPresent: daysPresent,
        workingDaysOctober: 18,
        overtimeApproved: "0h",
        overtimePending: "0h waiting for approval",
        requestsWaiting: requestsWaiting,
      },
      leaveBalances,
    };

    return NextResponse.json(dashboardData, { status: 200 });
  } catch (error: any) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch dashboard data.",
      },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
