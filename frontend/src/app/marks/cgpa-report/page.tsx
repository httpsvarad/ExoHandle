"use client";
import React from "react";

const studentsData = [
  { id: "S001", name: "John Doe", marks: [85, 90, 88, 92], cgpa: 8.5 },
  { id: "S002", name: "Jane Smith", marks: [78, 85, 80, 86], cgpa: 7.9 },
  { id: "S003", name: "Alice Brown", marks: [90, 92, 89, 94], cgpa: 9.1 },
];

const CGPAReport = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white px-6">
      <h1 className="text-3xl font-bold text-[#2c275d] mt-6">CGPA Report</h1>
      <p className="text-gray-500 mt-2">
        View student marks and calculated CGPA
      </p>

      {/* Table */}
      <div className="w-full max-w-4xl mt-6">
        <table className="w-full border-collapse border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-[#2c275d] text-white text-left">
              <th className="p-3">Student ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Assignment 1</th>
              <th className="p-3">Assignment 2</th>
              <th className="p-3">Assignment 3</th>
              <th className="p-3">Final Exam</th>
              <th className="p-3">CGPA</th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map((student) => (
              <tr key={student.id} className="border-b border-gray-200">
                <td className="p-3">{student.id}</td>
                <td className="p-3">{student.name}</td>
                {student.marks.map((mark, index) => (
                  <td key={index} className="p-3">
                    {mark}
                  </td>
                ))}
                <td className="p-3 font-bold text-[#009c98]">
                  {student.cgpa.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download Button */}
      <button className="mt-6 bg-[#009c98] text-white px-6 py-3 rounded-md text-lg hover:bg-[#00847f]">
        Download Report
      </button>
    </div>
  );
};

export default CGPAReport;
