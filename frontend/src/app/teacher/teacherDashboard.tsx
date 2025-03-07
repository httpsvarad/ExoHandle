"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const teacherNavLinks = [
  { name: "Dashboard", href: "/teacher/dashboard" },
  { name: "Grades", href: "/teacher/grades" },
  { name: "Seating Arrangements", href: "/teacher/seating" },
  { name: "Supervision", href: "/teacher/supervision" },
  { name: "Chat with Admin", href: "/teacher/chat" },
];

export default function TeacherDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2c275d] text-white p-5 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Teacher Panel</h1>
        <nav className="flex flex-col space-y-2">
          {teacherNavLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div
                className={`p-3 rounded-md ${
                  pathname === link.href ? "bg-[#009c98]" : "hover:bg-[#3a366b]"
                }`}
              >
                {link.name}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 h-full overflow-auto bg-gray-100">
        {children}
      </main>
    </div>
  );
}
