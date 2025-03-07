// 

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

// Interfaces
interface User {
  id: string;
  name: string;
  role: string;
}

interface Message {
  id: number;
  content: string;
  sender: { name: string };
  createdAt: string;
}

interface GroupChat {
  id: number;
  name: string;
}

// Socket instance
const socket = io("http://localhost:8000");

export default function GroupChatPage() {
  const [user, setUser] = useState<User | null>(null);
  const [groupChats, setGroupChats] = useState<GroupChat[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<GroupChat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [groupName, setGroupName] = useState("");
  const [semester, setSemester] = useState<number | "">("");

  // Fetch user authentication
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get("http://localhost:8000/auth/me", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Auth Error:", error);
        setUser(null);
      }
    }
    checkAuth();
    fetchGroups();
  }, []);

  // Fetch messages when group is selected
  useEffect(() => {
    if (selectedGroup) {
      fetchMessages(selectedGroup.id);
      socket.emit("joinGroup", selectedGroup.id);
    }
  }, [selectedGroup]);

  // Socket.IO listener for real-time messages
  useEffect(() => {
    socket.on("receiveMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Fetch Group Chats
  async function fetchGroups() {
    try {
      const response = await axios.get("http://localhost:8000/grpchat/allgrp", {
        withCredentials: true,
      });
      setGroupChats(response.data.groupChats);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  }

  // Fetch Messages
  async function fetchMessages(groupChatId: number) {
    try {
      const response = await axios.get(
        `http://localhost:8000/grpchat/${groupChatId}`,
        { withCredentials: true }
      );
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

  // Create Group Chat (Only Teachers/Admins)
  async function createGroupChat() {
    if (!groupName || !semester) return alert("Enter group name and semester");
    try {
      await axios.post(
        "http://localhost:8000/grpchat/",
        { name: groupName, semester },
        { withCredentials: true }
      );
      fetchGroups();
      setGroupName("");
      setSemester("");
    } catch (error) {
      console.error("Error creating group chat:", error);
    }
  }

  // Send Message
  async function sendMessage() {
    if (!selectedGroup || !message) return;
    try {
      const response = await axios.post(
        "http://localhost:8000/grpchat/send",
        { groupChatId: selectedGroup.id, content: message },
        { withCredentials: true }
      );
      socket.emit("sendMessage", response.data.message);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar: Group List */}
      <div className="w-1/4 p-4 bg-gray-800">
        <h2 className="text-lg font-bold">Group Chats</h2>
        <ul>
          {groupChats.map((group) => (
            <li
              key={group.id}
              className={`p-2 mt-2 cursor-pointer rounded ${
                selectedGroup?.id === group.id ? "bg-blue-500" : "bg-gray-700"
              }`}
              onClick={() => setSelectedGroup(group)}
            >
              {group.name}
            </li>
          ))}
        </ul>

        {/* Create Group Chat (Only for Teachers/Admins) */}
        {user?.role === "TEACHER" || user?.role === "ADMIN" ? (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Group Name"
              className="w-full p-2 rounded bg-gray-700 outline-none"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Semester"
              className="w-full p-2 mt-2 rounded bg-gray-700 outline-none"
              value={semester}
              onChange={(e) =>
                setSemester(e.target.value ? parseInt(e.target.value) : "")
              }
            />
            <button
              onClick={createGroupChat}
              className="w-full mt-2 p-2 bg-green-500 rounded"
            >
              Create Group
            </button>
          </div>
        ) : null}
      </div>

      {/* Chat Section */}
      <div className="w-3/4 flex flex-col">
        <header className="p-4 bg-gray-800 text-lg font-bold">
          {selectedGroup ? selectedGroup.name : "Select a group"}
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg) => (
            <div key={msg.id} className="p-2 rounded bg-gray-700">
              {/* <p className="text-sm font-bold">{msg.sender.name}</p> */}
              <p>{msg.content}</p>
              <p className="text-xs text-gray-400">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>

        {/* Send Message */}
        {user?.role === "TEACHER" || user?.role === "ADMIN" ? (
          <div className="p-4 bg-gray-800 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 rounded bg-gray-700 outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 px-4 py-2 rounded text-white cursor-pointer"
            >
              Send
            </button>
          </div>
        ) : (
          <div className="p-4 text-center text-gray-400">
            Only teachers & admins can send messages.
          </div>
        )}
      </div>
    </div>
  );
}
