
// "use client";

// import React, { useState } from "react";
// import { usePathname } from "next/navigation";

// export default function DashboardPage() {
//   const pathname = usePathname();
//   const [movementMonth, setMovementMonth] = useState("June 2026");

//   // Determine active view based on current path logic
//   const isMovementPage = pathname === "/dashboard/movement";

//   // Check if dark mode is active from a shared state or class (optional setup)
//   // For now, matching standard text classes based on your view
//   const isDarkMode = false; // Layout will control the global theme wrapper

//   if (isMovementPage) {
//     return (
//       /* ==========================================
//           MOVEMENT LAYOUT VIEW
//          ========================================== */
//       <div className="animate-in fade-in duration-200">
//         <h2 className="text-2xl font-bold tracking-tight">Movement</h2>
//         <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
//           You can add your movements here.
//         </p>

//         {/* Month Control Selectors */}
//         <div className="flex items-center space-x-3 mt-4 text-xs font-semibold">
//           <span className="text-gray-500 dark:text-gray-400">Month:</span>
//           <button
//             onClick={() => setMovementMonth("June 2026")}
//             className={`px-3 py-1.5 rounded flex items-center space-x-1.5 transition ${
//               movementMonth === "June 2026"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
//             }`}
//           >
//             <span>June 2026</span>
//             <span className="bg-blue-500 text-[10px] text-white px-1 rounded scale-90">
//               Current
//             </span>
//           </button>
//           <button
//             onClick={() => setMovementMonth("May 2026")}
//             className={`px-3 py-1.5 rounded border flex items-center space-x-1.5 transition ${
//               movementMonth === "May 2026"
//                 ? "bg-blue-600 text-white border-transparent"
//                 : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
//             }`}
//           >
//             <span>May 2026</span>
//             <span className="text-[10px] px-1 rounded scale-90 bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
//               Previous
//             </span>
//           </button>
//         </div>

//         {/* Color Badge Legends Grid */}
//         <div className="flex flex-wrap items-center gap-2 mt-5 text-[11px] font-bold text-gray-600 dark:text-gray-400">
//           <span className="bg-blue-600 text-white px-2 py-0.5 rounded">
//             Device
//           </span>
//           <span className="mr-2">Fingerprint / biometric</span>

//           <span className="bg-gray-500 text-white px-2 py-0.5 rounded">
//             Manual
//           </span>
//           <span className="mr-2">HR-entered correction</span>

//           <span className="bg-yellow-500 text-white px-2 py-0.5 rounded">
//             Mobile
//           </span>
//           <span className="mr-2">Mobile app check-in/out (read-only)</span>

//           <span className="bg-cyan-500 text-white px-2 py-0.5 rounded">
//             Movement
//           </span>
//           <span className="mr-2">Your correction request</span>
//         </div>

//         {/* Movement Logs Table Container */}
//         <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
//           <table className="w-full border-collapse text-left text-xs">
//             <thead>
//               <tr className="font-bold bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-200">
//                 <th className="p-3 border-r border-gray-700">Source</th>
//                 <th className="p-3 border-r border-gray-700">In Date</th>
//                 <th className="p-3 border-r border-gray-700">In Time</th>
//                 <th className="p-3 border-r border-gray-700">In Location</th>
//                 <th className="p-3 border-r border-gray-700">Out Date</th>
//                 <th className="p-3 border-r border-gray-700">Out Time</th>
//                 <th className="p-3 border-r border-gray-700">Out Location</th>
//                 <th className="p-3 border-r border-gray-700">Reason / Cycle</th>
//                 <th className="p-3 border-r border-gray-700">Status</th>
//                 <th className="p-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//               <tr className="font-bold bg-gray-50 dark:bg-gray-900/40">
//                 <td colSpan={10} className="p-2.5 pl-4 text-[13px]">
//                   Mon, June 1, 2026
//                 </td>
//               </tr>
//               <tr>
//                 <td colSpan={10} className="p-3 text-center">
//                   <button className="border border-emerald-500 text-emerald-500 px-3 py-1 rounded text-xs font-semibold hover:bg-emerald-500/10 transition">
//                     + Add Movement
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   }

//   // DEFAULT PROFILE / HOME VIEW
//   return (
//     <div className="animate-in fade-in duration-200">
//       <div className="relative h-32 w-full rounded-md overflow-hidden bg-blue-100 dark:bg-blue-950/40">
//         <div
//           className="absolute inset-0 opacity-20"
//           style={{
//             backgroundImage:
//               "linear-gradient(#4b5563 1px, transparent 1px), linear-gradient(90deg, #4b5563 1px, transparent 1px)",
//             backgroundSize: "100px 50px",
//           }}
//         ></div>
//       </div>

