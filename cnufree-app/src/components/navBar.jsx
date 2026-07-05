import { useNavigate } from "react-router-dom";
import { Menu } from 'lucide-react';
import { useState } from "react";
import { motion } from "framer-motion";
import logo from '../assets/logo2.png';


function NavBar() {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
    
    <div className="w-full ">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className=" sm:px-10 lg:px-32 w-full border-b  border-[#e2e2e2]"
        >
        <div className=""> </div>
        <div className=" flex items-center justify-between h-[61px]">  

          <div className="flex items-center gap-2"> 
            <a href="/"> <img  className="block ml-[10px]" width="35px" src={logo} alt="CNU-logo"/>    </a> 
            <div >
              <p className="font-extrabold text-[#111827]"> CNU <span > Free </span></p>
            </div>
          </div>

            {/* <div className="hidden md:block">
              <a href="/ " className="text-[#4B5563] text-[15px] border-b-2 border-transparent hover:border-b-[#000000] p-[19px] transition-all duration-300 ease-in-out " > Feature </a>
              <a href="/ " className="text-[#4B5563] text-[15px] border-b-2 border-transparent hover:border-b-[#000000] p-[19px] transition-all duration-300 ease-in-out " > How it works  </a>
              <button> <a href="/ " className="text-[#4B5563] text-[15px] border-b-2 border-transparent hover:border-b-[#000000] p-[19px] transition-all duration-300 ease-in-out  " > Creators </a> </button>
            </div> */}


          <div className="items-center hidden sm:flex gap-1">
             <button 
             className=" hover:bg-[#111827] hover:text-white border border-slate-200 rounded-[5px] px-4 py-2 text-[15px] font-bold transition-all duration-300 ease-in-out"
             onClick={() => navigate("/SignInPage")}>  Enter Dashboard </button>
              {/* <div className=" h-[20px] border-l border-[#e2e2e2]"></div> */}
            <button  
            onClick={() => navigate("/SignInPage")}
            className="hover:bg-[#111827be] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] hover:scale-105 py-2 px-4  text-[15px] bg-[#111827] font-bold rounded-[5px] text-white px-4  mr-[10px] transition-all duration-300 ease-in-out "> Get Started </button>
          </div>
        <button className="block sm:hidden pr-5" onClick={()=> setIsOpen(!isOpen)}>  <Menu /> </button>
        </div>

          <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-[#111827] `}>
            {/* <a href="/ " className="block text-[#ffffff] border-b-2 border-transparent hover:bg-[#D6EAC3] transition-all duration-300 ease-in-out p-[5px]" > Feature </a>
            <a href="/ " className="bg-[#111827] block text-[#ffffff] border-b-2 border-transparent hover:bg-[#D6EAC3] transition-all duration-300 ease-in-out  p-[5px]" > How it works </a>
            <a href="/ " className="bg-[#111827] block text-[#ffffff] border-b-2 border-transparent hover:bg-[#D6EAC3] transition-all duration-300 ease-in-out  p-[5px] " > Creators </a> */}
            <a href="/SignInPage " className="bg-[#111827] block text-[#ffffff] border-b-2 border-transparent hover:bg-[#D6EAC3] transition-all duration-300 ease-in-out  p-[5px]"> Sign In </a>
            <a href="/SignInPage " className="bg-[#111827] block text-[#ffffff] border-b-2 border-transparent hover:bg-[#D6EAC3] transition-all duration-300 ease-in-out  p-[5px]  "> Create Schedule </a>
          </div>
      </motion.nav> 

    </div>
    );
}

export default NavBar