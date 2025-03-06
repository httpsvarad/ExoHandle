"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SlCalender } from "react-icons/sl";
import { IoMdCheckmark } from "react-icons/io";
import { BsPeople } from "react-icons/bs";
import { PiExamLight } from "react-icons/pi";
import { GrScorecard } from "react-icons/gr";
import SidebarWrapper from "../sidebarWrapper";
const Page = () => {
  const router = useRouter();

  const cardData = [
    {
      title: "Create Semester",
      desc: "Create a new semester",
      icon: <SlCalender />,
      route: "/create-semester",
    },
    {
      title: "Manage Batch",
      desc: "Manage your batches",
      icon: <BsPeople />,
      route: "/manage-batch",
    },
    {
      title: "Exam",
      desc: "Create your exams",
      icon: <PiExamLight />,
      route: "/exams",
    },
    {
      title: "Marks",
      desc: "Add marks for students",
      icon: <IoMdCheckmark />,
      route: "/marks",
    },
    {
      title: "Get Analysis",
      desc: "Faculty and student analysis",
      icon: <GrScorecard />,
      route: "/analysis",
    },
  ];

  return (<>
  <SidebarWrapper>
    <div  className=" w-full h-full">
    <div className="h-full w-full flex flex-col px-[10vw] py-10 ">
      <h2 className="text-5xl text-[#2c275d] font-bold">Dashboard</h2>
      <h4 className="text-[#2c275d] text-lg mt-2">Quick Links</h4>

      <div className="w-full flex gap-4 mt-4">
        {cardData.map((item, index) => (
          <div
            key={index}
            className="w-1/5 h-44 px-6 py-6 border-2 border-[#d6d6e0] rounded-lg flex flex-col cursor-pointer items-start justify-between 
                       hover:shadow-lg transition-all duration-300 hover:border-[#009c98]"
            onClick={() => router.push(item.route)}
          >
            <div className="text-[#009c98] text-3xl">{item.icon}</div>
            <h3 className="font-bold text-lg text-[#2c275d]">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
    </SidebarWrapper> 
   </>
    
  );
};

export default Page;
