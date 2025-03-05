"use client";

import React from "react";
import { useRouter } from "next/navigation";

const CreateSemester = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-[#2c275d]">
          Create New Semester
        </h1>
        <p className="text-gray-600 mt-2">
          Define a new semester and set its start and end dates.
        </p>

        <form className="mt-6 space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-[#2c275d]">
              Semester Name
            </label>
            <input
              type="text"
              placeholder="Fall"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009c98] focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#2c275d]">
                Start Date
              </label>
              <input
                type="date"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009c98] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#2c275d]">
                End Date
              </label>
              <input
                type="date"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009c98] focus:outline-none"
              />
            </div>
          </div>

          <button className="w-full bg-[#2c275d] text-white py-2 rounded-md hover:bg-[#009c98] transition-all duration-300">
            Create Semester
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSemester;
