import { useNavigate } from "react-router-dom";
import { Menu } from 'lucide-react';
import { useState } from "react";
import logo from '../assets/logo.png';


function NavBar() {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
    
    <>
        <nav className=" w-full border-b border-[#e2e2e2]  sm:px-10 lg:px-32">

        <div className="flex items-center justify-between">  

          <div className="flex items-center"> 
            <a href="/"> <img  className="block ml-[10px]" width="50px" src={logo} alt="CNU-logo"/>    </a> 
            <div className="hidden md:block">
              <a href="/ " className="text-[#7C7B7B] border-b-2 border-transparent hover:border-b-[#FCE034] p-[19px] transition-all duration-300 ease-in-out " > Schedule </a>
              <a href="/ " className="text-[#7C7B7B] border-b-2 border-transparent hover:border-b-[#FCE034] p-[19px] transition-all duration-300 ease-in-out " > Friends  </a>
              <button> <a href="/ " className="text-[#7C7B7B] border-b-2 border-transparent hover:border-b-[#FCE034] p-[19px] transition-all duration-300 ease-in-out  " > Calendar </a> </button>
            </div>
          </div>


          <div className="items-center hidden sm:flex">
             <button onClick={() => navigate("/SignInPage")}> <a className=" border-l-1 border-b-2 border-transparent hover:border-b-[#FCE034] p-[18px] font-bold transition-all duration-300 ease-in-out"> Sign In </a> </button>
              <div className=" h-[20px] border-l border-[#e2e2e2]"></div>
            <button  className=" pl-[20px] border-b-2 border-transparent bg-[#FCE034]  hover:bg-[#D6EAC3] p-[18px] font-bold mr-[10px] transition-all duration-300 ease-in-out "> Create a Job Post </button>
          </div>
        <button className="block sm:hidden pr-5" onClick={()=> setIsOpen(!isOpen)}>  <Menu /> </button>
        </div>

          <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-[#243668]`}>
            <a href="/ " className="block text-[#ffffff] border-b-2 border-transparent hover:bg-[#D6EAC3] transition-all duration-300 ease-in-out p-[5px]" > Posts </a>
            <a href="/ " className="block text-[#ffffff] border-b-2 border-transparent hover:bg-[#D6EAC3] transition-all duration-300 ease-in-out  p-[5px]" > Salaries  </a>
            <a href="/ " className="block text-[#ffffff] border-b-2 border-transparent hover:bg-[#D6EAC3] transition-all duration-300 ease-in-out  p-[5px] " > Company Reviews </a>
            <a href="/ " className="block text-[#ffffff] border-b-2 border-transparent hover:bg-[#D6EAC3] transition-all duration-300 ease-in-out  p-[5px]"> Sign In </a>
            <a href="/ " className="block text-[#ffffff] border-b-2 border-transparent hover:bg-[#D6EAC3] transition-all duration-300 ease-in-out  p-[5px]  "> Create Schedule </a>
          </div>
      </nav> 

    </>
    );
}

export default NavBar