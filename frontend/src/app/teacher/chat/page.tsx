"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import TeacherSidebar from "../teacherDashboard";

export default function TeacherChatPage() {
  const [messages, setMessages] = useState([
    { sender: "admin", text: "Hello! How can I assist you?", time: "10:00 AM" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      sender: "teacher",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <TeacherSidebar>
      <div className="flex flex-col h-full bg-white shadow-lg rounded-lg">
        <div className="p-4 bg-[#2c275d] text-white text-lg font-semibold rounded-t-lg">
          Chat with Admin
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start mb-3 ${
                msg.sender === "teacher" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg text-white ${
                  msg.sender === "teacher"
                    ? "bg-[#009c98] ml-auto"
                    : "bg-gray-700 text-black"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs text-gray-200 text-right mt-1">
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-[#009c98] text-white p-2 rounded-lg hover:bg-[#007d79]"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </TeacherSidebar>
  );
}
