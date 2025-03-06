"use client";

import { Inbox, User, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const menuItems = [
    {
      icon: Inbox,
      title: "Inbox",
      description: "You have 2 unread chats",
      path: "/inbox",
    },
    {
      icon: User,
      title: "Profile",
      description: "Set up your profile and manage your account",
      path: "/profileSetup",
    },
    {
      icon: HelpCircle,
      title: "What's new",
      description: "Find out about the latest features and updates",
      path: "/whats-new",
    },
    {
      icon: HelpCircle,
      title: "More",
      description: "Help center, terms of service, privacy policy",
      path: "/more",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-gray-900">
      <h1 className="text-2xl font-bold text-[#2c275d] mb-6">Hi, Sarah</h1>
      <div className="w-full max-w-md space-y-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer"
            onClick={() => router.push(item.path)}
          >
            <div className="flex items-center gap-4">
              <item.icon className="w-6 h-6 text-[#009c98]" />
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
            <span className="text-gray-400">&gt;</span>
          </div>
        ))}
      </div>
      <button
        className="mt-6 px-6 py-3 bg-[#2c275d] text-white rounded-lg hover:bg-[#231d4b]"
        onClick={() => router.push("/chatDashboard")}
      >
        New chat
      </button>
    </div>
  );
}
