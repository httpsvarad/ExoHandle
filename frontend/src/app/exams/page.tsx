"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";

const exams = [
  { name: "CS101 - Introduction to Computer Science", date: "June 10, 2023" },
  { name: "CS101 - Introduction to Computer Science", date: "June 12, 2023" },
  { name: "CS101 - Introduction to Computer Science", date: "June 14, 2023" },
  { name: "CS101 - Introduction to Computer Science", date: "June 16, 2023" },
  { name: "CS101 - Introduction to Computer Science", date: "June 18, 2023" },
  { name: "CS101 - Introduction to Computer Science", date: "June 20, 2023" },
  { name: "CS101 - Introduction to Computer Science", date: "June 22, 2023" },
  { name: "CS101 - Introduction to Computer Science", date: "June 24, 2023" },
];
export default function ExamsPage() {
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
              className="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
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
                <span>&gt;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
