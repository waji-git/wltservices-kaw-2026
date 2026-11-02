
// "use client";

// import React, { useState, useEffect } from "react";
// // import { useTheme } from "next-themes";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import {
//   User,
//   Users,
//   // GitBranch,
//   Calendar,
//   AlertTriangle,
//   Briefcase,
//   TrendingUp,
//   GraduationCap,
//   UserCheck,
//   Footprints,
//   Banknote,
//   ClipboardList,
//   ShoppingBag,
//   Laptop,
//   CheckCircle2,
// } from "lucide-react";

// interface ServiceCard {
//   title: string;
//   description: string;
//   href: string;
//   icon: React.ElementType;
// }
// // Removed redundant top-level useState and useEffect calls



// export default function DashboardPage() {
//   const pathname = usePathname();


//   // State to hold the dynamic logged-in user name and avatar initial
//   const [user, setUser] = useState({ name: "Loading...", initial: "U" });

//   // Fetch logged-in user details from the backend session/API route
//   useEffect(() => {
//     async function fetchUserSession() {
//       try {
//         // Replace this with your actual session endpoint (e.g., /api/auth/session or /api/user/me)
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
  

//   const dashboardCards: ServiceCard[] = [
//     {
//       title: "Personal Details",
//       description: "Your information",
//       href: "/dashboard/personal-details",
//       icon: User,
//     },
//     {
//       title: "Dependence Details",
//       description: "Your dependents",
//       href: "/dashboard/dependence-details",
//       icon: Users,
//     },
 
//     {
//       title: "Leave",
//       description: "Manage leave",
//       href: "/dashboard/leave",
//       icon: Calendar,
//     },
//     {
//       title: "Disciplinary Details",
//       description: "Disciplinary records",
//       href: "/dashboard/disciplinary-details",
//       icon: AlertTriangle,
//     },
//     {
//       title: "Job Duty Details",
//       description: "Assigned duties",
//       href: "/dashboard/job-duty-details",
//       icon: Briefcase,
//     },
//     {
//       title: "Evaluation Details",
//       description: "Performance reviews",
//       href: "/dashboard/evaluation-details",
//       icon: TrendingUp,
//     },
//     {
//       title: "Exam Results",
//       description: "Exam history",
//       href: "/dashboard/exam-results",
//       icon: GraduationCap,
//     },
//     {
//       title: "Covering Officers",
//       description: "Covering officers",
//       href: "/dashboard/covering-officers",
//       icon: UserCheck,
//     },
//     {
//       title: "Movement",
//       description: "Your movements",
//       href: "/dashboard/movement",
//       icon: Footprints,
//     },
//     {
//       title: "Payslip",
//       description: "Salary details",
//       href: "/dashboard/pay",
//       icon: Banknote,
//     },
//     {
//       title: "Work Request",
//       description: "Request work",
//       href: "/dashboard/work-request",
//       icon: ClipboardList,
//     },
//     {
//       title: "Merchandise Request",
//       description: "Request items",
//       href: "/dashboard/merchandise-request",
//       icon: ShoppingBag,
//     },
//     {
//       title: "Assigned Assets",
//       description: "Company equipment",
//       href: "/dashboard/assigned-assets",
//       icon: Laptop,
//     },
//   ];

//   return (
//     <div>
//       <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 text-4xl font-bold text-white shadow-sm border-white bg-gray-400 dark:border-gray-900 dark:bg-gray-700">
//         {user.initial}
//       </div>
//       <div>
//         {/* Dynamic Greetings Name */}
//         <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
//           Welcome, {user.name}
//         </h2>
//         <h2 className="text-xl font-bold">Good morning</h2>
       
