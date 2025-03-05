"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ExamDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id;

  // Sample exam data (Replace with API call)
  const exam = {
    id: examId,
    name: "CS101 - Introduction to Computer Science",
    semester: "Semester 1",
    year: "2023",
    date: "June 10, 2023",
    time: "10:00 AM - 12:00 PM",
  };

  const handleDelete = () => {
    // Add delete API call here
    alert("Exam deleted");
    router.push("/exams"); // Redirect to exams list
  };

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
        <Link href={`/exams/${exam.id}/edit`}>
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
