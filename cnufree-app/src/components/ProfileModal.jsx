import logo from '../assets/logo2.png';
import { ArrowLeftToLine } from 'lucide-react';
import { SquarePen } from 'lucide-react';

function ProfileModal({open, close, }) {
    if (!open) return null; 

  return (

    <>
    <div
        className="fixed inset-0 bg-black/50 z-30 flex items-center justify-center"
        onClick={close}
     >

     </div>

        <aside
            className={`
                py-9 px-2
                w-90 h-full
                min-h-screen
                bg-white
                border-l
                border-gray-200
                fixed
                top-0
                right-0
                z-40
                transition-transform
                duration-300
                flex
                flex-col

                ${
                open
                    ? "translate-x-0"
                    : "translate-x-full"
                }
            `}
        >

 
 
        <div className="w-full h-full flex flex-col items-center justify-between">

            <div className="w-full">
                <div className="flex items-center justify-between  mb-5">
                    <div className="flex gap-2 ">
                        <img  className="block ml-[10px]" width="25px" src={logo} alt="CNU-logo"/> 
                        <span className="font-bold text-md"> Student Profile </span>
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

                <div className="p-8  flex flex-col border rounded-[15px] mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm border px-1 font-extrabold"> ADNU </span>
                        <span className="text-sm text-slate-400"> Student Card </span>
                    </div>
                    
                    <div className="flex gap-5 w-full mb-8 ">
                        <div className="flex items-center justify-center w-17 h-17 border rounded bg-slate-300">
                            <span className="font-extrabold text-slate-600 text-[30px]"> J</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <span className="font-extrabold"> Daluro</span>
                                <span className="font-extrabold text-[13px] text-slate-400"> Francis John Paul  </span>
                            </div>

                            <div>
                                <div className="font-extrabold text-[12px] 
                                text-slate-400 flex items-center gap-2 "> ID No: <span className="text-black"> 202400069 </span>   </div>
                                <div className="font-extrabold text-[12px] 
                                text-slate-400 flex items-center  gap-2  "> Year:  <span className="text-black" > 2 - BSIT</span>  </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-300 mb-5"> </div>
                    <div className="w-full h-4 bg-[#111827]"> </div>
                </div> 

                <div className="font-extrabold text-[13px] text-slate-400 mb-2">
                    PROFILE OPTIONS
                </div>
                <div className="border-t border-slate-100 mb-2 "> </div>
                <div>
                    <button
                     className=" w-full p-2 flex items-center justify-center hover:bg-[#223151] transition-all duration-300 ease-in-out
                     gap-2 border rounded-[10px] bg-[#111827] font-extrabold text-white"
                    > <SquarePen className="w-5"/> Edit Profile Data </button>
                </div>

            </div>

            <div className="w-full flex items-center">
                <button className="w-full py-2 flex items-center justify-center transition-all duration-300 ease-in-out
                border rounded-[10px] bg-red-600 font-extrabold text-white hover:bg-[#223151]
                "> Log Out </button>
            </div>
        </div>    
   </aside>

   

    </>
  )
}

export default ProfileModal