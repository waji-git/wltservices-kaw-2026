// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   Inbox,
//   Calendar,
//   Clock,
//   Footprints,
//   ClipboardList,
//   ShoppingBag,
//   UserCheck,
// //   User,
//   Users,
//   AlertTriangle,
//   Briefcase,
//   TrendingUp,
//   GraduationCap,
//   Banknote,
//   Laptop,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// interface NavGroup {
//   sectionTitle?: string;
//   items: {
//     label: string;
//     href: string;
//     icon: React.ElementType;
//   }[];
// }

// const navGroups: NavGroup[] = [
//   {
//     sectionTitle: "MY WORKSPACE",
//     items: [
//       { label: "My Dashboard", href: "/dashboard", icon: LayoutDashboard },
//       { label: "Inbox & approvals", href: "/dashboard/inbox", icon: Inbox },
//     ],
//   },
//   {
//     sectionTitle: "REQUESTS",
//     items: [
//       { label: "Leave", href: "/dashboard/leave", icon: Calendar },
//       { label: "Over Time", href: "/dashboard/overtime", icon: Clock },
//       { label: "Movement", href: "/dashboard/movement", icon: Footprints },
//       {
//         label: "Work Request",
//         href: "/dashboard/work-request",
//         icon: ClipboardList,
//       },
//       {
//         label: "Merchandise Request",
//         href: "/dashboard/merchandise-request",
//         icon: ShoppingBag,
//       },
//       {
//         label: "Covering Officers",
//         href: "/dashboard/covering-officers",
//         icon: UserCheck,
//       },
//     //   {
//     //     label: "Approval Hierarchy",
//     //     href: "/dashboard/approval-hierarchy",
//     //     icon: GitTree,
//     //   },
//     ],
//   },
//   {
//     sectionTitle: "MY RECORDS",
//     items: [
//     //   {
//     //     label: "Personal Details",
//     //     href: "/dashboard/personal-details",
//     //     icon: User,
//     //   },
//       {
//         label: "Dependence Details",
//         href: "/dashboard/dependence-details",
//         icon: Users,
//       },
//       {
//         label: "Disciplinary Details",
//         href: "/dashboard/disciplinary-details",
//         icon: AlertTriangle,
//       },
//       {
//         label: "Job Duty Details",
//         href: "/dashboard/job-duty-details",
//         icon: Briefcase,
//       },
//       {
//         label: "Evaluation Details",
//         href: "/dashboard/evaluation-details",
//         icon: TrendingUp,
//       },
//       {
//         label: "Exam Results",
//         href: "/dashboard/exam-results",
//         icon: GraduationCap,
//       },
//       { label: "Payslip", href: "/dashboard/pay", icon: Banknote },
//       {
//         label: "Assigned Assets",
//         href: "/dashboard/assigned-assets",
//         icon: Laptop,
//       },
//     ],
//   },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <aside
//       className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-[#071927] text-slate-300 flex flex-col justify-between border-r border-slate-800 ${
//         collapsed ? "w-20" : "w-64"
//       }`}
//     >
//       {/* Top Branding Section */}
//       <div>
//         <div className="flex items-center space-x-3 p-5 border-b border-slate-800/60">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-400 to-emerald-400 text-slate-950 font-black text-xl">
//             S
//           </div>
//           {!collapsed && (
//             <div>
//               <h1 className="text-base font-extrabold tracking-tight text-white leading-tight">
//                 SLTS HRIS
//               </h1>
//               <p className="text-[11px] text-slate-400 font-medium">
//                 Sri Lanka Telecom (Services)
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Navigation Section */}
//         <nav className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-thin scrollbar-thumb-slate-800">
//           {navGroups.map((group, gIdx) => (
//             <div key={gIdx} className="space-y-1">
//               {group.sectionTitle && !collapsed && (
//                 <p className="px-3 text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">
//                   {group.sectionTitle}
//                 </p>
//               )}
//               {group.items.map((item, idx) => {
//                 const isActive = pathname === item.href;
//                 const Icon = item.icon;
//                 return (
//                   <Link
//                     key={idx}
//                     href={item.href}
//                     className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all ${
//                       isActive
//                         ? "bg-sky-950/80 text-sky-300 border-l-4 border-sky-400 shadow-sm"
//                         : "hover:bg-slate-800/60 hover:text-white text-slate-300"
//                     }`}
//                   >
//                     <Icon
//                       className={`h-4 w-4 shrink-0 ${
//                         isActive ? "text-sky-400" : "text-slate-400"
//                       }`}
//                     />
//                     {!collapsed && <span>{item.label}</span>}
//                   </Link>
//                 );
//               })}
//             </div>
//           ))}
//         </nav>
//       </div>

//       {/* Bottom Collapse Menu Button */}
//       <div className="p-3 border-t border-slate-800/80">
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="flex w-full items-center space-x-3 px-3 py-2.5 text-xs font-semibold text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/60 transition"
//         >
//           {collapsed ? (
//             <ChevronRight className="h-4 w-4 shrink-0" />
//           ) : (
//             <>
//               <ChevronLeft className="h-4 w-4 shrink-0" />
//               <span>Collapse menu</span>
//             </>
//           )}
//         </button>
//       </div>
//     </aside>
//   );
// }