//       </div>

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         {dashboardCards.map((card, index) => {
//           const IconComponent = card.icon;
//           return (
//             <Link
//               key={index}
//               href={card.href}
//               // className={`group relative flex items-center justify-between rounded-2xl border p-5 shadow-2xs transition-all duration-200 hover:shadow-md ${
//               //   isDarkMode
//               //     ? "border-gray-800 bg-gray-900 hover:border-gray-700"
//               //     : "border-gray-200 bg-white hover:border-gray-300"
//               // }`}
//             >
//               {/* Active Checkmark Badge */}
//               <CheckCircle2 className="absolute top-2.5 right-2.5 h-4 w-4 fill-emerald-500 text-white" />

//               <div className="flex items-start space-x-4">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
//                   <IconComponent className="h-5 w-5" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">
//                     {card.title}
//                   </h3>
//                   <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
//                     {card.description}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Users,
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
  CheckCircle2,
  Clock,
  Hourglass,
  Plus,
  Camera,
  CalendarDays,
  FileText,
} from "lucide-react";

interface ServiceCard {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

interface DashboardData {
  user: {
    name: string;
    initial: string;
    designation: string;
    department: string;
    avatarUrl?: string;
  };
  stats: {
    casualLeaveLeft: number;
    casualLeaveTotal: number;
    daysPresent: number;
    workingDaysOctober: number;
    overtimeApproved: string;
    overtimePending: string;
    requestsWaiting: number;
  };
  leaveBalances: {
    title: string;
    used: number;
    total: number;
    color: string;
  }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard summary data from MongoDB-backed API route
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch("/api/dashboard/stats");
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          // Fallback demo state if API is not yet seeded
          setData({
            user: {
              name: "K. A. Kelambi Arachchige",
              initial: "K",
              designation: "Technical Officer",
              department: "SI, Software",
            },
            stats: {
              casualLeaveLeft: 0.5,
              casualLeaveTotal: 5.5,
              daysPresent: 11,
              workingDaysOctober: 18,
              overtimeApproved: "0h",
              overtimePending: "0h waiting for approval",
              requestsWaiting: 1,
            },
            leaveBalances: [
              {
                title: "Casual Leave",
                used: 0.5,
                total: 5.5,
                color: "text-blue-500",
              },
              {
                title: "Annual Leave",
                used: 14,
                total: 14,
                color: "text-blue-600",
              },
              {
                title: "Medical Leave",
                used: 13,
                total: 14,
                color: "text-emerald-500",
              },
            ],
          });
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
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

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const currentDateString = new Date()
    .toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .toUpperCase();

  return (
    <div className="space-y-8 pb-12">
      {/* 1. HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        {/* Background decorative dots/glow */}
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-5">
            {/* User Avatar with Edit Badge */}
            <div className="relative">
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border-4 border-slate-700 bg-gradient-to-br from-emerald-400 to-teal-600 text-3xl font-bold text-white shadow-md">
                {data?.user.initial || "U"}
              </div>
              <button
                title="Change Avatar"
                className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-white shadow hover:bg-teal-500 transition"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>

            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-wider text-teal-400 uppercase">
                {currentDateString}
              </p>
              <h1 className="mt-1 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Good morning, {data?.user.name}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 font-medium">
                {data?.user.designation} •{" "}
                <span className="text-teal-300">{data?.user.department}</span>
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/leave/apply"
              className="flex items-center space-x-2 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-slate-700 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition backdrop-blur-md"
            >
              <Plus className="h-4 w-4 text-teal-400" />
              <span>Apply for leave</span>
            </Link>
            <Link
              href="/dashboard/overtime"
              className="flex items-center space-x-2 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-slate-700 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition backdrop-blur-md"
            >
              <Clock className="h-4 w-4 text-teal-400" />
              <span>Claim over time</span>
            </Link>
            <Link
              href="/dashboard/movement/add"
              className="flex items-center space-x-2 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-slate-700 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition backdrop-blur-md"
            >
              <Footprints className="h-4 w-4 text-teal-400" />
              <span>Add movement</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. STATS CARDS ROW */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:border-teal-500/50 transition">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">
              Casual Leave Left
            </span>
            <CalendarDays className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {data?.stats.casualLeaveLeft}
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              of {data?.stats.casualLeaveTotal} days this year
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:border-teal-500/50 transition">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">
              Days Present
            </span>
            <UserCheck className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {data?.stats.daysPresent}
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              of {data?.stats.workingDaysOctober} working days in October
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-5 shadow-sm">
          <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider">
              Over Time Approved
            </span>
            <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-200">
              {data?.stats.overtimeApproved}
            </div>
            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              {data?.stats.overtimePending}
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="relative rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-5 shadow-sm">
          <div className="flex items-center justify-between text-amber-700 dark:text-amber-400">
            <span className="text-xs font-bold uppercase tracking-wider">
              Requests Waiting
            </span>
            <Hourglass className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-amber-900 dark:text-amber-200">
              {data?.stats.requestsWaiting}
            </div>
            <p className="mt-1 text-xs text-amber-600 dark:text-amber-400 font-medium">
              Work requests and movements
            </p>
          </div>
        </div>
      </div>

      {/* 3. LEAVE BALANCE SUMMARY SECTION */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              My leave balance
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Days left for 2026
            </p>
          </div>
          <Link
            href="/dashboard/leave"
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
          >
            Apply for leave
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {data?.leaveBalances.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
            >
              <div className="relative flex items-center justify-center h-16 w-16 rounded-full border-4 border-slate-200 dark:border-slate-700">
                <span className={`text-lg font-bold ${item.color}`}>
                  {item.used}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  of {item.total} days available
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. WORKSPACE SERVICES / MODULE CARDS GRID */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Workspace Modules
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Link
                key={index}
                href={card.href}
                className="group relative flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-teal-500/50"
              >
                {/* Active Checkmark Badge */}
                <CheckCircle2 className="absolute top-2.5 right-2.5 h-4 w-4 fill-emerald-500 text-white" />

                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">
                      {card.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}