//       <div className="flex flex-col items-center mt-6">
//         <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 text-4xl font-bold text-white shadow-sm border-white bg-gray-400 dark:border-gray-900 dark:bg-gray-700">
//           W
//         </div>

//         <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
//           Welcome, K. A. Waji
//         </h2>
//         <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
//           Customize your information to help Waji Services
//           <br />
//           serve you better and more personally.
//         </p>

//         <button className="mt-6 rounded-full border px-8 py-3 font-semibold shadow-sm transition bg-white border-gray-300 text-gray-800 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
//           Explore ERP Features
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DashboardPage() {
  const pathname = usePathname();
  const [movementMonth, setMovementMonth] = useState("June 2026");

  // State to hold the dynamic logged-in user name and avatar initial
  const [user, setUser] = useState({ name: "Loading...", initial: "U" });

  // Fetch logged-in user details from the backend session/API route
  useEffect(() => {
    async function fetchUserSession() {
      try {
        // Replace this with your actual session endpoint (e.g., /api/auth/session or /api/user/me)
        const response = await fetch("/api/user/me");
        if (response.ok) {
          const data = await response.json();
          if (data && data.name) {
            setUser({
              name: data.name,
              initial: data.name.charAt(0).toUpperCase(),
            });
          }
        } else {
          setUser({ name: "Guest User", initial: "G" });
        }
      } catch (error) {
        console.error("Failed to fetch user session:", error);
        setUser({ name: "Guest User", initial: "G" });
      }
    }

    fetchUserSession();
  }, []);

  // Determine active view based on current path logic
  const isMovementPage = pathname === "/dashboard/movement";

  if (isMovementPage) {
    return (
      /* ==========================================
          MOVEMENT LAYOUT VIEW
         ========================================== */
      <div className="animate-in fade-in duration-200">
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
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            <span>June 2026</span>
            <span className="bg-blue-500 text-[10px] text-white px-1 rounded scale-90">
              Current
            </span>
          </button>
          <button
            onClick={() => setMovementMonth("May 2026")}
            className={`px-3 py-1.5 rounded border flex items-center space-x-1.5 transition ${
              movementMonth === "May 2026"
                ? "bg-blue-600 text-white border-transparent"
                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            <span>May 2026</span>
            <span className="text-[10px] px-1 rounded scale-90 bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
              Previous
            </span>
          </button>
        </div>

        {/* Color Badge Legends Grid */}
        <div className="flex flex-wrap items-center gap-2 mt-5 text-[11px] font-bold text-gray-600 dark:text-gray-400">
          <span className="bg-blue-600 text-white px-2 py-0.5 rounded">
            Device
          </span>
          <span className="mr-2">Fingerprint / biometric</span>

          <span className="bg-gray-500 text-white px-2 py-0.5 rounded">
            Manual
          </span>
          <span className="mr-2">HR-entered correction</span>

          <span className="bg-yellow-500 text-white px-2 py-0.5 rounded">
            Mobile
          </span>
          <span className="mr-2">Mobile app check-in/out (read-only)</span>

          <span className="bg-cyan-500 text-white px-2 py-0.5 rounded">
            Movement
          </span>
          <span className="mr-2">Your correction request</span>
        </div>

        {/* Table logs */}
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
              <tr className="font-bold bg-gray-50 dark:bg-gray-900/40">
                <td colSpan={10} className="p-2.5 pl-4 text-[13px]">
                  Mon, June 1, 2026
                </td>
              </tr>
              <tr>
                <td colSpan={10} className="p-3 text-center">
                  <button className="border border-emerald-500 text-emerald-500 px-3 py-1 rounded text-xs font-semibold hover:bg-emerald-500/10 transition">
                    + Add Movement
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  /* ==========================================
      DEFAULT PROFILE / HOME VIEW (DYNAMIC NAME)
     ========================================== */
  return (
    <div className="animate-in fade-in duration-200">
      <div className="relative h-32 w-full rounded-md overflow-hidden bg-blue-100 dark:bg-blue-950/40">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(#4b5563 1px, transparent 1px), linear-gradient(90deg, #4b5563 1px, transparent 1px)",
            backgroundSize: "100px 50px",
          }}
        ></div>
      </div>

      <div className="flex flex-col items-center mt-6">
        {/* Dynamic User Profile Badge Initial */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 text-4xl font-bold text-white shadow-sm border-white bg-gray-400 dark:border-gray-900 dark:bg-gray-700">
          {user.initial}
        </div>

        {/* Dynamic Greetings Name */}
        <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
          Welcome, {user.name}
        </h2>

        <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
          Customize your information to help Waji Services
          <br />
          serve you better and more personally.
        </p>

        <button className="mt-6 rounded-full border px-8 py-3 font-semibold shadow-sm transition bg-white border-gray-300 text-gray-800 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
          Explore ERP Features
        </button>
      </div>
    </div>
  );
}