"use client";
import { useRouter } from "next/navigation";
import TransitionLink from "../components/Transitionlink";
import Header2 from "../components/Header2";
import { Header } from "./header";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="h-screen overflow-hidden">
      <Header2 />
      <div className="min-h-screen bg-[rgb(44,39,93)] text-white flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in">
          Welcome to ExoHandle!
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6 text-center max-w-[70%] animate-fade-in delay-200">
          Effortlessly manage your examinations from start to finish. Handle
          seating arrangements, marks management, and result publication with
          ease. Are you ready to streamline your examination process?
        </p>
        <TransitionLink href="/dashboardins" label="Get Started" />
        <div className="absolute bottom-8 text-gray-400 text-sm animate-fade-in delay-500">
          Streamline your Institute with Exo!
        </div>
      </div>
    </div>
  );
}
