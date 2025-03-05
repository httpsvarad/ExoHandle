"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const examData = {
  "1": {
    name: "CS101 - Intro to CS",
    semester: "Semester 1",
    year: "2023",
    date: "June 10, 2023",
    time: "10:00 AM - 12:00 PM",
  },
  "2": {
    name: "CS102 - Data Structures",
    semester: "Semester 2",
    year: "2023",
    date: "June 15, 2023",
    time: "2:00 PM - 4:00 PM",
  },
};

export default function ExamDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id;

  const [exam, setExam] = useState(null);

  useEffect(() => {
    // Simulate fetching data
    if (examData[examId]) {
      setExam(examData[examId]);
    } else {
      setExam(null); // Handle invalid ID case
    }
  }, [examId]);

  const handleDelete = () => {
    alert("Exam deleted");
    router.push("/exams"); // Redirect after delete
  };

  if (!exam) {
    return <div className="p-6 text-red-500">Exam not found.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">{exam.name}</h2>
      <div className="bg-gray-800 p-4 rounded-md text-white space-y-3">
        <p>
          <strong>Semester:</strong> {exam.semester}
        </p>
        <p>
          <strong>Year:</strong> {exam.year}
        </p>
        <p>
          <strong>Date:</strong> {exam.date}
        </p>
        <p>
          <strong>Time:</strong> {exam.time}
        </p>
      </div>
      <div className="flex gap-4 mt-6">
        <Link href={`/exams/${examId}/edit`}>
          <button className="bg-yellow-500 px-4 py-2 rounded-md">
            Edit Exam
          </button>
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 px-4 py-2 rounded-md"
        >
          Delete Exam
        </button>
      </div>
    </div>
  );
}
