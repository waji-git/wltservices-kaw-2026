

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  LogOut,
  Moon,
  Sun,
  Bell,
  CheckCircle2,
} from "lucide-react";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
 const [user, setUser] = useState({ name: "Loading...", initial: "U" });
 
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


  const handleLogout = () => {
    setIsDropdownOpen(false);
    router.push("/");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50/50 text-gray-900"
      }`}
    >
      {/* Top Header Bar */}
      <header
        className={`flex items-center justify-between border-b px-8 py-4 shadow-sm transition-colors ${
          isDarkMode
            ? "border-gray-800 bg-gray-900"
            : "border-gray-200 bg-white"
        }`}
      >
        {/* SLTSERVICES Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center">
            <svg
              className="h-full w-full"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="28"
                y="10"
                width="12"
                height="42"
                rx="6"
                transform="rotate(25 34 31)"
                fill="#1eaae6"
              />
              <rect
                x="28"
                y="50"
                width="12"
                height="42"
                rx="6"
                transform="rotate(25 34 71)"
                fill="#0051b3"
              />
              <circle cx="62" cy="54" r="5" fill="#4bc449" />
              <rect
                x="68"
                y="42"
                width="12"
                height="48"
                rx="6"
                transform="rotate(25 74 66)"
                fill="#4bc449"
              />
            </svg>
          </div>
          <span
            className={`text-2xl font-black tracking-tight ${
              isDarkMode ? "text-blue-400" : "text-[#0051b3]"
            }`}
          >
            WLTSERVICES
          </span>
        </div>

        {/* Header Title */}
        <h1
          className={`text-2xl font-black tracking-tight ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          WLTS - HRIS
        </h1>

        {/* Action Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`rounded-lg p-2 transition-colors ${
              isDarkMode
                ? "text-yellow-400 hover:bg-gray-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <button
            className={`relative p-2 ${
              isDarkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-700 hover:text-black"
            }`}
          >
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            <Bell className="h-5 w-5" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center text-gray-700 focus:outline-none dark:text-gray-200"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700">
                <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </div>
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div
                  className={`absolute right-0 z-20 mt-2 w-48 rounded-lg border py-1.5 shadow-xl ${
                    isDarkMode
                      ? "border-gray-800 bg-gray-900 text-gray-200"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">          

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {[
              // { href: "/module1", title: "Module 1", description: "Description 1" },
             
            ].map((card, index) => (
              <Link
                key={index}
                href={card.href}
                className={`group relative flex items-center justify-between rounded-2xl border p-5 shadow-2xs transition-all duration-200 hover:shadow-md ${
                  isDarkMode
                    ? "border-gray-800 bg-gray-900 hover:border-gray-700"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                {/* Active Checkmark Badge */}
                <CheckCircle2 className="absolute top-2.5 right-2.5 h-4 w-4 fill-emerald-500 text-white" />
               
              </Link>
            ))}
          
        </div>

        {/* Page Content */}
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}