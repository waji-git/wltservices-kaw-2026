

"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LogOutIcon, UserIcon } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* Top Header Bar */}
      <header
        className={`flex items-center justify-between border-b px-4 py-3 shadow-sm transition-colors sm:px-6 ${
          isDarkMode
            ? "border-gray-800 bg-gray-900"
            : "border-gray-200 bg-white"
        }`}
      >
        {/* Logo and Title */}
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
            WLTSERVICES
          </span>
        </div>

        {/* Title */}
        <h1
          className={`text-xl font-bold ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          WLTS - ERP
        </h1>

        {/* Icons and Profile Dropdown */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-1.5 rounded-lg transition-colors ${
              isDarkMode
                ? "text-yellow-400 hover:text-yellow-300 hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {/* Sun/Moon Icon */}
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

          {/* Notifications */}
          <button
            className={`relative ${
              isDarkMode ? "hover:text-white" : "hover:text-gray-900"
            }`}
          >
            <span className="absolute -right-1 -top-1 flex h-3 w-3 rounded-full bg-red-500"></span>
            {/* Bell Icon */}
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
              {/* User Icon */}
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
                {/* Overlay to close dropdown on outside click */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                ></div>
                {/* Dropdown Menu */}
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

        {/* Hamburger Menu for Small Screens */}
        <div className="sm:hidden ml-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg focus:outline-none hover:bg-gray-100"
            aria-label="Toggle Menu"
          >
            {/* Hamburger Icon */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                /> // Cross icon
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                /> // Hamburger icon
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Navigation Tabs - Responsive */}
      {/* Show as horizontal tabs on larger screens, drawer on small screens */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-gray-50 border-b border-gray-200">
          <ul className="flex flex-col space-y-2 px-4 py-2 text-sm font-medium">
            {navTabs.map((tab, index) => {
              const isActive = pathname === tab.href;
              return (
                <li key={index}>
                  <Link
                    href={tab.href}
                    className={`block px-2 py-2 rounded ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                  >
                    {tab.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <nav
        className={`border-b transition-colors ${
          isDarkMode
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Desktop Tabs */}
        <ul className="hidden sm:flex space-x-6 overflow-x-auto whitespace-nowrap px-6 pt-4 text-sm font-medium no-scrollbar">
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
        </ul>
      </nav>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}