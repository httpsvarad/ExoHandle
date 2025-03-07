"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";

const exams = [
  {
    name: "CS101 - Introduction to Computer Science",
    date: "June 10, 2023",
    details: "Room 101, 9:00 AM - 12:00 PM",
  },
  {
    name: "CS102 - Data Structures",
    date: "June 12, 2023",
    details: "Room 202, 10:00 AM - 1:00 PM",
  },
  {
    name: "CS103 - Algorithms",
    date: "June 14, 2023",
    details: "Room 303, 11:00 AM - 2:00 PM",
  },
  {
    name: "CS104 - Operating Systems",
    date: "June 16, 2023",
    details: "Room 404, 12:00 PM - 3:00 PM",
  },
];

export default function ExamsPage() {
  const [expandedExam, setExpandedExam] = useState(null);

  const toggleExpand = (index) => {
    setExpandedExam(expandedExam === index ? null : index);
  };

  return (
    <div className="p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#2c275d]">Exams</h1>
        <Link href="/exams/new">
          <button className="bg-[#009c98] hover:bg-[#007d79] text-white px-5 py-2 rounded-md text-lg transition">
            Create Exam
          </button>
        </Link>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[#2c275d] mb-4">
          Upcoming Exams
        </h2>
        <div className="space-y-4">
          {exams.map((exam, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-sm transition"
            >
              {/* Exam Header */}
              <div
                className="flex items-center p-4 hover:shadow-md cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <div className="bg-[#009c98] text-white p-2 rounded-lg">
                  <Calendar size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-[#2c275d]">
                    {exam.name}
                  </p>
                  <p className="text-gray-500 text-sm">{exam.date}</p>
                </div>
                <div className="ml-auto text-gray-400">
                  {expandedExam === index ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </div>

              {/* Expanded Section */}
              {expandedExam === index && (
                <div className="bg-gray-50 p-4 border-t">
                  <p className="text-gray-600 text-sm">{exam.details}</p>
                  <Link href="/seating-arrangement">
                    <button className="mt-3 bg-[#009c98] hover:bg-[#007d79] text-white px-4 py-2 rounded-md text-sm transition">
                      Assign Seating Arrangement
                    </button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
