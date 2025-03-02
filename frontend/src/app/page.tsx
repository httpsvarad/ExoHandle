"use client";
import { FaHome, FaInfoCircle, FaTrophy } from "react-icons/fa";
import Image from "next/image";
import img2 from "../lib/testlink2.png"
import { useRouter } from "next/navigation";
import TransitionLink from "../components/Transitionlink";
import { Header } from "./header" ;
export function Header2() {
  return (
    <header className="w-full px-20 flex justify-between items-center p-4 bg-white text-[#2b275d] shadow-md">
      <Image src={img2} alt="Logo"className="filter drop-shadow-[0_0_1px_white] contrast-200 "  width={160} height={20} />
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

export default function LandingPage({ onStart }: { onStart: () => void }) {
  const router = useRouter(); 
  return (
    <div className="h-screen overflow-hidden" >
      <Header  />
    
    <div className="min-h-screen bg-[rgb(44,39,93)] text-white flex flex-col items-center justify-center px-6">
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in">
        Welcome to the ExoHandle!
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-6 text-center max-w-[70%] animate-fade-in delay-200">
      Effortlessly manage your examinations from start to finish. Handle seating arrangements, marks management, and result publication with ease. Are you ready to streamline your examination process?
      </p>
      {/*<button
        onClick={() => router.push("/main")} 
        className="px-6 py-3 bg-[#009c98] hover:bg-blue-600 transition-all rounded-xl text-lg font-semibold shadow-lg animate-bounce mt-4"
      >
        
        Start Quiz
      </button>*/}
      <TransitionLink href="/main" label="Get Started" />
      <div className="absolute bottom-8 text-gray-400 text-sm animate-fade-in delay-500">
      Streamline your Institute with Exo!
      </div>
    </div>
    </div>
  );
}
