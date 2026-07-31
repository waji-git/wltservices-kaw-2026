

"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  addMovement,
  getMovements,
  deleteMovement,
} from "@/app/actions/movement";

// --- TYPES ---
interface MovementRecord {
  id: string;
  inDate: string;
  inTime: string;
  inLocation: string;
  outDate?: string;
  outTime: string;
  outLocation: string;
  reason?: string;
  reasonCycle?: string;
  status?: string;
}

interface InlineFormDataState {
  inDate: string;
  inTime: string;
  inLocation: string;
  outDate: string;
  outTime: string;
  outLocation: string;
  reason: string;
}

interface FormDataState {
  inTime: string;
  inLocation: string;
  outTime: string;
  outLocation: string;
  reason: string;
}

// --- HELPER UTILITIES ---
const format12HourTo24Hour = (timeStr: string): string => {
  if (!timeStr || timeStr === "--:--") return "";
  const parts = timeStr.trim().split(" ");
  if (parts.length < 2) return timeStr;

  const [time, modifier] = parts;
  let [hours, minutes] = time.split(":");
  let hourNum = parseInt(hours, 10);

  if (modifier === "PM" && hourNum < 12) hourNum += 12;
  if (modifier === "AM" && hourNum === 12) hourNum = 0;

  return `${String(hourNum).padStart(2, "0")}:${minutes}`;
};

