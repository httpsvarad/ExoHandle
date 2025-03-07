import TeacherSidebar from "../teacherDashboard";

const seatingData = {
  exam: "Database Management Systems",
  date: "March 15, 2025",
  time: "10:00 AM - 12:00 PM",
  duration: "2 hours",
  room: "Lab 302",
  students: [
    { name: "John Doe", roll: "S101", seat: "A1" },
    { name: "Jane Smith", roll: "S102", seat: "A2" },
    { name: "David Johnson", roll: "S103", seat: "B1" },
    { name: "Emily Davis", roll: "S104", seat: "B2" },
  ],
};

export default function TeacherSeatingPage() {
  return (
    <TeacherSidebar>
      <h1 className="text-3xl font-bold text-[#2c275d]">Seating Arrangement</h1>

      {/* Exam Information */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-[#2c275d]">Exam Details</h2>
        <p className="text-gray-700">
          <strong>Subject:</strong> {seatingData.exam}
        </p>
        <p className="text-gray-700">
          <strong>Date:</strong> {seatingData.date}
        </p>
        <p className="text-gray-700">
          <strong>Time:</strong> {seatingData.time}
        </p>
        <p className="text-gray-700">
          <strong>Duration:</strong> {seatingData.duration}
        </p>
        <p className="text-gray-700">
          <strong>Room:</strong> {seatingData.room}
        </p>
      </div>

      {/* Seating Arrangement Table */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-[#2c275d]">
          Student Seating List
        </h2>
        <table className="w-full mt-4 border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Student Name</th>
              <th className="p-3 border">Roll Number</th>
              <th className="p-3 border">Seat Number</th>
            </tr>
          </thead>
          <tbody>
            {seatingData.students.map((student) => (
              <tr key={student.roll} className="text-center">
                <td className="p-3 border">{student.name}</td>
                <td className="p-3 border">{student.roll}</td>
                <td className="p-3 border font-bold">{student.seat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TeacherSidebar>
  );
}
