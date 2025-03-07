"use client";
import { useState } from "react";
import TeacherSidebar from "../teacherDashboard";

const students = [
  { id: 1, name: "John Doe", roll: "CS101-01" },
  { id: 2, name: "Jane Smith", roll: "CS101-02" },
  { id: 3, name: "Alice Johnson", roll: "CS101-03" },
];

const categories = [
  {
    name: "Assignments",
    fields: ["Timely Submission (2)", "Presentation (3)", "Understanding (5)"],
  },
  {
    name: "Practicals",
    fields: [
      "Attendance (3)",
      "Discipline (3)",
      "Short Oral (3)",
      "Lab Report (3)",
      "Completion (3)",
    ],
  },
  {
    name: "Extra Curricular",
    fields: ["Participation (5)", "Achievements (5)"],
  },
  {
    name: "Internal Assessment",
    fields: ["Assessment 1 (10)", "Assessment 2 (10)"],
  },
  { name: "Viva", fields: ["Viva Marks (10)"] },
];

export default function TeacherGrading() {
  const [selectedCategory, setSelectedCategory] = useState("Assignments");
  const [grades, setGrades] = useState(
    students.reduce((acc, student) => {
      acc[student.id] = {};
      categories.forEach((cat) => {
        acc[student.id][cat.name] = cat.fields.map(() => "");
      });
      return acc;
    }, {})
  );

  const handleInputChange = (studentId, category, index, value) => {
    setGrades((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [category]: prev[studentId][category].map((val, i) =>
          i === index ? value : val
        ),
      },
    }));
  };

  return (
    <div className="flex h-screen">
      <TeacherSidebar>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#2c275d] mb-4">
            Student Grading
          </h1>

          {/* Tabs */}
          <div className="flex space-x-4 mb-4 border-b">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`px-4 py-2 ${
                  selectedCategory === cat.name
                    ? "text-[#009c98] border-b-2 border-[#009c98] font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Student Grading Table */}
          <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Roll No</th>
                  <th className="border p-2 text-left">Student Name</th>
                  {categories
                    .find((cat) => cat.name === selectedCategory)
                    ?.fields.map((field, index) => (
                      <th key={index} className="border p-2 text-left">
                        {field}
                      </th>
                    ))}
                  <th className="border p-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-t">
                    <td className="border p-2">{student.roll}</td>
                    <td className="border p-2">{student.name}</td>
                    {grades[student.id][selectedCategory].map(
                      (value, index) => (
                        <td key={index} className="border p-2">
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={value}
                            onChange={(e) =>
                              handleInputChange(
                                student.id,
                                selectedCategory,
                                index,
                                e.target.value
                              )
                            }
                            className="w-16 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#009c98]"
                          />
                        </td>
                      )
                    )}
                    <td className="border p-2 font-semibold">
                      {grades[student.id][selectedCategory].reduce(
                        (sum, val) => sum + (Number(val) || 0),
                        0
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Save Button */}
          <div className="mt-4 flex justify-end">
            <button className="bg-[#009c98] hover:bg-[#007d79] text-white px-5 py-2 rounded-md text-lg transition">
              Save Grades
            </button>
          </div>
        </div>
      </TeacherSidebar>
    </div>
  );
}
