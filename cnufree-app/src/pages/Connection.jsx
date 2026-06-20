import { useState } from "react";
import SideBar from '../components/SideBar.jsx'
import HomeNavBar from "../components/HomeNavBar"

function Connection() {

     const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col ">
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

export default Connection