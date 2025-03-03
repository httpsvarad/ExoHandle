import React from "react";
import { Header } from "../header";
import { FaUsers, FaCheckCircle } from "react-icons/fa";
import { MdWeb } from "react-icons/md";
import Loginf from "./loginform";  // Import your actual component

function LandingPage() {
  return (
    <div className="h-[100%] w-full">
      <Header />
      <div className="h-[100vh] w-full px-[10vw] py-10 flex gap-10 items-center">
        {/* Left Section - Attract Users */}
        <div className="w-1/2 flex flex-col gap-6 justify-center">
          <h2 className="text-5xl font-bold">Welcome to Our Platform</h2>
          <p className="text-lg text-gray-600">
            Experience the best features for managing education, tracking progress, and much more!
          </p>

          <div className="flex items-center gap-3">
            <FaUsers className="text-blue-500 text-3xl" />
            <p className="text-lg">Join a community of passionate learners.</p>
          </div>

          <div className="flex items-center gap-3">
            <MdWeb className="text-green-500 text-3xl" />
            <p className="text-lg">Interactive dashboards and seamless experience.</p>
          </div>

          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-yellow-500 text-3xl" />
            <p className="text-lg">Trusted by institutions and educators worldwide.</p>
          </div>

         
        </div>

        {/* Right Section - Your Component */}
        <div className="w-1/2 border-l-2 border-gray-300 pl-10">
          <Loginf />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
