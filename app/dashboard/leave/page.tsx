
// "use client";

// import React, { useState } from "react";

// export default function LeavePage() {
//   // State to manage whether the Leave Request accordion is open
//   const [isRequestOpen, setIsRequestOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [generatedReqNo, setGeneratedReqNo] = useState("");

//   // 1. Form values state linked to field names
//   const [formData, setFormData] = useState({
//     leaveAppliedFor: "",
//     fromDate: "",
//     toDate: "",
//     coveringOfficer: "",
//     noOfDays: "",
//     purpose: "",
//     remark: "",
//   });

//   // 2. Dynamic Input Tracking handler
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // 3. API Submission logic triggered on button click
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); // Prevents default page refreshing
//     setLoading(true);

//     try {
//       const response = await fetch("/api/leave", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert("Leave request saved successfully in MongoDB!");
//         setGeneratedReqNo(data.requestNo); // Displays the generated string inside your read-only input

//         // Optional: Reset form fields back to empty strings
//         setFormData({
//           leaveAppliedFor: "",
//           fromDate: "",
//           toDate: "",
//           coveringOfficer: "",
//           noOfDays: "",
//           purpose: "",
//           remark: "",
//         });
//       } else {
//         alert("Error from Server: " + data.error);
//       }
//     } catch (error) {
//       console.error("Submission failed:", error);
//       alert("Network error. Failed to hit the endpoint.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 space-y-4 max-w-7xl mx-auto font-sans text-gray-800">
//       {/* 1. LEAVE REQUEST ACCORDION */}
//       <div className="border border-gray-300 rounded-lg shadow-sm bg-white overflow-hidden">
//         {/* Accordion Header / Clickable Toggle */}
//         <div
//           onClick={() => setIsRequestOpen(!isRequestOpen)}
//           className="p-4 cursor-pointer hover:bg-gray-50 flex flex-col justify-center transition-colors duration-150"
//         >
//           <div className="flex items-center space-x-2">
//             <span className="text-xl font-bold text-black transition-transform duration-200">
//               {isRequestOpen ? "▼" : "▶"}
//             </span>
//             <h2 className="text-2xl font-bold text-black">Leave Request</h2>
//           </div>
//           <p className="text-sm text-gray-600 pl-6 mt-1">
//             You can make a leave request here.
//           </p>
//         </div>

//         {/* Accordion Content (The Form wrapped inside a submit container) */}
//         {isRequestOpen && (
//           <form
//             onSubmit={handleSubmit}
//             className="border-t border-gray-200 p-6 bg-white space-y-5"
//           >
//             {/* Request No (Disabled/Auto-fill) */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Request No{" "}
//                 <span className="text-xs text-gray-500 font-normal">
//                   (This will be auto fill after you save the request)
//                 </span>
//               </label>
//               <input
//                 type="text"
//                 disabled
//                 value={generatedReqNo}
//                 placeholder={
//                   generatedReqNo ? "" : "Auto generated after saving..."
//                 }
//                 className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
//               />
//             </div>

//             {/* Leave Applied For */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Leave Applied for <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="leaveAppliedFor"
//                 required
//                 value={formData.leaveAppliedFor}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
//               >
//                 <option value="">Select a leave applied for</option>
//                 <option value="Casual Leave">Casual Leave</option>
//                 <option value="Medical Leave">Medical Leave</option>
//                 <option value="Annual Leave">Annual Leave</option>
//               </select>
//             </div>

//             {/* From & To Dates */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   From <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="date"
//                   name="fromDate"
//                   required
//                   value={formData.fromDate}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   To <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="date"
//                   name="toDate"
//                   required
//                   value={formData.toDate}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             {/* Covering Officer & No of Days */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Covering Officer
//                 </label>
//                 <select
//                   name="coveringOfficer"
//                   value={formData.coveringOfficer}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 >
//                   <option value="">Select a covering officer</option>
//                   <option value="Officer A">Officer A</option>
//                   <option value="Officer B">Officer B</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   No of Days <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="noOfDays"
//                   required
//                   min="0.5"
//                   step="0.5"
//                   value={formData.noOfDays}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             {/* Purpose */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Purpose for which leave is required{" "}
//                 <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 name="purpose"
//                 required
//                 rows={3}
//                 value={formData.purpose}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
//               ></textarea>
//             </div>

//             {/* Remark */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Remark
//               </label>
//               <textarea
//                 name="remark"
//                 rows={2}
//                 value={formData.remark}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
//               ></textarea>
//             </div>

//             {/* Form Actions */}
//             <div className="flex justify-end space-x-2 pt-2">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition disabled:bg-gray-400 cursor-pointer"
//               >
//                 {loading ? "Saving..." : "Save Request"}
//               </button>
//             </div>
//           </form>
//         )}
//       </div>

//       {/* 2. LEAVE BALANCE CARD */}
//       <div className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white cursor-pointer hover:bg-gray-50">
//         <h2 className="text-xl font-bold text-black">▶ Leave Balance</h2>
//         <p className="text-sm text-gray-600 mt-1">
//           You can see your leave balance here.
//         </p>
//       </div>

//       {/* 3. LEAVE APPLIED ON 2026 CARD */}
//       <div className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white cursor-pointer hover:bg-gray-50">
//         <h2 className="text-xl font-bold text-black">
//           ▶ Leave Applied on 2026
//         </h2>
//         <p className="text-sm text-gray-600 mt-1">
//           You can see leaves that you have in 2026 here.
//         </p>
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useState, useEffect } from "react";

