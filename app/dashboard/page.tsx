
"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {LogOutIcon, UserIcon } from "lucide-react";


export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname(); // Tracks current URL to highlight active tab

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [movementMonth, setMovementMonth] = useState("June 2026");

  // Defined routes mapped to each layout page section
  const navTabs = [
    { name: "Home", href: "/dashboard" },
    { name: "Personal Details", href: "/dashboard/personal-details" },
    { name: "Dependence Details", href: "/dashboard/dependence-details" },
    { name: "Leave", href: "/dashboard/leave" },
    { name: "Disciplinary Details", href: "/dashboard/disciplinary-details" },
    { name: "Job Duty Details", href: "/dashboard/job-duty-details" },
    { name: "Evaluation Details", href: "/dashboard/evaluation-details" },
    { name: "Exam Results", href: "/dashboard/exam-results" },
    { name: "Change Password", href: "/dashboard/change-password" },
    { name: "Covering Officers", href: "/dashboard/covering-officers" },
    { name: "Movement", href: "/dashboard/movement" },
    { name: "Pay", href: "/dashboard/pay" },
  ];

  const handleLogout = () => {
    setIsDropdownOpen(false);
    router.push("/");
  };

  // Determine active section based on current path logic
  const isMovementPage = pathname === "/dashboard/movement";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* Top Header Bar */}
      <header
        className={`flex items-center justify-between border-b px-6 py-4 shadow-sm transition-colors ${
          isDarkMode
            ? "border-gray-800 bg-gray-900"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1 italic">
            <div className="h-6 w-1.5 -skew-x-12 bg-blue-500"></div>
            <div className="h-6 w-1.5 -skew-x-12 bg-green-500"></div>
          </div>
          <span
            className={`text-xl font-bold tracking-wide ${
              isDarkMode ? "text-blue-400" : "text-blue-900"
            }`}
          >
            SLTSERVICES
          </span>
        </div>

        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          SLTS - ERP
        </h1>

        <div
          className={`flex items-center space-x-4 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {/* Theme Icon Button */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`transition-colors p-1.5 rounded-lg ${
              isDarkMode
                ? "text-yellow-400 hover:text-yellow-300 hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>

          {/* Notification Icon */}
          <button
            className={`relative ${
              isDarkMode ? "hover:text-white" : "hover:text-gray-900"
            }`}
          >
            <span className="absolute -right-1 -top-1 flex h-3 w-3 rounded-full bg-red-500"></span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`focus:outline-none flex items-center ${
                isDarkMode ? "hover:text-white" : "hover:text-gray-900"
              }`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                ></div>
                <div
                  className={`absolute right-0 mt-2 w-44 rounded-lg border py-1.5 shadow-xl z-20 ${
                    isDarkMode
                      ? "bg-gray-900 border-gray-800 text-gray-200"
                      : "bg-white border-gray-200 text-gray-700"
                  }`}
                >
                  <button
                    onClick={() => {
                      alert("Viewing details...");
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                      isDarkMode
                        ? "hover:bg-gray-800 text-gray-300"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4" />
                      <span>Profile</span>
                    </div>
                  </button>
                  <hr
                    className={`${
                      isDarkMode ? "border-gray-800" : "border-gray-100"
                    } my-1`}
                  />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <LogOutIcon className="h-4 w-4" />
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs using Next.js Link Components */}
      <nav
        className={`border-b transition-colors ${
          isDarkMode
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200"
        }`}
      >
        <ul
          className={`flex space-x-6 overflow-x-auto whitespace-nowrap px-6 pt-4 text-sm font-medium no-scrollbar ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {navTabs.map((tab, index) => {
            const isActive = pathname === tab.href;
            return (
              <li key={index} className="pb-3">
                <Link
                  href={tab.href}
                  className={`transition-colors pb-3 block ${
                    isActive
                      ? "border-b-2 border-blue-500 text-blue-600 font-bold"
                      : isDarkMode
                      ? "hover:text-gray-200"
                      : "hover:text-blue-600"
                  }`}
                >
                  {tab.name}
                </Link>
              </li>
            );
          })}
          <li className="pb-3">
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              login
            </button>
          </li>
        </ul>
      </nav>

      {/* Content Rendering Block */}
      <main className="mx-auto w-full max-w-7xl px-6 py-6">
        {isMovementPage ? (
          /* ==========================================
             MOVEMENT LAYOUT VIEW
             ========================================== */
          <div className="animate-in fade-in duration-200">
            <h2 className="text-2xl font-bold tracking-tight">Movement</h2>
            <p
              className={`text-sm mt-1 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              You can add your movements here.
            </p>

            {/* Month Control Selectors */}
            <div className="flex items-center space-x-3 mt-4 text-xs font-semibold">
              <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                Month:
              </span>
              <button
                onClick={() => setMovementMonth("June 2026")}
                className={`px-3 py-1.5 rounded flex items-center space-x-1.5 transition ${
                  movementMonth === "June 2026"
                    ? "bg-blue-600 text-white"
                    : isDarkMode
                    ? "bg-gray-900 text-gray-300 hover:bg-gray-800"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                    : isDarkMode
                    ? "bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-800"
                    : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>May 2026</span>
                <span
                  className={`text-[10px] px-1 rounded scale-90 ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-400"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  Previous
                </span>
              </button>
            </div>

            {/* Color Badge Legends Grid */}
            <div className="flex flex-wrap items-center gap-2 mt-5 text-[11px] font-bold">
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded">
                Device
              </span>
              <span
                className={`mr-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Fingerprint / biometric
              </span>

              <span className="bg-gray-500 text-white px-2 py-0.5 rounded">
                Manual
              </span>
              <span
                className={`mr-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                HR-entered correction
              </span>

              <span className="bg-yellow-500 text-white px-2 py-0.5 rounded">
                Mobile
              </span>
              <span
                className={`mr-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Mobile app check-in/out (read-only)
              </span>

              <span className="bg-cyan-500 text-white px-2 py-0.5 rounded">
                Movement
              </span>
              <span
                className={`mr-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Your correction request
              </span>

              <span className="bg-amber-500 text-white px-2 py-0.5 rounded">
                Pending
              </span>
              <span
                className={`mr-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Awaiting approval
              </span>

              <span className="bg-emerald-600 text-white px-2 py-0.5 rounded">
                Approved
              </span>
              <span
                className={`mr-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Counts as attendance
              </span>

              <span className="bg-red-500 text-white px-2 py-0.5 rounded">
                Rejected
              </span>
              <span
                className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Not approved
              </span>
            </div>

            {/* Movement Logs Table Container */}
            <div
              className={`mt-6 overflow-x-auto rounded-lg border ${
                isDarkMode ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr
                    className={`font-bold transition-colors ${
                      isDarkMode
                        ? "bg-gray-900 text-gray-200"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    <th className="p-3 border-r border-gray-700">Source</th>
                    <th className="p-3 border-r border-gray-700">In Date</th>
                    <th className="p-3 border-r border-gray-700">In Time</th>
                    <th className="p-3 border-r border-gray-700">
                      In Location
                    </th>
                    <th className="p-3 border-r border-gray-700">Out Date</th>
                    <th className="p-3 border-r border-gray-700">Out Time</th>
                    <th className="p-3 border-r border-gray-700">
                      Out Location
                    </th>
                    <th className="p-3 border-r border-gray-700">
                      Reason / Cycle
                    </th>
                    <th className="p-3 border-r border-gray-700">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${
                    isDarkMode ? "divide-gray-800" : "divide-gray-200"
                  }`}
                >
                  {/* Monday, June 1 */}
                  <tr
                    className={`font-bold ${
                      isDarkMode ? "bg-gray-900/40" : "bg-gray-50"
                    }`}
                  >
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

                  {/* Tuesday, June 2 */}
                  <tr
                    className={`font-bold ${
                      isDarkMode ? "bg-gray-900/40" : "bg-gray-50"
                    }`}
                  >
                    <td colSpan={10} className="p-2.5 pl-4 text-[13px]">
                      Tue, June 2, 2026
                    </td>
                  </tr>
                  <tr
                    className={`transition-colors ${
                      isDarkMode
                        ? "hover:bg-gray-900/20"
                        : "hover:bg-gray-50/60"
                    }`}
                  >
                    <td className="p-3 pl-4">
                      <span className="bg-cyan-500 text-white px-2 py-0.5 rounded font-bold text-[10px]">
                        Movement
                      </span>
                    </td>
                    <td className="p-3">2026-06-02</td>
                    <td className="p-3 font-medium">8:30 AM</td>
                    <td className="p-3">home</td>
                    <td className="p-3">2026-06-02</td>
                    <td className="p-3 font-medium">5:00 PM</td>
                    <td className="p-3">home</td>
                    <td className="p-3">work from home</td>
                    <td className="p-3">
                      <span className="bg-gray-500 text-white px-2 py-0.5 rounded text-[10px] font-bold opacity-90">
                        approved (Level 1)
                      </span>
                    </td>
                    <td
                      className={`p-3 font-medium ${
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Read-only
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={10} className="p-3 text-center">
                      <button className="border border-emerald-500 text-emerald-500 px-3 py-1 rounded text-xs font-semibold hover:bg-emerald-500/10 transition">
                        + Add Movement
                      </button>
                    </td>
                  </tr>

                  {/* Wednesday, June 3 */}
                  <tr
                    className={`font-bold ${
                      isDarkMode ? "bg-gray-900/40" : "bg-gray-50"
                    }`}
                  >
                    <td colSpan={10} className="p-2.5 pl-4 text-[13px]">
                      Wed, June 3, 2026
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
        ) : (
          /* ==========================================
             GENERIC PROFILE/DEFAULT LAYOUT VIEW
             ========================================== */
          <div className="animate-in fade-in duration-200">
            <div
              className={`relative h-32 w-full rounded-md overflow-hidden transition-colors ${
                isDarkMode ? "bg-blue-950/40" : "bg-blue-100"
              }`}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: isDarkMode
                    ? "linear-gradient(#9ca3af 1px, transparent 1px), linear-gradient(90deg, #9ca3af 1px, transparent 1px)"
                    : "linear-gradient(#4b5563 1px, transparent 1px), linear-gradient(90deg, #4b5563 1px, transparent 1px)",
                  backgroundSize: "100px 50px",
                }}
              ></div>
            </div>

            <div className="flex flex-col items-center mt-6">
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full border-4 text-4xl font-bold text-white shadow-sm transition-colors ${
                  isDarkMode
                    ? "border-gray-900 bg-gray-700"
                    : "border-white bg-gray-400"
                }`}
              >
                W
              </div>

              <h2
                className={`mt-4 text-3xl font-bold transition-colors ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Welcome, K. A. Waji
              </h2>
              <p
                className={`mt-2 text-center transition-colors ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Customize your information to help Waji Services
                <br />
                serve you better and more personally.
              </p>

              <button
                className={`mt-6 rounded-full border px-8 py-3 font-semibold shadow-sm transition relative overflow-hidden group ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700 text-gray-200 hover:bg-gray-800"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
                }`}
              >
                Explore ERP Features
              </button>

              <p
                className={`mt-6 text-sm transition-colors ${
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                You can use profile features by navigating through the tabs
                above.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}