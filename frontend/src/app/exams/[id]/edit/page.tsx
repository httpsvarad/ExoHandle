"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function EditExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id;

  const [exam, setExam] = useState({
    name: "CS101 - Introduction to Computer Science",
    semester: "Semester 1",
    year: "2023",
    date: "2023-06-10",
    time: "10:00 AM - 12:00 PM",
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Add update API call here
    alert("Exam updated");
    router.push(`/exams/${examId}`); // Redirect back to exam details
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Exam</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-4 rounded-md space-y-4 text-white"
      >
        <div>
          <label className="block mb-1">Exam Name</label>
          <input
            type="text"
            value={exam.name}
            onChange={(e) => setExam({ ...exam, name: e.target.value })}
            className="w-full p-2 bg-gray-700 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Semester</label>
          <input
            type="text"
            value={exam.semester}
            onChange={(e) => setExam({ ...exam, semester: e.target.value })}
            className="w-full p-2 bg-gray-700 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Year</label>
          <input
            type="text"
            value={exam.year}
            onChange={(e) => setExam({ ...exam, year: e.target.value })}
            className="w-full p-2 bg-gray-700 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            value={exam.date}
            onChange={(e) => setExam({ ...exam, date: e.target.value })}
            className="w-full p-2 bg-gray-700 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Time</label>
          <input
            type="text"
            value={exam.time}
            onChange={(e) => setExam({ ...exam, time: e.target.value })}
            className="w-full p-2 bg-gray-700 rounded-md"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded-md">
          Save Changes
        </button>
      </form>
    </div>
  );
}
