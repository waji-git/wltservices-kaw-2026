
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sun, Bell, User, LogOut } from "lucide-react";
import {
  getAllUserMovements,
  updateMovementApproval,
} from "@/app/actions/adminMovement";

export default function AdminMovementApprovalPage() {
  const router = useRouter();

  const [movements, setMovements] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [actionType, setActionType] = useState<"approved" | "rejected">(
    "approved"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Logout Handler
  const handleLogout = () => {
    setIsDropdownOpen(false);
    router.push("/");
  };

  // Load all user records from MongoDB
  const loadData = async () => {
    const res = await getAllUserMovements();
    if (res.success && res.data) {
      const formatted = res.data.map((item: any) => ({
        ...item,
        id: item._id ? String(item._id) : String(item.id),
      }));
      setMovements(formatted);
    } else {
      alert(`Error loading data: ${res.error}`);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openConfirmationModal = (row: any, type: "approved" | "rejected") => {
    setSelectedRow(row);
    setActionType(type);
  };

  const handleStatusChange = async () => {
    if (!selectedRow) return;
    setIsSubmitting(true);

    const res = await updateMovementApproval(selectedRow.id, actionType);

    if (res.success) {
      setSelectedRow(null);
      await loadData(); // Refresh UI
    } else {
      alert(`❌ Error: ${res.error}`);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto relative">
      {/* Header Bar */}
      <div className="border-b pb-3 mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Admin Approval Panel
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Review, approve, or reject movement correction requests submitted by
            employees.
          </p>
        </div>

        {/* Top-Right Action Icons */}
        <div className="flex items-center space-x-4 relative">
                  

          {/* Profile Dropdown Container */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-1.5 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
            >
              <User className="w-6 h-6" />
            </button>

            {/* Profile Popup Menu */}
            {isDropdownOpen && (
              <>
                {/* Backdrop to close menu when clicking outside */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />

            
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 z-20 overflow-hidden py-1">
                  
                 <div className="border-t border-gray-100 dark:border-gray-800 my-0.5" />

                 
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-3 font-semibold transition"
                  >
                    <LogOut className="w-4 h-4 text-red-600 dark:text-red-500" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white font-bold">
              <th className="p-3 border-r border-gray-700">User ID</th>
              <th className="p-3 border-r border-gray-700">In Date / Time</th>
              <th className="p-3 border-r border-gray-700">In Location</th>
              <th className="p-3 border-r border-gray-700">Out Date / Time</th>
              <th className="p-3 border-r border-gray-700">Out Location</th>
              <th className="p-3 border-r border-gray-700">Reason / Cycle</th>
              <th className="p-3 border-r border-gray-700">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {movements.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  No movement records found.
                </td>
              </tr>
            ) : (
              movements.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50/80 dark:hover:bg-gray-900/30 transition-colors font-medium"
                >
                  <td className="p-3 font-bold border-r">
                    {row.userId || "N/A"}
                  </td>
                  <td className="p-3 border-r">
                    {row.inDate} {row.inTime}
                  </td>
                  <td className="p-3 border-r">{row.inLocation}</td>
                  <td className="p-3 border-r">
                    {row.outDate} {row.outTime}
                  </td>
                  <td className="p-3 border-r">{row.outLocation}</td>
                  <td className="p-3 border-r">
                    {row.reasonCycle || row.reason}
                  </td>
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
                      {row.status || "pending"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openConfirmationModal(row, "approved")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded text-[11px] font-bold transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => openConfirmationModal(row, "rejected")}
                        className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded text-[11px] font-bold transition"
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

      {/* 🚀 APPROVAL / REJECTION CONFIRMATION POPUP */}
      {selectedRow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
          <div className="bg-white dark:bg-gray-950 rounded-xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
            <h3 className="text-md font-bold mb-3 border-b border-gray-200 dark:border-gray-800 pb-2">
              Confirm Status Action
            </h3>

            <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
              Are you sure you want to mark movement request for user{" "}
              <strong>{selectedRow.userId}</strong> on{" "}
              <strong>{selectedRow.inDate}</strong> as{" "}
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
                className="bg-gray-500 text-white font-semibold px-3 py-1.5 rounded text-xs hover:bg-gray-600 transition"
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
                } disabled:opacity-50`}
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