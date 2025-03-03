import React from 'react'
import { Header } from "../header" ;
import { SlCalender } from "react-icons/sl";
import { IoMdCheckmark } from "react-icons/io";
import { BsPeople } from "react-icons/bs";
import { PiExamLight } from "react-icons/pi";
import { GrScorecard } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { PiChalkboardTeacher } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
function page() {
  return (
    <div className='h-full w-full justify-center items-center '>
      <Header/>
      <div className='h-full w-full px-[10vw] py-10 flex flex-col gap-4'>
          <h2 className='text-5xl '>Dashboard</h2>
          <h4>Quick Links</h4>
          <div className='w-full flex gap-3 '>
             <div className='w-1/5 h-44 px-6 py-6 border-2 overflow-hidden border-[#d6d6e0] rounded-lg gap-1 flex flex-col' >
             <SlCalender className='dashicon mb-2'/>
             <h3 className='font-bold text-lg'>Create Semister</h3>
             <p className='text-base max-w-40'>Create a new semister</p>
             </div>

             <div className='w-1/5 h-44 px-6 py-6 border-2 overflow-hidden border-[#d6d6e0] rounded-lg gap-1 flex flex-col' >
             <BsPeople className='dashicon mb-2'/>
             <h3 className='font-bold text-lg'>Manage Batch</h3>
             <p className='text-base max-w-36'>Mange your batches</p>
             </div>

             <div className='w-1/5 h-44 px-6 py-6 border-2 overflow-hidden border-[#d6d6e0] rounded-lg gap-1 flex flex-col' >
             < PiExamLight className='dashicon mb-2'/>
             <h3 className='font-bold text-lg'>Exam</h3>
             <p className='text-base max-w-40'>Create your exams</p>
             </div>

             <div className='w-1/5 h-44 px-6 py-6 border-2 overflow-hidden border-[#d6d6e0] rounded-lg gap-1 flex flex-col' >
             <IoMdCheckmark className='dashicon mb-2'/>
             <h3 className='font-bold text-lg'>Marks</h3>
             <p className='text-base max-w-40'>Add marks for students</p>
             </div>

             <div className='w-1/5 h-44 px-6 py-6 border-2 overflow-hidden border-[#d6d6e0] rounded-lg gap-1 flex flex-col' >
             <GrScorecard className='dashicon mb-2'/>
             <h3 className='font-bold text-lg'>Get Analysis</h3>
             <p className='text-base max-w-40'>Faculty and studrnt analysis</p>
             </div>

          </div>
          <h4>Institute Classrooms</h4>

          <div className='w-full h-14 flex overflow-hidden'>
            <div className='h-full w-[5%] rounded-md bg-[#ebebf0] flex justify-center items-center'>
            <SiGoogleclassroom className='dashicon '/>
            </div>
            <div className='w-[90%] h-full overflow-hidden flex flex-col gap-1/2 py-1 px-3 justify-center '>
               <h3 className='font-semibold text-base'> Available Classrooms</h3>
               <p className='text-base '>12th-Augest-2025</p>
            </div>
            <IoIosArrowForward className='dashicon  mt-2'/>
          </div>
           
          <h4>Teachers List</h4>

          <div className='w-full h-14 flex overflow-hidden'>
            <div className='h-full w-[5%] rounded-md bg-[#ebebf0] flex justify-center items-center'>
            < PiChalkboardTeacher className='dashicon '/>
            </div>
            <div className='w-[90%] h-full overflow-hidden flex flex-col gap-1/2 py-1 px-3 justify-center '>
               <h3 className='font-semibold text-base'>Teachers List</h3>
               <p className='text-base '>12th-Augest-2025</p>
            </div>
            <IoIosArrowForward className='dashicon  mt-2'/>
          </div>
          
          <h4>Students List</h4>

          <div className='w-full h-14 flex  overflow-hidden'>
            <div className='h-full w-[5%] rounded-md bg-[#ebebf0] flex justify-center items-center'>
            <BsPeople className='dashicon '/>
            </div>
            <div className='w-[90%] h-full overflow-hidden flex flex-col gap-1/2 py-1 px-3 justify-center '>
               <h3 className='font-semibold text-base'>Students List</h3>
               <p className='text-base '>12th-Augest-2025</p>
            </div>
            <IoIosArrowForward className='dashicon  mt-2'/>
          </div>

      </div>
    </div>
  )
}

export default page
