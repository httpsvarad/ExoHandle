import TeacherSidebar from "../teacherDashboard";

const supervisionData = [
  {
    exam: "Database Management Systems",
    date: "March 15, 2025",
    time: "10:00 AM - 12:00 PM",
    room: "Lab 302",
    status: "Upcoming",
  },
  {
    exam: "Operating Systems",
    date: "March 20, 2025",
    time: "2:00 PM - 4:00 PM",
    room: "Hall A",
    status: "Upcoming",
  },
  {
    exam: "Computer Networks",
    date: "March 25, 2025",
    time: "9:00 AM - 11:00 AM",
    room: "Room 104",
    status: "Completed",
  },
];

export default function TeacherSupervisionPage() {
  return (
    <TeacherSidebar>
      <h1 className="text-3xl font-bold text-[#2c275d]">Supervision Duties</h1>

      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-[#2c275d] mb-4">
          Your Assigned Supervisions
        </h2>

        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Exam</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Time</th>
              <th className="p-3 border">Room</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {supervisionData.map((duty, index) => (
              <tr key={index} className="text-center">
                <td className="p-3 border">{duty.exam}</td>
                <td className="p-3 border">{duty.date}</td>
                <td className="p-3 border">{duty.time}</td>
                <td className="p-3 border">{duty.room}</td>
                <td
                  className={`p-3 border font-medium ${
                    duty.status === "Upcoming"
                      ? "text-[#009c98]"
                      : duty.status === "Ongoing"
                      ? "text-yellow-500"
                      : "text-gray-500"
                  }`}
                >
                  {duty.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TeacherSidebar>
  );
}
