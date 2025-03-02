import { FaHome, FaInfoCircle, FaTrophy } from "react-icons/fa";
import Image from "next/image";
import img2 from "../lib/testlink2.png"
export function Header() {
  return (
    <header className=" h-16 lg:px-20 md:px-20 flex justify-between items-center p-4 bg-white text-[#2b275d] shadow-md w-max-screen overflow-hidden">
      <Image src={img2} alt="Logo"className="filter drop-shadow-[0_0_1px_white] contrast-200 "  width={160} height={20} />
      <nav className="flex space-x-6">
        <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
          <FaHome /> <span className="hidden lg:block">Home</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
          <FaInfoCircle /> <span  className="hidden lg:block">About</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
          <FaTrophy /> <span  className="hidden lg:block" >Leaderboard</span>
        </a>
      </nav>
    </header>
  );
}