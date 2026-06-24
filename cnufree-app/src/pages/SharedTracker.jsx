import { useState } from "react";
import SideBar from '../components/SideBar.jsx'
import HomeNavBar from "../components/HomeNavBar"
import { Eye } from 'lucide-react';
// import OnboardingWrap from "../components/OnboardingWrap.jsx";


function SharedTracker() {

     const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center ">
      <SideBar
        open={isOpen}
        close={()=> setIsOpen(false)}
       />
      <HomeNavBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> 

      <div className="flex flex-col max-w-lg w-full mt-15">

        <div className="flex justify-between items-center mb-5 px-5 py-5 bg-[#111827] ">
          <div className="flex flex-col">
            <h1 className="font-extrabold text-xl sm:text-4xl text-white"> Friend's Tracker </h1>
            <p className="text-md text-slate-400"> Find who's friend is free! </p>
          </div>
          
          <div> 
            <Eye className="size-20 text-white"/>
          </div>

        </div>
        
        <div className="w-full border-none sm:border p-4 rounded-2xl border-slate-300">
          <div className="flex flex-col mb-5 ">
            <h1 className="font-extrabold text-md"> Friends </h1>
            <p className="sm:text-sm text-slate-500 flex items-center gap-1 text-[13px]"> See your friend's schedule by pressing the " <Eye className="size-4"/> " button. </p>
          </div>

          <div className="flex flex-col gap-3">

              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center justify-center mb-2"> 
                    <div className="bg-[#10B981] rounded-full size-2 sm:size-2"/> 
                    <div className="flex flex-col w-[100px] sm:w-[125px]">
                        <h1 className="text-sm font-extrabold"> Luke </h1>
                        <p className=" text-xs font-bold text-slate-400"> @ilovemybabygirl </p>
                    </div>

                </div>

                <div className=" bg-[#E1F6EF] flex flex-col border p-2 border-[#10B981] rounded-lg"> 
                  <div className="flex gap-2 items-center justify-center">
                    <div className="bg-[#10B981] rounded-full size-2"/> 
                    <div className="text-[#10B981] text-[10px] sm:text-sm font-extrabold "> Free: <span className="font-light"> 9:00 am - 12:00 am  </span> </div>
                  </div>
                    
                </div>
                <button
                  className="p-1 bg-[#111827] text-white rounded"
                >
                  <Eye className="size-5"/>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center justify-center mb-2"> 
                    <div className="bg-[#EF4444] rounded-full size-2"/> 
                    <div className="flex flex-col  w-[100px] sm:w-[125px]">
                        <h1 className="text-sm font-extrabold"> Krisselle </h1>
                        <p className=" text-xs font-bold text-slate-400"> @aintabitch </p>
                    </div>

                </div>

                <div className=" bg-[#FCDADA] flex flex-col border p-2 border-[#EF4444] rounded-lg"> 
                  <div className="flex gap-2 items-center justify-center">
                    <div className="bg-[#EF4444] rounded-full size-2"/> 
                    <div className="text-[#EF4444] text-[10px] sm:text-sm font-extrabold "> Busy: <span className="font-light"> 9:00 am - 12:00 am  </span> </div>
                  </div>
                    
                </div>
                <button
                  className="p-1 bg-[#111827] text-white rounded"
                >
                  <Eye className="size-5"/>
                </button>
              </div>

              

          </div>

        <div>
            
          </div>
        </div>
   
      </div>


    </div>
  )
}

export default SharedTracker