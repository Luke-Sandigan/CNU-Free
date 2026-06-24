import { useState } from "react";
import SideBar from '../components/SideBar.jsx'
import HomeNavBar from "../components/HomeNavBar"

function Connection() {

     const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <SideBar
        open={isOpen}
        close={()=> setIsOpen(false)}
       />
      <HomeNavBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> 

      <main className="max-w-7xl w-full flex flex-col items-center mt-20 p-4">

        <div className="flex justify-between w-full items-center mb-5 ">
          <div className=" bg-white flex flex-col ">
            <h1 className="text-xl sm:text-3xl font-extrabold text-[#111824]"> Connected Peer Network </h1>
            <p className="text-[10px] sm:text-lg"> Manage classmates sharing schedules with your work space. </p>
          </div>
          <div>
            
            <button
             className="border px-3 py-2 font-extrabold rounded-lg text-white bg-[#111824] flex items-center gap-3"
            >
            + <span className=" hidden sm:block">  Add a friend </span>
            </button>

          </div>
        </div>

        <div className="flex flex-wrap w-full gap-4 sm:gap-5 items-center justify-center ">

          <div className=" flex-[1_1_auto] border border-slate-300 w-sm flex flex-col rounded-xl items-center justify-center p-5">
            <div  
              className="hover:bg-[#111827be] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)]  flex
              hover:scale-105 py-3  text-lg bg-slate-400 font-extrabold rounded-[5px]  px-4  mb-2
              transition-all duration-300 ease-in-out "
              > LS 
            </div>

            <div className="font-extrabold text-md">
                Luke Sandigan : <span className="font-light text-sm"> 2  - BSIT </span>
            </div>

            <div className="font-extrabold text-[12px] text-slate-600 mb-3">
                @ilovemybabygirl
            </div>

            <div className="font-extrabold text-sm bg-slate-100 rounded-xl px-3 py-2 text-slate-800 mb-8">
                Connected
            </div>

            <button 
            className="w-full bg-red-600 font-extrabold text-white py-2 rounded-xl">
                Unfriend
            </button>
          </div>

          <div className=" flex-[1_1_auto] border border-slate-300 w-sm flex flex-col rounded-xl items-center justify-center p-5">
            <div  
              className="hover:bg-[#111827be] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)]  flex
              hover:scale-105 py-3  text-lg bg-slate-400 font-extrabold rounded-[5px]  px-4  mb-2
              transition-all duration-300 ease-in-out "
              > LS 
            </div>

            <div className="font-extrabold text-md">
                Luke Sandigan : <span className="font-light text-sm"> 2  - BSIT </span>
            </div>

            <div className="font-extrabold text-[12px] text-slate-600 mb-3">
                @ilovemybabygirl
            </div>

            <div className="font-extrabold text-sm bg-slate-100 rounded-xl px-3 py-2 text-slate-800 mb-8">
                Connected
            </div>

            <button 
            className="w-full bg-red-600 font-extrabold text-white py-2 rounded-xl">
                Unfriend
            </button>
          </div>

          <div className="  flex-[1_1_auto]  border border-slate-300 w-sm flex flex-col rounded-xl items-center justify-center p-5">
            <div  
              className="hover:bg-[#111827be] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)]  flex
              hover:scale-105 py-3  text-lg bg-slate-400 font-extrabold rounded-[5px]  px-4  mb-2
              transition-all duration-300 ease-in-out "
              > LS 
            </div>

            <div className="font-extrabold text-md">
                Luke Sandigan : <span className="font-light text-sm"> 2  - BSIT </span>
            </div>

            <div className="font-extrabold text-[12px] text-slate-600 mb-3">
                @ilovemybabygirl
            </div>

            <div className="font-extrabold text-sm bg-slate-100 rounded-xl px-3 py-2 text-slate-800 mb-8">
                Connected
            </div>

            <button 
            className="w-full bg-red-600 font-extrabold text-white py-2 rounded-xl">
                Unfriend
            </button>
          </div>

        </div>


      </main>
  
    </div>
  )
}

export default Connection