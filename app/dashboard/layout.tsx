// "use client";

// import React, { useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Link from "next/link";
// import { LogOutIcon, UserIcon } from "lucide-react";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navTabs = [
//     { name: "Home", href: "/dashboard" },
//     { name: "Personal Details", href: "/dashboard/personal-details" },
//     { name: "Dependence Details", href: "/dashboard/dependence-details" },
//     { name: "Leave", href: "/dashboard/leave" },
//     { name: "Disciplinary Details", href: "/dashboard/disciplinary-details" },
//     { name: "Job Duty Details", href: "/dashboard/job-duty-details" },
//     { name: "Evaluation Details", href: "/dashboard/evaluation-details" },
//     { name: "Exam Results", href: "/dashboard/exam-results" },
//     { name: "Change Password", href: "/dashboard/change-password" },
//     { name: "Covering Officers", href: "/dashboard/covering-officers" },
//     { name: "Movement", href: "/dashboard/movement" },
//     { name: "Pay", href: "/dashboard/pay" },
//   ];

//   const handleLogout = () => {
//     setIsDropdownOpen(false);
//     router.push("/");
//   };

//   return (
//     <div
//       className={`min-h-screen transition-colors duration-300 ${
//         isDarkMode ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"
//       }`}
//     >
//       {/* Top Header Bar */}
//       <header
//         className={`flex items-center justify-between border-b px-6 py-4 shadow-sm transition-colors ${
//           isDarkMode
//             ? "border-gray-800 bg-gray-900"
//             : "border-gray-200 bg-white"
//         }`}
//       >
//         {/* Logo and Title */}
//         <div className="flex items-center space-x-2">
                
//             <div className="flex h-14 w-12 items-center justify-center">
//               <svg
//                 className="h-full w-full"
//                 viewBox="0 0 100 100"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <rect
//                   x="28"
//                   y="10"
//                   width="12"
//                   height="42"
//                   rx="6"
//                   transform="rotate(25 34 31)"
//                   fill="#1eaae6"
//                 />
//                 <rect
//                   x="28"
//                   y="50"
//                   width="12"
//                   height="42"
//                   rx="6"
//                   transform="rotate(25 34 71)"
//                   fill="#0051b3"
//                 />
//                 <circle cx="62" cy="54" r="5" fill="#4bc449" />
//                 <rect
//                   x="68"
//                   y="42"
//                   width="12"
//                   height="48"
//                   rx="6"
//                   transform="rotate(25 74 66)"
//                   fill="#4bc449"
//                 />
//               </svg>
//             </div>
        

//           <span
//             className={`text-3xl font-bold tracking-wide ${
//               isDarkMode ? "text-blue-400" : "text-blue-900"
//             }`}
//           >
//             WLTSERVICES
//           </span>
//         </div>

//         {/* Title */}
//         <h1
//           className={`text-3xl font-bold ${
//             isDarkMode ? "text-gray-100" : "text-gray-800"
//           }`}
//         >
//           WLTS - HRIS
//         </h1>

//         {/* Icons and Profile Dropdown */}
//         <div className="flex items-center space-x-4">
//           {/* Theme Toggle */}
//           <button
//             onClick={() => setIsDarkMode(!isDarkMode)}
//             className={`p-1.5 rounded-lg transition-colors ${
//               isDarkMode
//                 ? "text-yellow-400 hover:text-yellow-300 hover:bg-gray-800"
//                 : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//             }`}
//             title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
//           >
//             {/* Sun/Moon Icon */}
//             <svg
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
//               />
//             </svg>
//           </button>

//           {/* Notifications */}
//           <button
//             className={`relative ${
//               isDarkMode ? "hover:text-white" : "hover:text-gray-900"
//             }`}
//           >
//             <span className="absolute -right-1 -top-1 flex h-3 w-3 rounded-full bg-red-500"></span>
//             {/* Bell Icon */}
//             <svg
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//               />
//             </svg>
//           </button>

//           {/* Profile Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               className={`focus:outline-none flex items-center ${
//                 isDarkMode ? "hover:text-white" : "hover:text-gray-900"
//               }`}
//             >
//               {/* User Icon */}
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </button>

