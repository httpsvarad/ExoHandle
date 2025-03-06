"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SidebarWrapper from "../sidebarWrapper";
const ManageBatches = () => {
  const router = useRouter();

  const batches = [
    {
      name: "Web Development 101",
      start: "Feb 21, 2022",
      end: "Mar 18, 2022",
      students: 23,
      status: "Active",
    },
    {
      name: "Web Development 102",
      start: "Feb 21, 2022",
      end: "Mar 18, 2022",
      students: 23,
      status: "Active",
    },
    {
      name: "Data Science 101",
      start: "Feb 21, 2022",
      end: "Mar 18, 2022",
      students: 23,
      status: "Active",
    },
    {
      name: "UX/UI Design 101",
      start: "Feb 21, 2022",
      end: "Mar 18, 2022",
      students: 23,
      status: "Active",
    },
    {
      name: "Product Management 101",
      start: "Feb 21, 2022",
      end: "Mar 18, 2022",
      students: 23,
      status: "Active",
    },
    {
      name: "Cybersecurity 101",
      start: "Feb 21, 2022",
      end: "Mar 18, 2022",
      students: 23,
      status: "Active",
    },
  ];

  return (
    <SidebarWrapper>
      <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 px-10 py-8">
        <h1 className="text-3xl font-semibold text-[#2c275d]">Batches</h1>
        <p className="text-gray-600 mt-2">Manage student batches easily.</p>

        {/* Search Bar */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Find a batch"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009c98] focus:outline-none"
          />
        </div>

        {/* Batches Table */}
        <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-[#2c275d] text-white text-lg">
              <tr>
                <th className="p-4 text-left">Batch</th>
                <th className="p-4 text-left">Start Date</th>
                <th className="p-4 text-left">End Date</th>
                <th className="p-4 text-left">Students</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-100 transition duration-200"
                >
                  <td className="p-4 text-lg">{batch.name}</td>
                  <td className="p-4 text-[#009c98] font-medium text-lg">
                    {batch.start}
                  </td>
                  <td className="p-4 text-[#009c98] font-medium text-lg">
                    {batch.end}
                  </td>
                  <td className="p-4 text-lg">{batch.students}</td>
                  <td className="p-4">
                    <span className="bg-[#009c98] text-white px-3 py-1 rounded-md text-lg">
                      {batch.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-[#009c98] hover:underline text-lg">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </SidebarWrapper>
    
  );
};

export default ManageBatches;
