

"use client";

import React, { useState, useEffect } from "react"; // Added useEffect
// Import both Server Actions
import { addMovement, getMovements } from "@/app/actions/movement";

export default function MovementPage() {
  const [movementMonth, setMovementMonth] = useState("June 2026");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFormDate, setSelectedFormDate] = useState("2026-06-01");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Core array where database rows live
  const [movements, setMovements] = useState<any[]>([]);

  // Form field bindings
  const [formData, setFormData] = useState({
    inTime: "",
    inLocation: "",
    outTime: "",
    outLocation: "",
    reason: "",
  });

  // 🔄 FETCH EXISTING DATA FROM MONGODB ON PAGE LOAD
  useEffect(() => {
    async function loadData() {
      try {
        const response = await getMovements();
        if (response.success && response.data) {
          setMovements(response.data);
        } else {
          console.error(
            "Failed to load movements from database:",
            response.error
          );
        }
      } catch (err) {
        console.error("Error reading database:", err);
      }
    }
    loadData();
  }, []); // Empty bracket runs this exactly once when the user signs in or opens this page

  // Open modal handler for a specific clicked date
  const openAddModal = (dateString: string) => {
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

  // Convert 24h HTML input times to readable 12h AM/PM strings
  const formatTimeTo12Hour = (timeString: string) => {
    if (!timeString) return "--:--";
    const [hours, minutes] = timeString.split(":");
    const hourInt = parseInt(hours, 10);
    const ampm = hourInt >= 12 ? "PM" : "AM";
    const displayHour = hourInt % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.inTime ||
      !formData.inLocation ||
      !formData.outTime ||
      !formData.outLocation ||
      !formData.reason
    ) {
      alert("Please fill in all mandatory fields marked with *");
      return;
    }

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
        // Optimistically append the data locally so it renders immediately
        const newRecord = {
          id: Date.now().toString(),
          inDate: selectedFormDate,
          inTime: formatTimeTo12Hour(formData.inTime),
          inLocation: formData.inLocation,
          outDate: selectedFormDate,
          outTime: formatTimeTo12Hour(formData.outTime),
          outLocation: formData.outLocation,
          reason: formData.reason,
          status: "pending",
          action: "Read-only",
        };

        setMovements([...movements, newRecord]);
        setIsModalOpen(false);
        alert("🎉 Saved to MongoDB successfully!");
      } else {
        alert(`❌ Database Error: ${response.error}`);
      }
    } catch (err: any) {
      console.error(err);
      alert("Failed to submit data to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // GENERATE ALL DAYS FOR JUNE 2026 (1 to 30)
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
    <div className="animate-in fade-in duration-200 relative">
      <h2 className="text-2xl font-bold tracking-tight">Movement</h2>
      <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
        You can add your movements here.
      </p>

      {/* Month Control Selectors */}
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

      {/* Legend Badge Info */}
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

      {/* Movement Logs Table Container */}
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

                  {dayMovements.map((row) => (
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
                      <td className="p-3">{row.outDate}</td>
                      <td className="p-3 font-medium">{row.outTime}</td>
                      <td className="p-3">{row.outLocation}</td>
                      <td className="p-3">{row.reason}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${
                            row.status.includes("approved")
                              ? "bg-emerald-600"
                              : "bg-amber-500"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-gray-400 dark:text-gray-500">
                        {row.action}
                      </td>
                    </tr>
                  ))}

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

      {/* MODAL WINDOW DIALOG OVERLAY */}
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
              <div className="bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900 rounded-lg p-3 text-xs text-cyan-800 dark:text-cyan-300">
                Describe the full IN → OUT cycle. For night shifts (cross-day),
                set <strong>Out Date</strong> to the next day.
              </div>

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
                  placeholder="Explain why the fingerprint record is missing..."
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
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}