const formatTimeTo12Hour = (timeString: string): string => {
  if (!timeString) return "--:--";
  const [hours, minutes] = timeString.split(":");
  const hourInt = parseInt(hours, 10);
  if (isNaN(hourInt)) return "--:--";

  const ampm = hourInt >= 12 ? "PM" : "AM";
  const displayHour = hourInt % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

/**
 * Dynamically builds day objects for any year and month (1-indexed month)
 */
const getDaysInMonth = (year: number, month: number) => {
  const days = [];
  const totalDays = new Date(year, month, 0).getDate();

  for (let d = 1; d <= totalDays; d++) {
    const dayStr = String(d).padStart(2, "0");
    const monthStr = String(month).padStart(2, "0");
    const fullDateStr = `${year}-${monthStr}-${dayStr}`;

    const displayBanner = new Date(
      `${fullDateStr}T00:00:00`
    ).toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    days.push({ fullDateStr, displayBanner });
  }
  return days;
};

export default function MovementPage() {
  // Current Date / Month State
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState<number>(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(
    now.getMonth() + 1
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFormDate, setSelectedFormDate] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [inlineFormData, setInlineFormData] = useState<InlineFormDataState>({
    inDate: "",
    inTime: "",
    inLocation: "",
    outDate: "",
    outTime: "",
    outLocation: "",
    reason: "",
  });

  const [movements, setMovements] = useState<MovementRecord[]>([]);

  const [formData, setFormData] = useState<FormDataState>({
    inTime: "",
    inLocation: "",
    outTime: "",
    outLocation: "",
    reason: "",
  });

  // Fetch Movements Data
  const loadData = useCallback(async () => {
    try {
      const response = await getMovements();
      if (response.success && response.data) {
        const normalizedData: MovementRecord[] = response.data.map(
          (item: any) => ({
            ...item,
            id: item._id ? String(item._id) : String(item.id),
            reason: item.reason || item.reasonCycle || "",
          })
        );
        setMovements(normalizedData);
      }
    } catch (err) {
      console.error("Error fetching movements:", err);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Compute days dynamically based on selected month/year
  const daysArray = useMemo(() => {
    return getDaysInMonth(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  // Handle Month Toggle Buttons (Current vs Previous)
  const handleSelectCurrentMonth = () => {
    const currentDate = new Date();
    setSelectedYear(currentDate.getFullYear());
    setSelectedMonth(currentDate.getMonth() + 1);
  };

  const handleSelectPreviousMonth = () => {
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth(); // 0-indexed gives previous month (1-indexed value)

    if (month === 0) {
      month = 12;
      year -= 1;
    }
    setSelectedYear(year);
    setSelectedMonth(month);
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

  const startInlineEdit = (row: MovementRecord) => {
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
    try {
      setIsSubmitting(true);
      const submitData = new FormData();
      submitData.append("id", id);
      submitData.append("inDate", inlineFormData.inDate);
      submitData.append("inTime", formatTimeTo12Hour(inlineFormData.inTime));
      submitData.append("inLocation", inlineFormData.inLocation);
      submitData.append("outDate", inlineFormData.outDate);
      submitData.append("outTime", formatTimeTo12Hour(inlineFormData.outTime));
      submitData.append("outLocation", inlineFormData.outLocation);
      submitData.append("reasonCycle", inlineFormData.reason);

      const response = await addMovement(submitData);
      if (response.success) {
        setEditingId(null);
        await loadData();
      } else {
        alert(`Error: ${response.error}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMovement = async (id: string) => {
    if (confirm("Are you sure you want to delete this movement item?")) {
      try {
        setIsSubmitting(true);
        const response = await deleteMovement(id);
        if (response.success) {
          setMovements((prev) => prev.filter((m) => m.id !== id));
        }
      } catch (err) {
        console.error(err);
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
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Status Style Helper
  const getStatusBadgeStyle = (status?: string) => {
    const s = status?.toUpperCase() || "PENDING";
    if (s.includes("REJECT")) return "bg-amber-500 text-white"; // Matches screenshot orange REJECTED
    if (s.includes("APPROV")) return "bg-emerald-600 text-white";
    return "bg-amber-500 text-white";
  };

  // Month Display Strings
  const currentMonthDate = new Date();
  const currentMonthName = currentMonthDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const prevMonthDate = new Date(
    currentMonthDate.getFullYear(),
    currentMonthDate.getMonth() - 1,
    1
  );
  const prevMonthName = prevMonthDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const isCurrentActive =
    selectedMonth === currentMonthDate.getMonth() + 1 &&
    selectedYear === currentMonthDate.getFullYear();

  return (
    <div className="p-4 space-y-2 font-sans text-xs">
        <div className="flex flex-col gap-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Movement</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          You can add your movements here.
        </p>
      </div>

      {/* --- MONTH NAVIGATION BUTTONS --- */}
      <div className="flex items-center space-x-3 space-y-2 text-xs font-semibold">
        <span className="text-gray-500 font-bold">Month:</span>
        <button
          onClick={handleSelectCurrentMonth}
          className={`px-4 py-1.5 rounded-lg flex items-center space-x-2 transition ${
            isCurrentActive
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <span className="font-bold">{currentMonthName}</span>
          <span className="bg-blue-500 text-[10px] text-white px-1.5 py-0.5 rounded font-normal">
            Current
          </span>
        </button>

        <button
          onClick={handleSelectPreviousMonth}
          className={`px-4 py-1.5 rounded-lg flex items-center space-x-2 border border-gray-300 transition ${
            !isCurrentActive
              ? "bg-blue-600 text-white border-blue-600 shadow-xs"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <span className="font-bold">{prevMonthName}</span>
          <span className="bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded font-normal">
            Previous
          </span>
        </button>

        {/* Date Selector for Custom Past/Future Months */}
        <input
          type="month"
          value={`${selectedYear}-${String(selectedMonth).padStart(2, "0")}`}
          onChange={(e) => {
            if (e.target.value) {
              const [y, m] = e.target.value.split("-").map(Number);
              setSelectedYear(y);
              setSelectedMonth(m);
            }
          }}
          className="border border-gray-300 rounded px-2 py-1 text-xs outline-none bg-white font-medium"
        />
      </div>

      {/* --- LEGEND BAR --- */}
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold pt-1">
        <span className="bg-blue-600 text-white px-2.5 py-1 rounded-md">
          Device
        </span>
        <span className="mr-3 text-gray-700 font-semibold">
          Fingerprint / biometric
        </span>

        <span className="bg-cyan-500 text-white px-2.5 py-1 rounded-md">
          Movement
        </span>
        <span className="mr-3 text-gray-700 font-semibold">
          Your correction request
        </span>

        <span className="bg-amber-500 text-white px-2.5 py-1 rounded-md">
          Pending
        </span>
        <span className="mr-3 text-gray-700 font-semibold">
          Awaiting approval
        </span>

        <span className="bg-emerald-600 text-white px-2.5 py-1 rounded-md">
          Approved
        </span>
        <span className="text-gray-700 font-semibold">
          Counts as attendance
        </span>
      </div>

      {/* --- TABLE CONTAINER --- */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-2xs mt-4">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[#1e293b] text-white font-bold">
              <th className="p-3.5 border-r border-gray-700">Source</th>
              <th className="p-3.5 border-r border-gray-700">In Date</th>
              <th className="p-3.5 border-r border-gray-700">In Time</th>
              <th className="p-3.5 border-r border-gray-700">In Location</th>
              <th className="p-3.5 border-r border-gray-700">Out Date</th>
              <th className="p-3.5 border-r border-gray-700">Out Time</th>
              <th className="p-3.5 border-r border-gray-700">Out Location</th>
              <th className="p-3.5 border-r border-gray-700">Reason / Cycle</th>
              <th className="p-3.5 border-r border-gray-700">Status</th>
              <th className="p-3.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {daysArray.map((day) => {
              const dayMovements = movements.filter(
                (m) => m.inDate === day.fullDateStr
              );

              return (
                <React.Fragment key={day.fullDateStr}>
                  {/* Date Header Row */}
                  <tr className="bg-gray-50/80 font-bold border-y border-gray-200">
                    <td
                      colSpan={10}
                      className="p-2.5 pl-4 text-gray-800 text-xs"
                    >
                      {day.displayBanner}
                    </td>
                  </tr>

                  {/* Movements Rows for this Day */}
                  {dayMovements.map((row) =>
                    editingId === row.id ? (
                      /* Inline Editing Row */
                      <tr key={row.id} className="bg-blue-50/40">
                        <td className="p-2 pl-4">
                          <span className="bg-cyan-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                            Movement
                          </span>
                        </td>
                        <td className="p-2">{row.inDate}</td>
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
                            className="border border-gray-300 rounded px-1.5 py-1 w-full bg-white outline-none focus:border-blue-500"
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
                            className="border border-gray-300 rounded px-1.5 py-1 w-full bg-white outline-none focus:border-blue-500"
                          />
                        </td>
                        <td className="p-2">{row.outDate || row.inDate}</td>
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
                            className="border border-gray-300 rounded px-1.5 py-1 w-full bg-white outline-none focus:border-blue-500"
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
                            className="border border-gray-300 rounded px-1.5 py-1 w-full bg-white outline-none focus:border-blue-500"
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
                            className="border border-gray-300 rounded px-1.5 py-1 w-full bg-white outline-none focus:border-blue-500"
                          />
                        </td>
                        <td className="p-2">
                          <span className="text-gray-400 font-semibold italic text-[11px]">
                            Saving...
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <button
                              onClick={() => handleInlineSave(row.id)}
                              disabled={isSubmitting}
                              className="bg-blue-600 text-white px-2 py-1 rounded text-[11px] font-bold hover:bg-blue-700 transition"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="bg-gray-400 text-white px-2 py-1 rounded text-[11px] font-bold hover:bg-gray-500 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      /* Display Record Row */
                      <tr key={row.id} className="hover:bg-gray-50/50">
                        <td className="p-3 pl-4">
                          <span className="bg-cyan-500 text-white px-2.5 py-1 rounded-md font-bold text-[10px] inline-block">
                            Movement
                          </span>
                        </td>
                        <td className="p-3 text-gray-700">{row.inDate}</td>
                        <td className="p-3 font-bold text-gray-800">
                          {row.inTime}
                        </td>
                        <td className="p-3 text-gray-700">{row.inLocation}</td>
                        <td className="p-3 text-gray-700">
                          {row.outDate || row.inDate}
                        </td>
                        <td className="p-3 font-bold text-gray-800">
                          {row.outTime}
                        </td>
                        <td className="p-3 text-gray-700">{row.outLocation}</td>
                        <td className="p-3 text-gray-700">{row.reason}</td>
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide inline-block ${getStatusBadgeStyle(
                              row.status
                            )}`}
                          >
                            {row.status || "REJECTED"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center space-x-1.5">
                            {/* Edit Button (Blue Border Box) */}
                            <button
                              onClick={() => startInlineEdit(row)}
                              className="p-1.5 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition"
                              title="Edit"
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
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                              </svg>
                            </button>

                            {/* Delete Button (Red Border Box) */}
                            <button
                              onClick={() => handleDeleteMovement(row.id)}
                              className="p-1.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
                              title="Delete"
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
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}

                  {/* Add Movement Button Row */}
                  <tr>
                    <td colSpan={10} className="p-2.5 text-center">
                      <button
                        onClick={() => openAddModal(day.fullDateStr)}
                        className="border border-emerald-500 text-emerald-500 bg-white hover:bg-emerald-50 px-4 py-1 rounded-md text-xs font-semibold transition"
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

      {/* --- ADD MOVEMENT MODAL SHEET --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 space-y-4 shadow-xl border border-gray-100">
            <h3 className="text-base font-bold text-gray-800">
              Add Movement Request ({selectedFormDate})
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1 text-gray-700">
                    In Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.inTime}
                    onChange={(e) =>
                      setFormData({ ...formData, inTime: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-gray-700">
                    Out Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.outTime}
                    onChange={(e) =>
                      setFormData({ ...formData, outTime: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-gray-700">
                    In Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. kandy"
                    value={formData.inLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, inLocation: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-gray-700">
                    Out Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. maharagama"
                    value={formData.outLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, outLocation: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-gray-700">
                  Reason / Cycle *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. work from home"
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-1.5 rounded bg-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-1.5 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 disabled:opacity-50"
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
