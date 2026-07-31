"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const router = useRouter();

  const handleLogout = () => {
    // Add token or session cleanup here if needed
    router.push("/");
  };
 const [isDarkMode, setIsDarkMode] = useState(false);
 
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#0d1424] text-white p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          <Link
            href="/admin/movements"
            className="hover:text-blue-400 font-medium"
          >
            Movement Approvals
          </Link>
          <Link href="/admin/leave" className="hover:text-blue-400 font-medium">
            Leave Approvals
          </Link>
        </nav>
      </aside>

      {/* Right Content Area with Header */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-2">
            
              <div className="flex h-14 w-12 items-center justify-center">
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
              className={`text-xl font-bold tracking-wide ${
                isDarkMode ? "text-blue-400" : "text-blue-900"
              }`}
            >
              WLTSERVICES
            </span>
          </div>
          {/* Top Right Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-md transition-colors border border-red-200"
          >
            <LogOutIcon className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}