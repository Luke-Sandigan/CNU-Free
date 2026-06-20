import { useNavigate } from "react-router-dom";
import { ArrowLeftToLine } from 'lucide-react';
import { ClipboardList } from 'lucide-react';
import { Boxes } from 'lucide-react';
import { UserCheck } from 'lucide-react';

import logo from '../assets/logo2.png';

function SideBar ({open, close}) {

    const navigate = useNavigate();


    return (
<>
    {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 "
          onClick={close}
        />
      )}

    <aside
      className={`
        py-4 w-64 min-h-screen bg-white border-r border-gray-200
        fixed top-0 left-0  z-40 
        transition-transform duration-300 
       flex flex-col     ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex align-center justify-center gap-18 mb-5">
          <div className="flex gap-2 items-center justify-center">
            <a href="/"> <img  className="block ml-[10px]" width="30px" src={logo} alt="CNU-logo"/>    </a> 
            <p className=" pt-0.5 font-extrabold text-[#111827] "> CNU <span > Free </span></p>
          </div>

          <div className="">
            <button 
              className="pt-2 hover:bg-slate-300 pb-2 hover:rounded-full transition-all duration-300 ease-in-out"
              onClick={close}
            >
              <ArrowLeftToLine size={20} />
            </button> 
          </div>
      </div>

      

      <nav className="flex flex-col flex-1 text-[15px]  text-slate-500">
        
            <div className="p-2 pl-8 flex gap-3 items-center hover:text-black hover:bg-slate-100 transition-all duration-300 ease-in-out"
            onClick={()=> navigate("/Home")}
            >
              <ClipboardList size={23} />
              <a href="#" className=" hover:bg-gray-100">
                My Planner
              </a>
            </div>

            <div className="p-2 pl-8 flex gap-3 items-center hover:text-black hover:bg-slate-100 transition-all duration-300 ease-in-out" 
            onClick={()=> navigate("/SharedTracker")}
            >
              <Boxes size={23} />
              <a href="#" className=" hover:bg-gray-100">

                Shared Tracker
              </a>
            </div>

            <div className="p-2 pl-8 flex gap-3 items-center hover:text-black hover:bg-slate-100 transition-all duration-300 ease-in-out" 
            onClick={()=> navigate("/")}
            >
              <UserCheck size={23} />
              <a href="#" className=" hover:bg-gray-100">
                Connection
              </a>
            </div>

      
      
      </nav>

      <div className="mt-auto flex p-2 gap-2 flex items-center justify-center h-20 border border-x-0 border-y-slate-200">
        <div className="w-9 h-9 bg-[#111827] rounded-full flex items-center justify-center shrink-0">
          <p className="text-white font-extrabold text-sm">F</p>
        </div>

          <div className="flex flex-col ">
              <h3 className="font-extrabold"> Francis John Paul Daluro</h3>
              <p className="text-[13px]"> BSIT - 2</p>
          </div>
      </div>
</aside>
  </>
    );
}

export default SideBar