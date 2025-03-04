"use client";
import { FaHome, FaInfoCircle, FaTrophy } from "react-icons/fa";
import Image from "next/image";
import img2 from "../lib/testlink2.png";

export default function Header2() {
  return (
    <header className="w-full px-20 flex justify-between items-center p-4 bg-white text-[#2b275d] shadow-md">
      <Image
        src={img2}
        alt="Logo"
        className="filter drop-shadow-[0_0_1px_white] contrast-200"
        width={160}
        height={20}
      />
      <nav className="flex space-x-6">
        <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
          <FaHome /> <span>Home</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
          <FaInfoCircle /> <span>About</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
          <FaTrophy /> <span>Leaderboard</span>
        </a>
      </nav>
    </header>
  );
}
