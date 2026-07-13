
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
     
      <div className="animate-in fade-in duration-200">
        {/* Main Container */}
        <div className="relative h-32 w-full rounded-md overflow-hidden bg-blue-100 dark:bg-blue-950/40">
          {/* Static Grid Background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#4b5563 1px, transparent 1px), linear-gradient(90deg, #4b5563 1px, transparent 1px)",
              backgroundSize: "100px 50px",
            }}
          ></div>

          {/* Track Line */}
          <div className="absolute h-[1px] bg-blue-500/30 left-0 right-0 top-[50px]">
            {/* --- LEFT TO RIGHT DOTS --- */}
            <div
              className="absolute top-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
              style={{ animation: "moveRightWhole 6s linear infinite" }}
            ></div>
            <div
              className="absolute top-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
              style={{
                animation: "moveRightWhole 6s linear infinite",
                animationDelay: "2s",
              }}
            ></div>
            <div
              className="absolute top-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
              style={{
                animation: "moveRightWhole 6s linear infinite",
                animationDelay: "4s",
              }}
            ></div>

            {/* --- RIGHT TO LEFT DOTS --- */}
            <div
              className="absolute top-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
              style={{ animation: "moveLeftWhole 6s linear infinite" }}
            ></div>
            <div
              className="absolute top-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
              style={{
                animation: "moveLeftWhole 6s linear infinite",
                animationDelay: "1.5s",
              }}
            ></div>
            <div
              className="absolute top-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
              style={{
                animation: "moveLeftWhole 6s linear infinite",
                animationDelay: "3.5s",
              }}
            ></div>
          </div>
        </div>

        {/* Smooth CSS Keyframes */}
        <style jsx global>{`
          @keyframes moveRightWhole {
            0% {
              transform: translate(-100%, -50%);
              opacity: 0;
              left: 0%;
            }
            5% {
              opacity: 1;
            }
            95% {
              opacity: 1;
            }
            100% {
              transform: translate(0%, -50%);
              opacity: 0;
              left: 100%;
            }
          }
          @keyframes moveLeftWhole {
            0% {
              transform: translate(0%, -50%);
              opacity: 0;
              left: 100%;
            }
            5% {
              opacity: 1;
            }
            95% {
              opacity: 1;
            }
            100% {
              transform: translate(-100%, -50%);
              opacity: 0;
              left: 0%;
            }
          }
        `}</style>
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


// "use client";

// import React, { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";

// export default function DashboardPage() {
//   const pathname = usePathname();
//   const [movementMonth, setMovementMonth] = useState("June 2026");

//   // State to hold the dynamic logged-in user name and avatar initial
//   const [user, setUser] = useState({ name: "Loading...", initial: "U" });

//   // Fetch logged-in user details from the backend session/API route
//   useEffect(() => {
//     async function fetchUserSession() {
//       try {
//         const response = await fetch("/api/user/me");
//         if (response.ok) {
//           const data = await response.json();
//           if (data && data.name) {
//             setUser({
//               name: data.name,
//               initial: data.name.charAt(0).toUpperCase(),
//             });
//           }
//         } else {
//           setUser({ name: "Guest User", initial: "G" });
//         }
//       } catch (error) {
//         console.error("Failed to fetch user session:", error);
//         setUser({ name: "Guest User", initial: "G" });
//       }
//     }

//     fetchUserSession();
//   }, []);

//   // Determine active view based on current path logic
//   const isMovementPage = pathname === "/dashboard/movement";

//   if (isMovementPage) {
//     return (
//       /* ==========================================
//           MOVEMENT LAYOUT VIEW (RESPONSIVE)
//          ========================================== */
//       <div className="animate-in fade-in duration-200 px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
//         <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//           Movement
//         </h2>
//         <p className="text-xs md:text-sm mt-1 text-gray-500 dark:text-gray-400">
//           You can add your movements here.
//         </p>

//         {/* Month Control Selectors */}
//         <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-semibold">
//           <span className="text-gray-500 dark:text-gray-400 mr-1">Month:</span>
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

//         {/* Color Badge Legends Grid - Responsive stacked layouts for tight device glass sizes */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap items-start lg:items-center gap-x-4 gap-y-2 mt-5 text-[11px] font-bold text-gray-600 dark:text-gray-400">
//           <div className="flex items-center space-x-2">
//             <span className="bg-blue-600 text-white px-2 py-0.5 rounded min-w-[70px] text-center shrink-0">
//               Device
//             </span>
//             <span>Fingerprint / biometric</span>
//           </div>

//           <div className="flex items-center space-x-2">
//             <span className="bg-gray-500 text-white px-2 py-0.5 rounded min-w-[70px] text-center shrink-0">
//               Manual
//             </span>
//             <span>HR-entered correction</span>
//           </div>

//           <div className="flex items-center space-x-2">
//             <span className="bg-yellow-500 text-white px-2 py-0.5 rounded min-w-[70px] text-center shrink-0">
//               Mobile
//             </span>
//             <span>Mobile app check-in/out (read-only)</span>
//           </div>

//           <div className="flex items-center space-x-2">
//             <span className="bg-cyan-500 text-white px-2 py-0.5 rounded min-w-[70px] text-center shrink-0">
//               Movement
//             </span>
//             <span>Your correction request</span>
//           </div>
//         </div>

