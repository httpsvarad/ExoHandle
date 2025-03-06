"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateExamPage() {
  const router = useRouter();
  const [exam, setExam] = useState({
    name: "",
    semester: "",
    year: "",
    date: "",
    time: "",
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Add create API call here
    alert("Exam created");
    router.push("/exams"); // Redirect to exam list
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Create Exam</h2>
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
          <label className="block mb-1">Date</label>
          <input
            type="date"
            value={exam.date}
            onChange={(e) => setExam({ ...exam, date: e.target.value })}
            className="w-full p-2 bg-gray-700 rounded-md"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded-md">
          Create Exam
        </button>
      </form>
    </div>
  );
}
