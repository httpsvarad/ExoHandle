"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // ✅ Correct imports
import { FiHome, FiUsers, FiLayers, FiBook, FiBriefcase } from "react-icons/fi";
import { FaMessage } from "react-icons/fa6";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", href: "/dashboardins", icon: <FiHome /> },
    { name: "Students", href: "/students", icon: <FiUsers /> },
    { name: "Manage Batches", href: "/manage-batch", icon: <FiLayers /> },
    { name: "Exams", href: "/exams", icon: <FiBook /> },
    { name: "Marks", href: "/marks", icon: <FiBriefcase /> },
    { name: "Chat With Teachers", href: "/chatDashboard", icon: <FaMessage /> },
  ];

  return (
    <aside className="w-64 bg-[#1E1E2E] text-white flex flex-col items-center py-6 h-screen shadow-lg fixed">
      <h2 className="text-2xl font-semibold tracking-wide mb-10">ExoHandle</h2>

      {/* Navigation */}
      <nav className="flex flex-col w-full gap-4">
        {navItems.map((item) => (
          <div
            key={item.href}
            onClick={() => router.push(item.href)}
            className={`flex items-center gap-x-3 px-4 py-3 w-5/6 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              pathname === item.href
                ? "bg-[#3A3A50] text-white shadow-md"
                : "text-gray-400 hover:text-white hover:bg-[#29293F]"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-lg font-medium">{item.name}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