//         {/* Table logs - Added overflow wrapping to prevent breaking column tables on smartphones */}
//         <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950">
//           <table className="w-full min-w-[900px] border-collapse text-left text-xs">
//             <thead>
//               <tr className="font-bold bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-200">
//                 <th className="p-3 border-r border-gray-700/50">Source</th>
//                 <th className="p-3 border-r border-gray-700/50">In Date</th>
//                 <th className="p-3 border-r border-gray-700/50">In Time</th>
//                 <th className="p-3 border-r border-gray-700/50">In Location</th>
//                 <th className="p-3 border-r border-gray-700/50">Out Date</th>
//                 <th className="p-3 border-r border-gray-700/50">Out Time</th>
//                 <th className="p-3 border-r border-gray-700/50">
//                   Out Location
//                 </th>
//                 <th className="p-3 border-r border-gray-700/50">
//                   Reason / Cycle
//                 </th>
//                 <th className="p-3 border-r border-gray-700/50">Status</th>
//                 <th className="p-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//               <tr className="font-bold bg-gray-50 dark:bg-gray-900/40">
//                 <td
//                   colSpan={10}
//                   className="p-2.5 pl-4 text-[13px] text-gray-700 dark:text-gray-300"
//                 >
//                   Mon, June 1, 2026
//                 </td>
//               </tr>
//               <tr>
//                 <td colSpan={10} className="p-4 text-center">
//                   <button className="border border-emerald-500 text-emerald-500 px-4 py-2 rounded text-xs font-semibold hover:bg-emerald-500/10 transition active:scale-95">
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

//   /* ==========================================
//       DEFAULT PROFILE / HOME VIEW (RESPONSIVE)
//      ========================================== */
//   return (
//     <div className="animate-in fade-in duration-200 px-4 py-6 md:py-12 max-w-xl mx-auto w-full">
//       <div>
//         {/* Main Banner Container - Variable dynamic height scale */}
//         <div className="relative h-24 sm:h-28 md:h-32 w-full rounded-xl overflow-hidden bg-blue-100 dark:bg-blue-950/40 border border-blue-200/10">
//           {/* Static Grid Background */}
//           <div
//             className="absolute inset-0 opacity-20"
//             style={{
//               backgroundImage:
//                 "linear-gradient(#4b5563 1px, transparent 1px), linear-gradient(90deg, #4b5563 1px, transparent 1px)",
//               backgroundSize: "100px 50px",
//             }}
//           ></div>

//           {/* Track Line - Moves dynamically on mobile */}
//           <div className="absolute h-[1px] bg-blue-500/30 left-0 right-0 top-[40px] sm:top-[50px]">
//             {/* --- LEFT TO RIGHT DOTS --- */}
//             <div
//               className="absolute top-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
//               style={{ animation: "moveRightWhole 6s linear infinite" }}
//             ></div>
//             <div
//               className="absolute top-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
//               style={{
//                 animation: "moveRightWhole 6s linear infinite",
//                 animationDelay: "2s",
//               }}
//             ></div>
//             <div
//               className="absolute top-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
//               style={{
//                 animation: "moveRightWhole 6s linear infinite",
//                 animationDelay: "4s",
//               }}
//             ></div>

//             {/* --- RIGHT TO LEFT DOTS --- */}
//             <div
//               className="absolute top-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
//               style={{ animation: "moveLeftWhole 6s linear infinite" }}
//             ></div>
//             <div
//               className="absolute top-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
//               style={{
//                 animation: "moveLeftWhole 6s linear infinite",
//                 animationDelay: "1.5s",
//               }}
//             ></div>
//             <div
//               className="absolute top-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
//               style={{
//                 animation: "moveLeftWhole 6s linear infinite",
//                 animationDelay: "3.5s",
//               }}
//             ></div>
//           </div>
//         </div>

//         {/* Smooth CSS Keyframes */}
//         <style jsx global>{`
//           @keyframes moveRightWhole {
//             0% {
//               transform: translate(-100%, -50%);
//               opacity: 0;
//               left: 0%;
//             }
//             5% {
//               opacity: 1;
//             }
//             95% {
//               opacity: 1;
//             }
//             100% {
//               transform: translate(0%, -50%);
//               opacity: 0;
//               left: 100%;
//             }
//           }
//           @keyframes moveLeftWhole {
//             0% {
//               transform: translate(0%, -50%);
//               opacity: 0;
//               left: 100%;
//             }
//             5% {
//               opacity: 1;
//             }
//             95% {
//               opacity: 1;
//             }
//             100% {
//               transform: translate(-100%, -50%);
//               opacity: 0;
//               left: 0%;
//             }
//           }
//         `}</style>
//       </div>

//       {/* Profile info alignment adjustments */}
//       <div className="flex flex-col items-center mt-[-40px] sm:mt-[-48px] relative z-10 text-center px-2">
//         {/* Dynamic User Profile Badge Initial */}
//         <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border-4 text-3xl sm:text-4xl font-bold text-white shadow-md border-white bg-gray-400 dark:border-gray-950 dark:bg-gray-700">
//           {user.initial}
//         </div>

//         {/* Responsive Text Headers */}
//         <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
//           Welcome, {user.name}
//         </h2>

//         <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
//           Customize your information to help Waji Services
//           <br className="hidden sm:inline" /> serve you better and more
//           personally.
//         </p>

//         {/* Expands full-width on mobile viewports for easy thumb actions */}
//         <button className="mt-6 w-full sm:w-auto rounded-full border px-8 py-3 text-sm font-semibold shadow-sm transition bg-white border-gray-300 text-gray-800 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 active:scale-[0.98]">
//           Explore ERP Features
//         </button>
//       </div>
//     </div>
//   );
// }