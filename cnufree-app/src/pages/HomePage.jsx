import { useState } from "react";
import SideBar from '../components/SideBar.jsx'
import HomeNavBar from "../components/HomeNavBar"




function HomePage() {

     const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col w-full">
      <SideBar
        open={isOpen}
        close={()=> setIsOpen(false)}
       />
      <HomeNavBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> 
  
    </div>
  )
}

export default HomePage