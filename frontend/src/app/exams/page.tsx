"use client";

import Link from "next/link";

const exams = [
  {
    id: 1,
    name: "CS101 - Introduction to Computer Science",
    date: "June 10, 2023",
  },
  { id: 2, name: "CS102 - Data Structures", date: "June 15, 2023" },
];

export default function ExamsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Exams</h2>
        <Link href="/exams/new">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Create Exam
          </button>
        </Link>
      </div>
      <ul className="space-y-4">
        {exams.map((exam) => (
          <li
            key={exam.id}
            className="flex justify-between items-center bg-gray-800 p-4 rounded-md"
          >
            <Link
              href={`/exams/${exam.id}`}
              className="text-white hover:underline"
            >
              {exam.name}
            </Link>
            <span className="text-gray-400">{exam.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
