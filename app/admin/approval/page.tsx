
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User, Calendar, Briefcase, ShieldAlert } from "lucide-react";
import {
  getAllLeaveRequests,
  updateLeaveApproval,
  getAllMovementRequests,
  // updateMovementApproval, // Ensure this is commented or removed if not exported
} from "@/app/actions/adminleave";

export default function AdminApprovalPage() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"leave" | "movement">("leave");
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [actionType, setActionType] = useState<"approved" | "rejected">(
    "approved"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Read stored user / auth state
  useEffect(() => {
    const userStr = localStorage.getItem("user"); // Adjust depending on your auth mechanism (Cookies / NextAuth / Session)
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        setCurrentUser(userObj);
      } catch (err) {
        console.error("Failed to parse user session", err);
      }
    }
  }, []);

  const loadData = useCallback(async () => {
    if (!currentUser?._id) return;

    setIsLoading(true);
    setRequests([]);

    let res;
    if (activeTab === "leave") {
      res = await getAllLeaveRequests(currentUser._id);
    } else {
      res = await getAllMovementRequests(currentUser._id);
    }

    if (res.success && res.data) {
      setRequests(res.data);
    } else {
      alert(`Error: ${res.error}`);
    }
    setIsLoading(false);
  }, [activeTab, currentUser]);

  useEffect(() => {
    if (currentUser) {
      loadData();
    }
  }, [currentUser, loadData]);

  const openConfirmationModal = (row: any, type: "approved" | "rejected") => {
    setSelectedRow(row);
    setActionType(type);
  };

  const handleStatusChange = async () => {
    if (!selectedRow || !currentUser?._id) return;
    setIsSubmitting(true);

    let res;
    if (activeTab === "leave") {
      res = await updateLeaveApproval(
        selectedRow._id,
        actionType,
        currentUser._id
      );
    } else {
      // Handle the case where updateMovementApproval is not available
      console.error("updateMovementApproval is not exported from adminleave module.");
      res = { success: false, error: "updateMovementApproval not implemented" };
    }

    if (res.success) {
      setSelectedRow(null);
      await loadData();
    } else {
      alert(`❌ Action Failed: ${res.error}`);
    }
    setIsSubmitting(false);
  };

  // Block Non-Admin Users
  if (currentUser && currentUser.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Access Restricted</h1>
        <p className="text-gray-600 mt-2 text-sm max-w-md">
          You do not have permission to view this panel. Only Admin users can
          approve or reject leave and movement requests.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-6 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition text-sm"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto relative">
      {/* Header Bar */}
      <div className="border-b pb-3 mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Admin Approval Panel
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Review, approve, or reject employee leave and movement applications.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full uppercase">
            Admin Mode
          </span>
          <button
            onClick={() => router.push("/")}
            className="p-1.5 hover:bg-gray-100 rounded-full transition"
            title="Profile"
          >
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 mb-4 border-b">
        <button
          onClick={() => setActiveTab("leave")}
          className={`flex items-center space-x-2 px-4 py-2 font-bold text-sm border-b-2 transition ${
            activeTab === "leave"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Leave Requests</span>
        </button>
        <button
          onClick={() => setActiveTab("movement")}
          className={`flex items-center space-x-2 px-4 py-2 font-bold text-sm border-b-2 transition ${
            activeTab === "movement"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Movement Requests</span>
        </button>
      </div>

      {/* Data Table Container */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white font-bold">
              <th className="p-3 border-r border-gray-700">Req No</th>
              <th className="p-3 border-r border-gray-700">Emp No</th>
              <th className="p-3 border-r border-gray-700">Name</th>
              {activeTab === "leave" ? (
                <>
                  <th className="p-3 border-r border-gray-700">Leave Type</th>
                  <th className="p-3 border-r border-gray-700">Dates</th>
                  <th className="p-3 border-r border-gray-700">Days</th>
                  <th className="p-3 border-r border-gray-700">
                    Covering Officer
                  </th>
                  <th className="p-3 border-r border-gray-700">Purpose</th>
                </>
              ) : (
                <>
                  <th className="p-3 border-r border-gray-700">Location</th>
                  <th className="p-3 border-r border-gray-700">Out Time</th>
                  <th className="p-3 border-r border-gray-700">In Time</th>
                  <th className="p-3 border-r border-gray-700">Reason</th>
                </>
              )}
              <th className="p-3 border-r border-gray-700">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={10} className="p-4 text-center text-gray-500">
                  Loading {activeTab} requests...
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan={10} className="p-4 text-center text-gray-500">
                  No {activeTab} requests found.
                </td>
              </tr>
            ) : (
              requests.map((row) => (
                <tr key={row._id} className="hover:bg-gray-50 font-medium">
                  <td className="p-3 border-r font-bold">{row.requestNo}</td>
                  <td className="p-3 border-r">{row.employeeNo}</td>
                  <td className="p-3 border-r">{row.employeeName}</td>

                  {activeTab === "leave" ? (
                    <>
                      <td className="p-3 border-r">{row.leaveAppliedFor}</td>
                      <td className="p-3 border-r">
                        {row.fromDate} to {row.toDate}
                      </td>
                      <td className="p-3 border-r font-bold">{row.noOfDays}</td>
                      <td className="p-3 border-r">
                        {row.coveringOfficer || "N/A"}
                      </td>
                      <td className="p-3 border-r">{row.purpose}</td>
                    </>
                  ) : (
                    <>
                      <td className="p-3 border-r">{row.location}</td>
                      <td className="p-3 border-r">{row.outTime}</td>
                      <td className="p-3 border-r">{row.inTime}</td>
                      <td className="p-3 border-r">{row.reason}</td>
                    </>
                  )}

                  <td className="p-3 border-r">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase ${
                        row.status === "approved"
                          ? "bg-emerald-600"
                          : row.status === "rejected"
                          ? "bg-red-600"
                          : "bg-amber-500"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openConfirmationModal(row, "approved")}
                        disabled={row.status === "approved"}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                          row.status === "approved"
                            ? "bg-gray-300 cursor-not-allowed text-gray-600"
                            : "bg-emerald-600 hover:bg-emerald-700 text-white"
                        }`}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => openConfirmationModal(row, "rejected")}
                        disabled={row.status === "rejected"}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                          row.status === "rejected"
                            ? "bg-gray-300 cursor-not-allowed text-gray-600"
                            : "bg-red-600 hover:bg-red-700 text-white"
                        }`}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {selectedRow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-md font-bold mb-3 border-b pb-2">
              Confirm {activeTab.toUpperCase()} Action
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              Are you sure you want to mark request{" "}
              <strong>{selectedRow.requestNo}</strong> for{" "}
              <strong>{selectedRow.employeeName}</strong> as{" "}
              <strong
                className={
                  actionType === "approved"
                    ? "text-emerald-600"
                    : "text-red-600"
                }
              >
                {actionType.toUpperCase()}
              </strong>
              ?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setSelectedRow(null)}
                className="bg-gray-500 text-white font-semibold px-3 py-1.5 rounded text-xs hover:bg-gray-600"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStatusChange}
                disabled={isSubmitting}
                className={`text-white font-semibold px-4 py-1.5 rounded text-xs transition ${
                  actionType === "approved"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isSubmitting ? "Updating..." : `Confirm ${actionType}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}