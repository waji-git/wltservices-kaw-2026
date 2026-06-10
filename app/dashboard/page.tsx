import React from "react";

export default function DashboardPage() {
  const navTabs = [
    "Home",
    "Personal Details",
    "Dependence Details",
    "Leave",
    "Disciplinary Details",
    "Job Duty Details",
    "Evaluation Details",
    "Exam Results",
    "Change Password",
    "Covering Officers",
    "Movement",
    "Pay",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between border-b px-6 py-4 shadow-sm">
        <div className="flex items-center space-x-2">
          {/* Simulated SLT Logo */}
          <div className="flex space-x-1 italic">
            <div className="h-6 w-1.5 -skew-x-12 bg-blue-500"></div>
            <div className="h-6 w-1.5 -skew-x-12 bg-green-500"></div>
          </div>
          <span className="text-xl font-bold tracking-wide text-blue-900">
            WAJISERVICES
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800">KAWS - ERP</h1>

        <div className="flex items-center space-x-4 text-gray-600">
          {/* Theme Icon */}
          <button className="hover:text-gray-900">
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
          <button className="relative hover:text-gray-900">
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
          {/* Profile Icon */}
          <button className="hover:text-gray-900">
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
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b bg-white">
        <ul className="flex space-x-6 overflow-x-auto whitespace-nowrap px-6 pt-4 text-sm font-medium text-gray-600 no-scrollbar">
          {navTabs.map((tab, index) => (
            <li key={index} className="pb-3">
              <a
                href="#"
                className={`hover:text-blue-600 ${
                  tab === "Home"
                    ? "border-b-2 border-blue-500 pb-3 text-blue-500"
                    : ""
                }`}
              >
                {tab}
              </a>
            </li>
          ))}
          <li className="pb-3">
            <button className="text-gray-400 hover:text-gray-600">•••</button>
          </li>
        </ul>
      </nav>

      <main className="mx-auto w-full max-w-5*4 px-2 py-0 ">
        {/* Blue Banner Background */}
        <div className="relative h-34 w-full rounded-md bg-blue-100 overflow-hidden m-12 ">
          {/* Decorative grid lines */}
          <div
            className="absolute inset-0 opacity-20 "
            style={{
              backgroundImage:
                "linear-gradient(#4b5563 1px, transparent 1px), linear-gradient(90deg, #4b5563 1px, transparent 1px)",
              backgroundSize: "100px 30px",
            }}
          ></div>
        </div>

        {/* Profile Section (Overlapping) */}
        <div className="flex flex-col items-center -mt-12 ">
          {/* Avatar */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gray-400 text-4xl text-white shadow-sm">
            K
          </div>

          {/* Welcome Text */}
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Welcome, Kelambi Arachchige
          </h2>
          <p className="mt-2 text-center text-gray-500">
            Customize your information to help KAW Services
            <br />
            serve you better and more personally.
          </p>

          {/* Action Button */}
          <button className="mt-6 rounded-full border border-gray-300 bg-white px-8 py-3 font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50 focus:ring-2 focus:ring-purple-300 relative overflow-hidden group">
            {/* Gradient border effect simulated with text styling */}
            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent group-hover:text-gray-800 transition-all absolute inset-0 rounded-full border-[2px] opacity-50 pointer-events-none"></span>
            Explore ERP Features
          </button>

          <p className="mt-6 text-sm text-gray-500">
            You can use profile features by navigating through the tabs above.
          </p>
        </div>
      </main>
    </div>
  );
}
