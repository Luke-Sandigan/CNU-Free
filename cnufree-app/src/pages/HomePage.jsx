import HomeNavBar from "../components/HomeNavBar"
import SideBar from '../components/Sidebar.jsx'
import { useState } from "react";


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