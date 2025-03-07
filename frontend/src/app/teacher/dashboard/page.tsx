"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  MessageSquare,
  Eye,
} from "lucide-react";
import Link from "next/link";
import TeacherSidebar from "../teacherDashboard";

export default function TeacherDashboard() {
  const [teacherName] = useState("John Doe");

  return (
    <div className="flex h-screen">
      <TeacherSidebar>
        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6">
          <h1 className="text-3xl font-bold text-[#2c275d]">
            Welcome, {teacherName} 👋
          </h1>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="p-5 bg-white rounded-lg shadow-md">
              <h2 className="text-lg text-gray-600">Total Students</h2>
              <p className="text-2xl font-bold text-[#2c275d]">120</p>
            </div>
            <div className="p-5 bg-white rounded-lg shadow-md">
              <h2 className="text-lg text-gray-600">Exams Assigned</h2>
              <p className="text-2xl font-bold text-[#2c275d]">5</p>
            </div>
            <div className="p-5 bg-white rounded-lg shadow-md">
              <h2 className="text-lg text-gray-600">Supervision Classes</h2>
              <p className="text-2xl font-bold text-[#2c275d]">3</p>
            </div>
          </div>

          {/* Recent Exams & Supervision */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-[#2c275d] mb-3">
                Upcoming Exams
              </h2>
              <ul className="space-y-2">
                <li className="p-3 border border-gray-200 rounded-md">
                  CS101 - June 15
                </li>
                <li className="p-3 border border-gray-200 rounded-md">
                  CS201 - June 20
                </li>
                <li className="p-3 border border-gray-200 rounded-md">
                  CS301 - June 25
                </li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-[#2c275d] mb-3">
                Supervision Classes
              </h2>
              <ul className="space-y-2">
                <li className="p-3 border border-gray-200 rounded-md">
                  Class 10B - June 12
                </li>
                <li className="p-3 border border-gray-200 rounded-md">
                  Class 11A - June 18
                </li>
                <li className="p-3 border border-gray-200 rounded-md">
                  Class 12C - June 22
                </li>
              </ul>
            </div>
          </div>
        </main>
      </TeacherSidebar>

      {/* Sidebar */}
    </div>
  );
}
