"use client";

import React from "react";
import { useRouter } from "next/navigation";

const MarksEntry = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center min-h-screen bg-white px-6 py-8 ">
      {/* Header Section */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#2c275d]">
          Mark Entry & CGPA Calculation
        </h1>
        <button
          onClick={() => router.push("/marks/cgpa-report")}
          className="bg-[#009c98] text-white px-5 py-2 rounded-md text-md hover:bg-[#00847f] transition"
        >
          View CGPA Report
        </button>
      </div>

      {/* Year & Semester Selection */}
      <div className="w-full max-w-3xl bg-gray-100 p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Select the academic year and semester
        </h2>
        <div className="flex flex-wrap gap-3">
          {["Year 1", "Year 2", "Year 3", "Year 4"].map((year) => (
            <button
              key={year}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
            >
              {year}
            </button>
          ))}
          {["Sem 1", "Sem 2", "Sem 3", "Sem 4"].map((sem) => (
            <button
              key={sem}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
            >
              {sem}
            </button>
          ))}
        </div>
      </div>

      {/* Marks Entry Form */}
      <div className="w-full max-w-3xl mt-6 bg-gray-100 p-6 rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">
          Enter student marks
        </h2>

        <input
          type="text"
          className="w-full border border-gray-300 p-3 rounded-md mt-3"
          placeholder="Enter student ID"
        />
        <input
          type="number"
          className="w-full border border-gray-300 p-3 rounded-md mt-3"
          placeholder="Enter assignment 1 mark"
        />
        <input
          type="number"
          className="w-full border border-gray-300 p-3 rounded-md mt-3"
          placeholder="Enter assignment 2 mark"
        />
        <input
          type="number"
          className="w-full border border-gray-300 p-3 rounded-md mt-3"
          placeholder="Enter assignment 3 mark"
        />
        <input
          type="number"
          className="w-full border border-gray-300 p-3 rounded-md mt-3"
          placeholder="Enter final exam mark"
        />

        {/* CGPA Calculation */}
        <h2 className="text-lg font-semibold text-gray-700 mt-6">
          CGPA calculation
        </h2>
        <input
          type="number"
          className="w-full border border-gray-300 p-3 rounded-md mt-3"
          placeholder="Enter total credits"
        />

        <button className="mt-6 w-full bg-[#2c275d] text-white px-6 py-3 rounded-md text-lg hover:bg-[#221c4a]">
          Calculate CGPA
        </button>
      </div>
    </div>
  );
};

export default MarksEntry;
