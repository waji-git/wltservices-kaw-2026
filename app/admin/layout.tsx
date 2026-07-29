"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";

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