//             {isDropdownOpen && (
//               <>
//                 {/* Overlay to close dropdown on outside click */}
//                 <div
//                   className="fixed inset-0 z-10"
//                   onClick={() => setIsDropdownOpen(false)}
//                 ></div>
//                 {/* Dropdown Menu */}
//                 <div
//                   className={`absolute right-0 mt-2 w-44 rounded-lg border py-1.5 shadow-xl z-20 ${
//                     isDarkMode
//                       ? "bg-gray-900 border-gray-800 text-gray-200"
//                       : "bg-white border-gray-200 text-gray-700"
//                   }`}
//                 >
//                   <button
//                     onClick={() => {
//                       alert("Viewing details...");
//                       setIsDropdownOpen(false);
//                     }}
//                     className={`block w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
//                       isDarkMode
//                         ? "hover:bg-gray-800 text-gray-300"
//                         : "hover:bg-gray-100 text-gray-700"
//                     }`}
//                   >
//                     <div className="flex items-center gap-2">
//                       <UserIcon className="h-4 w-4" />
//                       <span>Profile</span>
//                     </div>
//                   </button>
//                   <hr
//                     className={`${
//                       isDarkMode ? "border-gray-800" : "border-gray-100"
//                     } my-1`}
//                   />
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-left px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
//                   >
//                     <div className="flex items-center gap-2">
//                       <LogOutIcon className="h-4 w-4" />
//                       <span>Logout</span>
//                     </div>
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Hamburger Menu for Small Screens */}
//         <div className="sm:hidden ml-4">
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="p-2 rounded-lg focus:outline-none hover:bg-gray-100"
//             aria-label="Toggle Menu"
//           >
//             {/* Hamburger Icon */}
//             <svg
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               {isMobileMenuOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 18L18 6M6 6l12 12"
//                 /> // Cross icon
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 /> // Hamburger icon
//               )}
//             </svg>
//           </button>
//         </div>
//       </header>

//       {/* Navigation Tabs */}
//       <nav
//         className={`border-b transition-colors ${
//           isDarkMode
//             ? "bg-gray-900 border-gray-800"
//             : "bg-white border-gray-200"
//         }`}
//       >
//         <ul
//           className={`flex space-x-6 overflow-x-auto whitespace-nowrap px-6 pt-4 text-sm font-medium no-scrollbar ${
//             isDarkMode ? "text-gray-400" : "text-gray-600"
//           }`}
//         >
//           {navTabs.map((tab, index) => {
//             const isActive = pathname === tab.href;
//             return (
//               <li key={index} className="pb-3">
//                 <Link
//                   href={tab.href}
//                   className={`transition-colors pb-3 block ${
//                     isActive
//                       ? "border-b-2 border-blue-500 text-blue-600 font-bold"
//                       : isDarkMode
//                       ? "hover:text-gray-200"
//                       : "hover:text-blue-600"
//                   }`}
//                 >
//                   {tab.name}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* Main Content */}
//       <main className="mx-auto w-full max-w-7xl px-4 py-6">{children}</main>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Users,
  // GitBranch,
  Calendar,
  AlertTriangle,
  Briefcase,
  TrendingUp,
  GraduationCap,
  UserCheck,
  Footprints,
  Banknote,
  ClipboardList,
  ShoppingBag,
  Laptop,
  LogOut,
  Moon,
  Sun,
  Bell,
  CheckCircle2,
} from "lucide-react";

interface ServiceCard {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

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



  const dashboardCards: ServiceCard[] = [
    {
      title: "Personal Details",
      description: "Your information",
      href: "/dashboard/personal-details",
      icon: User,
    },
    {
      title: "Dependence Details",
      description: "Your dependents",
      href: "/dashboard/dependence-details",
      icon: Users,
    },
    // {
    //   title: "Approval Hierarchy",
    //   description: "Your approvals",
    //   href: "/dashboard/approval-hierarchy",
    //   icon: GitTree,
    // },
    {
      title: "Leave",
      description: "Manage leave",
      href: "/dashboard/leave",
      icon: Calendar,
    },
    {
      title: "Disciplinary Details",
      description: "Disciplinary records",
      href: "/dashboard/disciplinary-details",
      icon: AlertTriangle,
    },
    {
      title: "Job Duty Details",
      description: "Assigned duties",
      href: "/dashboard/job-duty-details",
      icon: Briefcase,
    },
    {
      title: "Evaluation Details",
      description: "Performance reviews",
      href: "/dashboard/evaluation-details",
      icon: TrendingUp,
    },
    {
      title: "Exam Results",
      description: "Exam history",
      href: "/dashboard/exam-results",
      icon: GraduationCap,
    },
    {
      title: "Covering Officers",
      description: "Covering officers",
      href: "/dashboard/covering-officers",
      icon: UserCheck,
    },
    {
      title: "Movement",
      description: "Your movements",
      href: "/dashboard/movement",
      icon: Footprints,
    },
    {
      title: "Payslip",
      description: "Salary details",
      href: "/dashboard/pay",
      icon: Banknote,
    },
    {
      title: "Work Request",
      description: "Request work",
      href: "/dashboard/work-request",
      icon: ClipboardList,
    },
    {
      title: "Merchandise Request",
      description: "Request items",
      href: "/dashboard/merchandise-request",
      icon: ShoppingBag,
    },
    {
      title: "Assigned Assets",
      description: "Company equipment",
      href: "/dashboard/assigned-assets",
      icon: Laptop,
    },
  ];

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
        {/* Welcome Banner */}
        <div
          className={`mb-8 flex flex-col items-start justify-between gap-4 rounded-2xl border p-6 shadow-xs md:flex-row md:items-center ${
            isDarkMode
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-center space-x-4">
            <div />
            {/* className="h-14 w-14 rounded-full bg-gray-300 dark:bg-gray-700" */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 text-4xl font-bold text-white shadow-sm border-white bg-gray-400 dark:border-gray-900 dark:bg-gray-700">
              {user.initial}
            </div>
            <div>
              {/* Dynamic Greetings Name */}
              <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                Welcome, {user.name}
              </h2>
              <h2 className="text-xl font-bold">Good morning</h2>
              <div className="h-1 w-4 bg-gray-400 mt-1 mb-2" />
              <p
                className={`text-sm max-w-md ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Your Sri Lanka Telecom (Services) workspace for managing your
                work, information and everyday tasks.
              </p>
            </div>
          </div>
          <button className="rounded-full border border-green-600 px-5 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-green-50 dark:text-gray-200 dark:hover:bg-gray-800">
            Explore ERP Features
          </button>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
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

                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                      {card.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Page Content */}
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}