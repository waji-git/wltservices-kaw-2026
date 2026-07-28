

"use client";

import { useEffect, useState } from "react";
import {
  getAllLeaveRequests,
  updateLeaveApproval,
} from "@/app/actions/adminleave";

export default function AdminLeavePage() {
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await getAllLeaveRequests();
        if (res.success) {
          setLeaveRequests(res.data || []);
        } else {
          setError(res.error || "Failed to fetch leave requests.");
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // 🔑 Simplified Action Handler
  const handleAction = async (
    leaveId: string,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      // localStorage එකෙන් ID එක ගන්න බලයි, නැතත් backend එකට null/empty යවයි
      const adminUserId =
        localStorage.getItem("userId") ||
        localStorage.getItem("adminUserId") ||
        "";

      const res = await updateLeaveApproval(leaveId, newStatus, adminUserId);

      if (res.success) {
        // Local State එක Update කර UI එක Instant Refresh කිරීම
        setLeaveRequests((prev) =>
          prev.map((item) =>
            item._id === leaveId ? { ...item, status: newStatus } : item
          )
        );
      } else {
        alert(`Error: ${res.error}`);
      }
    } catch (err: any) {
      alert(`Action failed: ${err.message}`);
    }
  };

  if (loading)
    return (
      <div className="p-8 text-center text-gray-600 font-medium">
        Loading Leave Requests...
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Error: {error}
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-1 text-gray-800">
        Leave Approval Panel
      </h1>
      <p className="text-gray-600 mb-6">
        Review, approve, or reject leave requests submitted by employees.
      </p>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white text-sm">
              <th className="p-3">User ID</th>
              <th className="p-3">Emp No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Leave Type</th>
              <th className="p-3">From Date</th>
              <th className="p-3">To Date</th>
              <th className="p-3">Days</th>
              <th className="p-3">Purpose</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {leaveRequests.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="p-4 text-center text-gray-500 font-medium"
                >
                  No leave requests found.
                </td>
              </tr>
            ) : (
              leaveRequests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50">
                  <td className="p-3 font-mono text-xs text-gray-600">
                    {req.userId}
                  </td>
                  <td className="p-3 font-medium">{req.employeeNo || "N/A"}</td>
                  <td className="p-3">{req.employeeName || "N/A"}</td>
                  <td className="p-3">{req.leaveAppliedFor}</td>
                  <td className="p-3">{req.fromDate}</td>
                  <td className="p-3">{req.toDate}</td>
                  <td className="p-3">{req.noOfDays}</td>
                  <td className="p-3">{req.purpose}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold text-white uppercase ${
                        req.status === "approved"
                          ? "bg-green-600"
                          : req.status === "rejected"
                          ? "bg-red-600"
                          : "bg-amber-500"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleAction(req._id, "approved")}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs font-semibold transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(req._id, "rejected")}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs font-semibold transition-colors"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}