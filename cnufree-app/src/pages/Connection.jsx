import { useState } from "react";
import { UserRoundPlus } from 'lucide-react';
import SideBar from '../components/SideBar.jsx'
import HomeNavBar from "../components/HomeNavBar"
import SearchProfileModal from "../components/searchModal";

function Connection() {

     
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState("friends");
    const [showMenu, setShowMenu] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);

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

        <div className=" flex flex-col gap-5 sm:flex-row justify-between w-full items-center mb-5  bg-white">

          <div className=" bg-white flex flex-col w-full ">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#111824]"> Connected Peer Network </h1>
            <p className="text-[13px] sm:text-lg"> Manage classmates sharing schedules with your work space. </p>
          </div>



          <div className="flex items-center gap-2 w-full ">

            <div className="relative flex-1 w-full">

              <button
                onClick={() => setShowMenu(prev => !prev)}
                className="
                  w-full
                  border border-slate-300
                  rounded-lg
                  px-4 py-2
                  font-bold
                  bg-white
                  flex items-center justify-between
                "
              >
                {isActive === "friends" && "Friends"}
                {isActive === "friendReq" && "Friend Requests"}
                {isActive === "PendingReq" && "Pending Requests"}
              </button>

              <div
                className={`
                  absolute
                  right-0
                  top-full
                  mt-2
                  w-full
                  bg-white
                  border
                  border-slate-300
                  rounded-lg
                  shadow-lg
                  
                  overflow-hidden
                  transition-all
                  duration-200
                  ${
                    showMenu
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }
                `}
              >
                <button
                  onClick={() => {
                    setIsActive("friends");
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-slate-100"
                >
                  Friends
                </button>

                <button
                  onClick={() => {
                    setIsActive("friendReq");
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-slate-100"
                >
                  Friend Requests
                </button>

                <button
                  onClick={() => {
                    setIsActive("PendingReq");
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-slate-100"
                >
                  Pending Requests
                </button>
              </div>

            </div>


            <button
              onClick={() => setShowSearchModal(true)}
              className="shrink-0 border px-3 py-2 font-extrabold rounded-lg text-white bg-[#111824] flex items-center"
            >
              <UserRoundPlus size={20} />
            </button>
          </div>

        </div>

      {isActive === "friends" &&  (
        <div className="flex flex-wrap w-full gap-4 sm:gap-5 items-center justify-center  sm:items-start sm:justify-start">

          <div className=" flex-[1_1_auto] sm:flex-[0_0_auto] border border-slate-300 w-sm flex flex-col rounded-xl items-center justify-center p-5">
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

            <div className="font-extrabold text-sm bg-[#E1F6EF] rounded-xl px-3 py-2 text-[#10B981] mb-8">
                Connected
            </div>

            <button 
            className="w-full bg-red-600 font-extrabold text-white py-2 rounded-xl">
                Unfriend
            </button>
          </div>

        
        </div>

      )}

      {isActive === "friendReq" &&  (
        <div className="flex flex-wrap w-full gap-4 sm:gap-5 items-center justify-center  sm:items-start sm:justify-start">

          <div className=" flex-[1_1_auto] sm:flex-[0_0_auto] border border-slate-300 w-sm flex flex-col rounded-xl items-center justify-center p-5">
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
                Pending Request
            </div>

            <button 
            className="w-full bg-[#111824] font-extrabold text-white py-2 rounded-xl">
                Accept
            </button>
          </div>

        
        </div>

      )}

      {isActive === "PendingReq" &&  (
        <div className="flex flex-wrap w-full gap-4 sm:gap-5 items-center justify-center  sm:items-start sm:justify-start">

          <div className=" flex-[1_1_auto] sm:flex-[0_0_auto] border border-slate-300 w-sm flex flex-col rounded-xl items-center justify-center p-5">
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
                Pending
            </div>

            <button 
            className="w-full bg-slate-600 font-extrabold text-white py-2 rounded-xl">
                Cancel
            </button>
          </div>

        
        </div>

      )}

      </main>
  
        <SearchProfileModal
          open={showSearchModal}
          close={() => setShowSearchModal(false)}
        />

    </div>
  )
}

export default Connection