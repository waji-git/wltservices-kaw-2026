
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

