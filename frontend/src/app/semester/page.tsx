"use client";

import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";

const SemesterPage = () => {
  const router = useRouter();

  // Dummy semester data (Replace with dynamic data later)
  const semesters = [
    {
      id: 1,
      name: "Semester 1",
      start: "Jan 2024",
      end: "May 2024",
      year: "2024",
      branch: "Computer Science",
      subjects: ["DSA", "OS", "DBMS"],
    },
    {
      id: 2,
      name: "Semester 2",
      start: "Jul 2024",
      end: "Dec 2024",
      year: "2024",
      branch: "Computer Science",
      subjects: ["CN", "AI", "Cybersecurity"],
    },
    {
      id: 3,
      name: "Semester 3",
      start: "Jan 2025",
      end: "May 2025",
      year: "2025",
      branch: "Computer Science",
      subjects: ["ML", "Cloud Computing", "Blockchain"],
    },
    {
      id: 4,
      name: "Semester 4",
      start: "Jul 2025",
      end: "Dec 2025",
      year: "2025",
      branch: "Computer Science",
      subjects: ["Big Data", "IoT", "Computer Vision"],
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#2c275d]">Semesters</h1>
        <button
          onClick={() => router.push("/create-semester")}
          className="flex items-center gap-2 px-4 py-2 bg-[#009c98] text-white rounded-lg shadow-md hover:bg-[#007c7a] transition"
        >
          <FiPlus className="text-lg" /> Create Semester
        </button>
      </div>

      {/* Semester Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {semesters.length > 0 ? (
          semesters.map((semester) => (
            <div
              key={semester.id}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-[#2c275d]">
                {semester.name}
              </h2>
              <p className="text-gray-600">
                {semester.start} - {semester.end} ({semester.year})
              </p>
              <p className="text-gray-600 font-medium">
                Branch: {semester.branch}
              </p>
              <p className="text-gray-500 mt-2">Subjects:</p>
              <ul className="list-disc list-inside text-gray-500">
                {semester.subjects.map((subject, index) => (
                  <li key={index}>{subject}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No semesters created yet.</p>
        )}
      </div>
    </div>
  );
};

export default SemesterPage;
