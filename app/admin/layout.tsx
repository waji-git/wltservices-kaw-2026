
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#0d1424] text-white p-6 flex flex-col space-y-4">
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

      {/* Right Main Content (🔑 THIS MUST BE HERE) */}
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}