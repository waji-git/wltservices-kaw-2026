

"use client";

import React, { useState, useEffect } from "react";
// 1. ADDED THE IMPORT FOR deleteMovement HERE
import {
  addMovement,
  getMovements,
  deleteMovement,
} from "@/app/actions/movement";

// --- STATIC SECURE GRAPHICS & STYLES ---
const EDIT_ICON_PATH =
  "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10";
const DELETE_ICON_PATH =
  "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0";

const REUSABLE_STYLES = {
  editBtn:
    "p-1.5 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 dark:hover:bg-blue-950/30 transition shadow-xs",
  deleteBtn:
    "p-1.5 border border-red-500 text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 transition shadow-xs",
  actionContainer: "flex items-center justify-start space-x-2",
  inlineInput:
    "w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded px-1.5 py-1 text-xs outline-none focus:border-blue-500 font-normal",
};

export default function MovementPage() {
  const [movementMonth, setMovementMonth] = useState("June 2026");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFormDate, setSelectedFormDate] = useState("2026-06-01");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [inlineFormData, setInlineFormData] = useState({
    inDate: "",
    inTime: "",
    inLocation: "",
    outDate: "",
    outTime: "",
    outLocation: "",
    reason: "",
  });

  const [movements, setMovements] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    inTime: "",
    inLocation: "",
    outTime: "",
    outLocation: "",
    reason: "",
  });

  // 🔄 FETCH DATA FROM MONGODB
  async function loadData() {
    try {
      const response = await getMovements();
      if (response.success && response.data) {
        const normalizedData = response.data.map((item: any) => ({
          ...item,
          id: item._id ? String(item._id) : String(item.id),
          reason: item.reason || item.reasonCycle || "",
        }));
        setMovements(normalizedData);
      } else {
        console.error("Failed to load movements:", response?.error);
      }
    } catch (err) {
      console.error("Error reading database:", err);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const format12HourTo24Hour = (timeStr: string) => {
    if (!timeStr || timeStr === "--:--") return "";
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") hours = "00";
    if (modifier === "PM") hours = String(parseInt(hours, 10) + 12);
    return `${hours.padStart(2, "0")}:${minutes}`;
  };

  const formatTimeTo12Hour = (timeString: string) => {
    if (!timeString) return "--:--";
    const [hours, minutes] = timeString.split(":");
    const hourInt = parseInt(hours, 10);
    const ampm = hourInt >= 12 ? "PM" : "AM";
    const displayHour = hourInt % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const openAddModal = (dateString: string) => {
    setEditingId(null);
    setSelectedFormDate(dateString);
    setFormData({
      inTime: "",
      inLocation: "",
      outTime: "",
      outLocation: "",
      reason: "",
    });
    setIsModalOpen(true);
  };

  const startInlineEdit = (row: any) => {
    setEditingId(row.id);
    setInlineFormData({
      inDate: row.inDate,
      inTime: format12HourTo24Hour(row.inTime),
      inLocation: row.inLocation,
      outDate: row.outDate || row.inDate,
      outTime: format12HourTo24Hour(row.outTime),
      outLocation: row.outLocation,
      reason: row.reason || row.reasonCycle || "",
    });
  };

  const handleInlineSave = async (id: string) => {
    if (
      !inlineFormData.inTime ||
      !inlineFormData.inLocation ||
      !inlineFormData.outTime ||
      !inlineFormData.outLocation ||
      !inlineFormData.reason
    ) {
      alert("Please fill in all layout fields to save changes.");
      return;
    }

    const formattedInTime = formatTimeTo12Hour(inlineFormData.inTime);
    const formattedOutTime = formatTimeTo12Hour(inlineFormData.outTime);

    setMovements((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              inDate: inlineFormData.inDate,
              inTime: formattedInTime,
              inLocation: inlineFormData.inLocation,
              outDate: inlineFormData.outDate,
              outTime: formattedOutTime,
              outLocation: inlineFormData.outLocation,
              reason: inlineFormData.reason,
              reasonCycle: inlineFormData.reason,
            }
          : m
      )
    );

    try {
      setIsSubmitting(true);
      const submitData = new FormData();

      submitData.append("id", id);
      submitData.append("inDate", inlineFormData.inDate);
      submitData.append("inTime", formattedInTime);
      submitData.append("inLocation", inlineFormData.inLocation);
      submitData.append("outDate", inlineFormData.outDate);
      submitData.append("outTime", formattedOutTime);
      submitData.append("outLocation", inlineFormData.outLocation);
      submitData.append("reasonCycle", inlineFormData.reason);

      const response = await addMovement(submitData);

      if (response.success) {
        setEditingId(null);
        await loadData();
      } else {
        alert(`❌ Database Error: ${response.error}`);
        await loadData();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save data inline.");
      await loadData();
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🎯 FIXED: HANDLES ASYNC PERMANENT DATABASE DELETION
  const handleDeleteMovement = async (id: string) => {
    if (!id) {
      alert("Error: Missing document target ID.");
      return;
    }

    if (
      confirm(
        "Are you sure you want to permanently delete this movement item from the database?"
      )
    ) {
      try {
        setIsSubmitting(true);
        // 1. Trigger deletion action on MongoDB backend
        const response = await deleteMovement(id);

        if (response.success) {
          // 2. Only remove from visual state array once database collection responds with success
          setMovements((prev) => prev.filter((m) => m.id !== id));
        } else {
          alert(`❌ Database Deletion Error: ${response.error}`);
        }
      } catch (err) {
        console.error("Network deletion execution error:", err);
        alert("Failed to contact the server to process deletion.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const submitData = new FormData();
      submitData.append("inDate", selectedFormDate);
      submitData.append("inTime", formatTimeTo12Hour(formData.inTime));
      submitData.append("inLocation", formData.inLocation);
      submitData.append("outDate", selectedFormDate);
      submitData.append("outTime", formatTimeTo12Hour(formData.outTime));
      submitData.append("outLocation", formData.outLocation);
      submitData.append("reasonCycle", formData.reason);

      const response = await addMovement(submitData);
      if (response.success) {
        await loadData();
        setIsModalOpen(false);
      } else {
        alert(`❌ Database Error: ${response.error}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateJuneDays = () => {
    const days = [];
    for (let d = 1; d <= 30; d++) {
      const dayStr = String(d).padStart(2, "0");
      const fullDateStr = `2026-06-${dayStr}`;
      const displayBanner = new Date(fullDateStr).toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      days.push({ fullDateStr, displayBanner });
    }
    return days;
  };

  const juneDaysArray = generateJuneDays();

  return (
    <div className="animate-in fade-in duration-200 relative p-1.5">
      <h2 className="text-2xl font-bold tracking-tight">Movement</h2>
      <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
        You can add your movements here.
      </p>

      {/* Month Selection */}
      <div className="flex items-center space-x-3 mt-4 text-xs font-semibold">
        <span className="text-gray-500 dark:text-gray-400">Month:</span>
        <button
          onClick={() => setMovementMonth("June 2026")}
          className={`px-3 py-1.5 rounded flex items-center space-x-1.5 transition ${
            movementMonth === "June 2026"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
          }`}
        >
          <span>June 2026</span>
          <span className="bg-blue-500 text-[10px] text-white px-1 rounded scale-90">
            Current
          </span>
        </button>
        <button
          onClick={() => setMovementMonth("May 2026")}
          className="px-3 py-1.5 rounded border bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50"
        >
          <span>May 2026</span>
          <span className="text-[10px] bg-gray-200 dark:bg-gray-800 text-gray-600 px-1 rounded scale-90">
            Previous
          </span>
        </button>
      </div>

      {/* Table Legend Details */}
      <div className="flex flex-wrap items-center gap-2 mt-5 text-[11px] font-bold">
        <span className="bg-blue-600 text-white px-2 py-0.5 rounded">
          Device
        </span>
        <span className="mr-2 text-gray-700 dark:text-gray-300">
          Fingerprint / biometric
        </span>
        <span className="bg-cyan-500 text-white px-2 py-0.5 rounded">
          Movement
        </span>
        <span className="mr-2 text-gray-700 dark:text-gray-300">
          Your correction request
        </span>
        <span className="bg-amber-500 text-white px-2 py-0.5 rounded">
          Pending
        </span>
        <span className="mr-2 text-gray-700 dark:text-gray-300">
          Awaiting approval
        </span>
        <span className="bg-emerald-600 text-white px-2 py-0.5 rounded">
          Approved
        </span>
        <span className="text-gray-700 dark:text-gray-300">
          Counts as attendance
        </span>
      </div>

      {/* Table Container */}
      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="font-bold bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-200">
              <th className="p-3 border-r border-gray-700">Source</th>
              <th className="p-3 border-r border-gray-700">In Date</th>
              <th className="p-3 border-r border-gray-700">In Time</th>
              <th className="p-3 border-r border-gray-700">In Location</th>
              <th className="p-3 border-r border-gray-700">Out Date</th>
              <th className="p-3 border-r border-gray-700">Out Time</th>
              <th className="p-3 border-r border-gray-700">Out Location</th>
              <th className="p-3 border-r border-gray-700">Reason / Cycle</th>
              <th className="p-3 border-r border-gray-700">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {juneDaysArray.map((day) => {
              const dayMovements = movements.filter(
                (item) => item.inDate === day.fullDateStr
              );

              return (
                <React.Fragment key={day.fullDateStr}>
                  <tr className="font-bold bg-gray-50 dark:bg-gray-900/40">
                    <td
                      colSpan={10}
                      className="p-2.5 pl-4 text-[13px] border-y border-gray-200 dark:border-gray-800"
                    >
                      {day.displayBanner}
                    </td>
                  </tr>

                  {dayMovements.map((row) => {
                    const isEditingThisRow = editingId === row.id;

                    return isEditingThisRow ? (
                      /* ✏️ INLINE EDIT MODE */
                      <tr
                        key={row.id}
                        className="bg-blue-50/50 dark:bg-blue-950/20 font-medium"
                      >
                        <td className="p-2 pl-4">
                          <span className="bg-blue-600 text-white px-2 py-0.5 rounded font-bold text-[10px]">
                            Editing
                          </span>
                        </td>
                        <td className="p-2">
                          <input
                            type="date"
                            value={inlineFormData.inDate}
                            onChange={(e) =>
                              setInlineFormData({
                                ...inlineFormData,
                                inDate: e.target.value,
                              })
                            }
                            className={REUSABLE_STYLES.inlineInput}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="time"
                            value={inlineFormData.inTime}
                            onChange={(e) =>
                              setInlineFormData({
                                ...inlineFormData,
                                inTime: e.target.value,
                              })
                            }
                            className={REUSABLE_STYLES.inlineInput}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={inlineFormData.inLocation}
                            onChange={(e) =>
                              setInlineFormData({
                                ...inlineFormData,
                                inLocation: e.target.value,
                              })
                            }
                            className={REUSABLE_STYLES.inlineInput}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="date"
                            value={inlineFormData.outDate}
                            onChange={(e) =>
                              setInlineFormData({
                                ...inlineFormData,
                                outDate: e.target.value,
                              })
                            }
                            className={REUSABLE_STYLES.inlineInput}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="time"
                            value={inlineFormData.outTime}
                            onChange={(e) =>
                              setInlineFormData({
                                ...inlineFormData,
                                outTime: e.target.value,
                              })
                            }
                            className={REUSABLE_STYLES.inlineInput}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={inlineFormData.outLocation}
                            onChange={(e) =>
                              setInlineFormData({
                                ...inlineFormData,
                                outLocation: e.target.value,
                              })
                            }
                            className={REUSABLE_STYLES.inlineInput}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={inlineFormData.reason}
                            onChange={(e) =>
                              setInlineFormData({
                                ...inlineFormData,
                                reason: e.target.value,
                              })
                            }
                            className={REUSABLE_STYLES.inlineInput}
                          />
                        </td>
                        <td className="p-2 text-gray-400 italic text-[11px]">
                          {isSubmitting ? "Saving..." : "Pending"}
                        </td>
                        <td className="p-2">
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => handleInlineSave(row.id)}
                              disabled={isSubmitting}
                              className="bg-blue-600 text-white px-2 py-1 rounded text-[11px] font-bold hover:bg-blue-700 transition"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="bg-gray-500 text-white px-2 py-1 rounded text-[11px] font-bold hover:bg-gray-600 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      /* 👁️ NORMAL DISPLAY ROW MODE */
                      <tr
                        key={row.id}
                        className="transition-colors hover:bg-gray-50/60 dark:hover:bg-gray-900/20"
                      >
                        <td className="p-3 pl-4">
                          <span className="bg-cyan-500 text-white px-2 py-0.5 rounded font-bold text-[10px]">
                            Movement
                          </span>
                        </td>
                        <td className="p-3">{row.inDate}</td>
                        <td className="p-3 font-medium">{row.inTime}</td>
                        <td className="p-3">{row.inLocation}</td>
                        <td className="p-3">{row.outDate || row.inDate}</td>
                        <td className="p-3 font-medium">{row.outTime}</td>
                        <td className="p-3">{row.outLocation}</td>
                        <td className="p-3">{row.reason}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase ${
                              row.status?.toLowerCase().includes("approved")
                                ? "bg-emerald-600"
                                : "bg-amber-500"
                            }`}
                          >
                            {row.status || "pending"}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className={REUSABLE_STYLES.actionContainer}>
                            <button
                              onClick={() => startInlineEdit(row)}
                              className={REUSABLE_STYLES.editBtn}
                              title="Edit Row Inline"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d={EDIT_ICON_PATH}
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteMovement(row.id)}
                              className={REUSABLE_STYLES.deleteBtn}
                              title="Delete Record"
                              disabled={isSubmitting}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d={DELETE_ICON_PATH}
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  <tr>
                    <td colSpan={10} className="p-3 text-center">
                      <button
                        onClick={() => openAddModal(day.fullDateStr)}
                        className="border border-emerald-500 text-emerald-500 px-3 py-1 rounded text-xs font-semibold hover:bg-emerald-500/10 transition"
                      >
                        + Add Movement
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* NEW CREATIONS DIALOG OVERLAY SHEET */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
          <div className="bg-white dark:bg-gray-950 rounded-xl max-w-3xl w-full shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden text-gray-900 dark:text-gray-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold tracking-wide">
                Add Movement Request
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold mb-1 text-gray-700 dark:text-gray-300">
                      In Date *
                    </label>
                    <input
                      type="date"
                      value={selectedFormDate}
                      disabled
                      className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 rounded px-3 py-2 cursor-not-allowed outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1 text-gray-700 dark:text-gray-300">
                      Out Date *
                    </label>
                    <input
                      type="date"
                      value={selectedFormDate}
                      disabled
                      className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 rounded px-3 py-2 cursor-not-allowed outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-bold mb-1 text-gray-700 dark:text-gray-300">
                      In Time *
                    </label>
                    <input
                      type="time"
                      value={formData.inTime}
                      onChange={(e) =>
                        setFormData({ ...formData, inTime: e.target.value })
                      }
                      className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded px-3 py-2 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1 text-gray-700 dark:text-gray-300">
                      Out Time *
                    </label>
                    <input
                      type="time"
                      value={formData.outTime}
                      onChange={(e) =>
                        setFormData({ ...formData, outTime: e.target.value })
                      }
                      className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded px-3 py-2 outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-bold mb-1 text-gray-700 dark:text-gray-300">
                      In Location *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Main Office"
                      value={formData.inLocation}
                      onChange={(e) =>
                        setFormData({ ...formData, inLocation: e.target.value })
                      }
                      className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded px-3 py-2 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1 text-gray-700 dark:text-gray-300">
                      Out Location *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Main Office"
                      value={formData.outLocation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          outLocation: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded px-3 py-2 outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-bold mb-1 text-gray-700 dark:text-gray-300">
                  Reason *
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain why the record is missing..."
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded px-3 py-2 outline-none resize-none"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-t-gray-100 dark:border-t-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white font-semibold px-4 py-2 rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white font-semibold px-5 py-2 rounded text-xs disabled:opacity-50"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}