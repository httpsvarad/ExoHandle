"use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Edit, Trash, Eye } from "lucide-react";

// const studentsData = [
//   { id: 1, name: "Aarav Sharma", semester: 6, subjects: "AI, DWM, CN" },
//   { id: 2, name: "Riya Patel", semester: 4, subjects: "SE, Cybersecurity" },
//   { id: 3, name: "Kabir Mehta", semester: 2, subjects: "TCS, IP" },
// ];

// export default function StudentsPage() {
//   const [search, setSearch] = useState("");

//   const filteredStudents = studentsData.filter((student) =>
//     student.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-2xl font-bold">Students</h1>

//       {/* Search Bar */}
//       <div className="flex gap-4">
//         <input
//           type="text"
//           placeholder="Search students..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-1/3 p-2 border rounded"
//         />
//         <Link href="/students/new">
//           <button className="bg-[#009c98] hover:bg-[#007d79] text-white px-5 py-2 rounded-md text-lg transition">
//             Add students
//           </button>
//         </Link>
//       </div>

//       {/* Students Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border rounded-lg">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 border">ID</th>
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Semester</th>
//               <th className="p-2 border">Subjects</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents.map((student) => (
//               <tr key={student.id} className="border">
//                 <td className="p-2 border">{student.id}</td>
//                 <td className="p-2 border">{student.name}</td>
//                 <td className="p-2 border">{student.semester}</td>
//                 <td className="p-2 border">{student.subjects}</td>
//                 <td className="p-2 border flex gap-2">
//                   <button className="p-1 text-gray-600 hover:text-black">
//                     <Eye className="w-4 h-4" />
//                   </button>
//                   <button className="p-1 text-blue-500 hover:text-blue-700">
//                     <Edit className="w-4 h-4" />
//                   </button>
//                   <button className="p-1 text-red-500 hover:text-red-700">
//                     <Trash className="w-4 h-4" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Edit, Trash, Eye } from "lucide-react";
import SidebarWrapper from "../sidebarWrapper";
export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([
    { id: 1, name: "Aarav Sharma", semester: 6, subjects: "AI, DWM, CN" },
    { id: 2, name: "Riya Patel", semester: 4, subjects: "SE, Cybersecurity" },
    { id: 3, name: "Kabir Mehta", semester: 2, subjects: "TCS, IP" },
  ]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    semester: "",
    subjects: "",
  });

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const addStudent = () => {
    if (!newStudent.name || !newStudent.semester || !newStudent.subjects)
      return;
    const newEntry = {
      id: students.length + 1,
      name: newStudent.name,
      semester: parseInt(newStudent.semester),
      subjects: newStudent.subjects,
    };
    setStudents([...students, newEntry]);
    setNewStudent({ name: "", semester: "", subjects: "" });
  };

  return (
    <><SidebarWrapper>
      
      <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Students</h1>

      {/* Search Bar */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 p-2 border rounded"
        />
      </div>

      {/* Add Student Form */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) =>
            setNewStudent({ ...newStudent, name: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Semester"
          value={newStudent.semester}
          onChange={(e) =>
            setNewStudent({ ...newStudent, semester: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Subjects"
          value={newStudent.subjects}
          onChange={(e) =>
            setNewStudent({ ...newStudent, subjects: e.target.value })
          }
          className="p-2 border rounded"
        />
        <button
          onClick={addStudent}
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Add Student
        </button>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Semester</th>
              <th className="p-2 border">Subjects</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border">
                <td className="p-2 border">{student.id}</td>
                <td className="p-2 border">{student.name}</td>
                <td className="p-2 border">{student.semester}</td>
                <td className="p-2 border">{student.subjects}</td>
                <td className="p-2 border flex gap-2">
                  <button className="p-1 text-gray-600 hover:text-black">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-blue-500 hover:text-blue-700">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-red-500 hover:text-red-700">
                    <Trash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      </SidebarWrapper></>
    
  );
}