interface LeaveBalance {
  type: string;
  balance: number;
}

export default function LeavePage() {
  // Accordion open/close toggle states
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isBalanceOpen, setIsBalanceOpen] = useState(false); // Default open like the UI design

  const [loading, setLoading] = useState(false);
  const [generatedReqNo, setGeneratedReqNo] = useState("");

  // Balance management states
  const [balances, setBalances] = useState<LeaveBalance[]>([]);
  const [loadingBalances, setLoadingBalances] = useState(false);

  const [formData, setFormData] = useState({
    leaveAppliedFor: "",
    fromDate: "",
    toDate: "",
    coveringOfficer: "",
    noOfDays: "",
    purpose: "",
    remark: "",
  });

  // Fetch balances from your aggregate route
  const fetchLeaveBalances = async () => {
    setLoadingBalances(true);
    try {
      const response = await fetch("/api/leave-balance");
      const data = await response.json();
      if (data.success) {
        setBalances(data.balances);
      }
    } catch (error) {
      console.error("Failed to load balances:", error);
    } finally {
      setLoadingBalances(false);
    }
  };

  // Run on mount
  useEffect(() => {
    fetchLeaveBalances();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Leave request saved successfully!");
        setGeneratedReqNo(data.requestNo);

        // Reset form inputs
        setFormData({
          leaveAppliedFor: "",
          fromDate: "",
          toDate: "",
          coveringOfficer: "",
          noOfDays: "",
          purpose: "",
          remark: "",
        });

        // Dynamic Refresh: Updates dashboard values instantly
        fetchLeaveBalances();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      alert("Network error. Failed to send request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4 max-w-7xl mx-auto font-sans text-gray-800">
      {/* 1. LEAVE REQUEST ACCORDION */}
      <div className="border border-gray-300 rounded-lg shadow-sm bg-white overflow-hidden">
        <div
          onClick={() => setIsRequestOpen(!isRequestOpen)}
          className="p-4 cursor-pointer hover:bg-gray-50 flex flex-col justify-center transition-colors duration-150"
        >
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-black">
              {isRequestOpen ? "▼" : "▶"}
            </span>
            <h2 className="text-2xl font-bold text-black">Leave Request</h2>
          </div>
          <p className="text-sm text-gray-600 pl-6 mt-1">
            You can make a leave request here.
          </p>
        </div>

        {isRequestOpen && (
          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 p-6 bg-white space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Request No{" "}
                <span className="text-xs text-gray-500 font-normal">
                  (Auto-fill after saving)
                </span>
              </label>
              <input
                type="text"
                disabled
                value={generatedReqNo}
                placeholder={generatedReqNo ? "" : "Auto generated..."}
                className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Leave Applied for <span className="text-red-500">*</span>
              </label>
              <select
                name="leaveAppliedFor"
                required
                value={formData.leaveAppliedFor}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select leave type</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Medical Leave">Medical Leave</option>
                <option value="Annual Leave">Annual Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From *
                </label>
                <input
                  type="date"
                  name="fromDate"
                  required
                  value={formData.fromDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To *
                </label>
                <input
                  type="date"
                  name="toDate"
                  required
                  value={formData.toDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Covering Officer
                </label>
                <select
                  name="coveringOfficer"
                  value={formData.coveringOfficer}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded bg-white"
                >
                  <option value="">Select an officer</option>
                  <option value="Officer A">Officer A</option>
                  <option value="Officer B">Officer B</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  No of Days *
                </label>
                <input
                  type="number"
                  name="noOfDays"
                  required
                  min="0.5"
                  step="0.5"
                  value={formData.noOfDays}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purpose *
              </label>
              <textarea
                name="purpose"
                required
                rows={3}
                value={formData.purpose}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded resize-y"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {loading ? "Saving..." : "Save Request"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 2. LEAVE BALANCE ACCORDION */}
      <div className="border border-gray-300 rounded-lg shadow-sm bg-white overflow-hidden">
        <div
          onClick={() => setIsBalanceOpen(!isBalanceOpen)}
          className="p-4 cursor-pointer hover:bg-gray-50 flex flex-col justify-center transition-colors duration-150"
        >
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-black">
              {isBalanceOpen ? "▼" : "▶"}
            </span>
            <h2 className="text-2xl font-bold text-black">Leave Balance</h2>
          </div>
          <p className="text-sm text-gray-600 pl-6 mt-1">
            You can see your leave balance here.
          </p>
        </div>

        {isBalanceOpen && (
          <div className="border-t border-gray-200 p-4 bg-white">
            {loadingBalances ? (
              <div className="text-sm text-gray-500 p-2">
                Calculating fresh metrics...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="py-2 px-4 font-bold text-gray-700 text-sm">
                        Leave Type
                      </th>
                      <th className="py-2 px-4 font-bold text-gray-700 text-sm">
                        Leave Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {balances.map((row) => (
                      <tr
                        key={row.type}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-2 px-4 font-semibold text-sm text-black">
                          {row.type}
                        </td>
                        <td className="py-2 px-4 text-sm text-black">
                          {row.balance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. LEAVE APPLIED ON 2026 CARD */}
      <div className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white cursor-pointer hover:bg-gray-50">
        <h2 className="text-xl font-bold text-black">
          ▶ Leave Applied on 2026
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          You can see leaves that you have in 2026 here.
        </p>
      </div>
    </div>
  );
}