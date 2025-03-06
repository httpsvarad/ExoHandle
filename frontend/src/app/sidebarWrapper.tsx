"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../components/sidebar";

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide sidebar on specific routes
  const showSidebar = !["/", "/auth", "/dashboardins"].includes(pathname);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {showSidebar && <Sidebar />}
      <main
        className={`flex-1 ${
          showSidebar ? "pl-64" : "pl-0"
        } p-6 h-full overflow-auto`}
      >
        {children}
      </main>
    </div>
  );
}
