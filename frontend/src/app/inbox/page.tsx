// "use client";

// import { useState } from "react";
// import { Send, User } from "lucide-react";
// import { useRouter } from "next/navigation";

// const teachers = [
//   { id: 1, name: "John Doe" },
//   { id: 2, name: "Alice Smith" },
//   { id: 3, name: "Michael Johnson" },
// ];

// export default function ChatPage() {
//   const router = useRouter();
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const [messages, setMessages] = useState({});
//   const [inputMessage, setInputMessage] = useState("");

//   const sendMessage = () => {
//     if (!selectedTeacher || inputMessage.trim() === "") return;

//     setMessages((prev) => ({
//       ...prev,
//       [selectedTeacher.id]: [
//         ...(prev[selectedTeacher.id] || []),
//         { sender: "admin", text: inputMessage },
//       ],
//     }));

//     setInputMessage("");
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-gray-100 border-r p-4">
//         <h2 className="text-xl font-semibold mb-4 text-[#2c275d]">Teachers</h2>
//         <div className="space-y-3">
//           {teachers.map((teacher) => (
//             <div
//               key={teacher.id}
//               className={`flex items-center p-3 rounded-md cursor-pointer ${
//                 selectedTeacher?.id === teacher.id
//                   ? "bg-[#009c98] text-white"
//                   : "hover:bg-gray-200"
//               }`}
//               onClick={() => setSelectedTeacher(teacher)}
//             >
//               <User size={20} className="mr-2" />
//               <span className="text-lg">{teacher.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Section */}
//       <div className="flex-1 flex flex-col">
//         {/* Chat Header */}
//         <div className="bg-[#2c275d] text-white p-4 text-lg font-semibold">
//           {selectedTeacher ? selectedTeacher.name : "Select a teacher to chat"}
//         </div>

//         {/* Chat Messages */}
//         <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
//           {selectedTeacher &&
//             (messages[selectedTeacher.id]?.length > 0 ? (
//               messages[selectedTeacher.id].map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`p-3 max-w-xs rounded-lg ${
//                     msg.sender === "admin"
//                       ? "ml-auto bg-[#009c98] text-white"
//                       : "bg-gray-200"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center">No messages yet</p>
//             ))}
//         </div>

//         {/* Message Input */}
//         {selectedTeacher && (
//           <div className="p-4 border-t flex items-center">
//             <input
//               type="text"
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               placeholder="Type a message..."
//               className="flex-1 p-2 border rounded-md"
//             />
//             <button
//               onClick={sendMessage}
//               className="ml-2 bg-[#009c98] hover:bg-[#007d79] text-white p-2 rounded-md"
//             >
//               <Send size={20} />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
