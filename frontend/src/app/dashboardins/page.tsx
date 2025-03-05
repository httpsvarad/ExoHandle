// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// // import { Header } from "../header";
// import { SlCalender } from "react-icons/sl";
// import { IoMdCheckmark } from "react-icons/io";
// import { BsPeople } from "react-icons/bs";
// import { PiExamLight } from "react-icons/pi";
// import { GrScorecard } from "react-icons/gr";
// import { IoIosArrowForward } from "react-icons/io";
// import { PiChalkboardTeacher } from "react-icons/pi";
// import { SiGoogleclassroom } from "react-icons/si";

// function Page() {
//   const router = useRouter();

//   return (
//     <div className="h-full w-full justify-center items-center ">
//       {/* <Header /> */}
//       <div className="h-full w-full px-[10vw] py-10 flex flex-col gap-4">
//         <h2 className="text-5xl ">Dashboard</h2>
//         <h4>Quick Links</h4>
//         <div className="w-full flex gap-3 ">
//           <div
//             className="w-1/5 h-44 px-6 py-6 border-2 overflow-hidden border-[#d6d6e0] rounded-lg gap-1 flex flex-col cursor-pointer"
//             onClick={() => router.push("/create-semester")}
//           >
//             <SlCalender className="dashicon mb-2" />
//             <h3 className="font-bold text-lg">Create Semester</h3>
//             <p className="text-base max-w-40">Create a new semester</p>
//           </div>

//           <div
//             className="w-1/5 h-44 px-6 py-6 border-2 overflow-hidden border-[#d6d6e0] rounded-lg gap-1 flex flex-col cursor-pointer"
//             onClick={() => router.push("/manage-batch")}
//           >
//             <BsPeople className="dashicon mb-2" />
//             <h3 className="font-bold text-lg">Manage Batch</h3>
//             <p className="text-base max-w-36">Manage your batches</p>
//           </div>

//           <div
//             className="w-1/5 h-44 px-6 py-6 border-2 overflow-hidden border-[#d6d6e0] rounded-lg gap-1 flex flex-col cursor-pointer"
//             onClick={() => router.push("/exam")}
//           >
//             <PiExamLight className="dashicon mb-2" />
//             <h3 className="font-bold text-lg">Exam</h3>
//             <p className="text-base max-w-40">Create your exams</p>
//           </div>

//           <div
//             className="w-1/5 h-44 px-6 py-6 border-2 overflow-hidden border-[#d6d6e0] rounded-lg gap-1 flex flex-col cursor-pointer"
//             onClick={() => router.push("/marks")}
//           >
//             <IoMdCheckmark className="dashicon mb-2" />
//             <h3 className="font-bold text-lg">Marks</h3>
//             <p className="text-base max-w-40">Add marks for students</p>
//           </div>

//           <div
//             className="w-1/5 h-44 px-6 py-6 border-2 overflow-hidden border-[#d6d6e0] rounded-lg gap-1 flex flex-col cursor-pointer"
//             onClick={() => router.push("/analysis")}
//           >
//             <GrScorecard className="dashicon mb-2" />
//             <h3 className="font-bold text-lg">Get Analysis</h3>
//             <p className="text-base max-w-40">Faculty and student analysis</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SlCalender } from "react-icons/sl";
import { IoMdCheckmark } from "react-icons/io";
import { BsPeople } from "react-icons/bs";
import { PiExamLight } from "react-icons/pi";
import { GrScorecard } from "react-icons/gr";

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

  return (
    <div className="h-full w-full flex flex-col px-[10vw] py-10">
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
  );
};

export default Page;
