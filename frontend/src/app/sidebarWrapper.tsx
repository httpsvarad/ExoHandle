"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/" && pathname !== "/auth";

  return (
    <div className="flex w-full relative">
      <Sidebar />
      <div className="flex-1 p-6 ">{children}</div>
    </div>
  );
}
