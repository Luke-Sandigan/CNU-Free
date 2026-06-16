import { useNavigate } from "react-router-dom";
import { Menu } from 'lucide-react';
import { motion } from "framer-motion";
import { Search } from 'lucide-react';
import logo from '../assets/logo2.png';

function HomeNavBar({ isOpen, setIsOpen, searchQuery, onSearchChange, onTriggerProfile, userName }) {
    const navigate = useNavigate();
    
    return (
    <div className="w-full ">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className=" px-3 w-full border-b  border-[#e2e2e2] z-10 bg-white"
        >
        <div className=" flex items-center justify-between h-[61px]"> 
          <div className="flex items-center gap-2 "> 
             <button className="block" onClick={()=> setIsOpen(!isOpen)}>  <Menu /> </button>
            <a href="/"> <img  className="block ml-[10px]" width="35px" src={logo} alt="CNU-logo"/>    </a> 
            <div className="hidden sm:block ">
              <p className="font-extrabold text-[#111827] "> CNU <span > Free </span></p>
            </div>
          </div>

            <div className="flex items-center justify-center w-1/2 md:w-100 mr-11 md:mr-0">
                <Search
                    size={18}
                    className=" translate-x-8  text-gray-400"
                />
                    <input 
                    className=" p-2 px-4 pl-10 w-full border text-gray-900 text-[15px] border-slate-200 rounded-full focus:outline-none focus:ring-1 focus:ring-[#111827]"
                    type="text"
                    placeholder="Search folders, tasks, or connected peers..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    />
            </div>

          <div className="items-center flex gap-1">
             <button 
             className=" hover:bg-[#111827] hover:text-white border border-slate-200 hidden sm:block  rounded-[5px] px-4 py-2 text-[15px] font-bold transition-all duration-300 ease-in-out"
             onClick={() => navigate("/")}>  Log Out  </button>
            <div  
            onClick={onTriggerProfile}
            style={{ cursor: 'pointer' }}
            className="hover:bg-[#111827be] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] hover:scale-105 py-2 px-4  text-[15px] bg-[#111827] font-bold rounded-[5px] text-white px-4  transition-all duration-300 ease-in-out "
            >
              {userName ? userName.charAt(0).toUpperCase() : 'F'}
            </div>
          </div>
        </div>
      </motion.nav> 
    </div>
    );
}

export default HomeNavBar;