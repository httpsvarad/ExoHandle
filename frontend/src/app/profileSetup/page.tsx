"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    followers: false,
    replies: false,
    tagged: false,
  });

  //   const toggleNotification = (key: string) => {
  //     setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  //   };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-[#2c275d] mb-6">Settings</h1>

        {/* Profile Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
          <div className="flex justify-between">
            <span className="text-gray-600">Email</span>
            <span className="text-[#009c98]">patricia.burns@gmail.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Password</span>
            <button className="bg-[#009c98] text-white px-4 py-1 rounded">
              Change
            </button>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Two-factor authentication</span>
            <button className="bg-[#009c98] text-white px-4 py-1 rounded">
              Enable
            </button>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Appearance</h2>
          <div className="flex justify-between">
            <span className="text-gray-600">Color Scheme</span>
            <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded">
              System
            </button>
          </div>
        </div>

        {/* Email Notifications */}
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Email Notifications
          </h2>
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-600 capitalize">
                {key.replace("_", " ")}
              </span>
              <input
                type="checkbox"
                className="w-5 h-5 accent-[#009c98]"
                checked={value}
                // onChange={() => toggleNotification(key)}
              />
            </div>
          ))}
        </div>

        <button className="mt-6 bg-[#009c98] text-white px-6 py-2 rounded">
          Save
        </button>
      </main>
    </div>
  );
}
