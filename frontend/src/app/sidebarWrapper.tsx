"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/"; // Hide sidebar on home page

  return (
    <div className="flex w-full">
      {showSidebar && <Sidebar />}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
