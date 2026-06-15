import { useNavigate } from "react-router-dom";
import { Menu } from 'lucide-react';
import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from 'lucide-react';
import logo from '../assets/logo.png';



function HomeNavBar() {

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

          <div className="flex items-center "> 
            <a href="/"> <img  className="block ml-[10px]" width="50px" src={logo} alt="CNU-logo"/>    </a> 
            <div >
              <p className="font-extrabold text-[#111827]"> CNU <span > Free </span></p>
            </div>
          </div>

            <div className="flex items-center justify-center w-1/2 md:w-1/3">
                <Search
                    size={18}
                    className=" translate-x-8  text-gray-400"
                />
                    <input 
                    className=" p-2 px-4 pl-10 w-full border text-gray-900 text-[15px] p- border-slate-200 rounded-full"
                    type="text"
                    placeholder="Search folders, tasks, or connected peers..."
                    
                    />
                
            </div>


          <div className="items-center hidden sm:flex gap-1">
             <button 
             className=" hover:bg-[#111827] hover:text-white border border-slate-200 rounded-[5px] px-4 py-2 text-[15px] font-bold transition-all duration-300 ease-in-out"
             onClick={() => navigate("/SignInPage")}>  Log Out  </button>
              {/* <div className=" h-[20px] border-l border-[#e2e2e2]"></div> */}
            <div  
            onClick={()=> alert("Clicked!")}
            className="hover:bg-[#111827be] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] hover:scale-105 py-2 px-4  text-[15px] bg-[#111827] font-bold rounded-[5px] text-white px-4  mr-[10px] transition-all duration-300 ease-in-out "
            > L </div>
          </div>
        <button className="block sm:hidden pr-5" onClick={()=> setIsOpen(!isOpen)}>  <Menu /> </button>
        </div>

      </motion.nav> 

    </div>
    );
}

export default HomeNavBar