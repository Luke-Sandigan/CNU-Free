import { useNavigate } from "react-router-dom";
import { Menu, Search, Bell } from 'lucide-react';
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import logo from '../assets/logo2.png';
import ProfileModal from "./ProfileModal";
import SideBar from "./SideBar";
import { supabase } from "../utils/supabase";
import NotificationModal from "./NotificationModal";
// import SideBar from './Sidebar.jsx'



function HomeNavBar({isOpen, setIsOpen}) {

    const navigate = useNavigate();
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [profile, setProfile] = useState(null);
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    
    //  useEffect(() => {

    //     const savedProfile = localStorage.getItem("studentProfile");

    //     if (savedProfile) {setProfile(JSON.parse(savedProfile));}

    // }, []);

    useEffect(() => {

      let channel;

        async function loadProfile() {

            const {
                data: { user }
            } = await supabase.auth.getUser();

            if (!user) return;

            const { data } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            setProfile(data);

            channel = supabase
                .channel(`profile-${user.id}`)
                .on(
                    "postgres_changes",
                    {
                        event: "UPDATE",
                        schema: "public",
                        table: "profiles",
                        filter: `id=eq.${user.id}`
                    },
                    (payload) => {
                      console.log("===== EVENT RECEIVED =====");
                      console.log(payload);
                      setProfile(payload.new);

                    }
                )
                .subscribe((status) => {
                    console.log("Channel status:", status);
                });

            return channel;
        }

        

        loadProfile();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
        };

    }, []);

    async function handleLogout() {

          const { error } = await supabase.auth.signOut();

          if (error) {
              console.error(error);
              return;
          }

          navigate("/");
    }


    return (
    
    <div className="w-full fixed bg-white z-30">

      <ProfileModal
          open={isProfileOpen}
          close={()=> setProfileOpen(false)}
        />

      <NotificationModal
          open={isNotificationOpen}
          close={() => setNotificationOpen(false)}
      />
      
      <SideBar
        open={isOpen}
        close={() => setIsOpen(false)}
      />

  

        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className=" px-3 w-full border-b  border-[#e2e2e2] z-60"
        >
        <div className=""> </div>
        
        <div className=" flex items-center justify-between h-[61px]"> 
         

          <div className="flex items-center gap-2 "> 
            <button className="block" onClick={()=> setIsOpen(!isOpen)}>  <Menu /> </button>
             {/* <SideBar/> */}
            <a href="/"> <img  className="block ml-[10px]" width="35px" src={logo} alt="CNU-logo"/>    </a> 
            <div className="hidden sm:block ">
              <p className="font-extrabold text-[#111827] "> CNU <span > Free </span></p>
            </div>
          </div>

            <div className="flex items-center justify-center w-1/2 md:w-100  md:mr-0">

              <Search
                  size={18}
                  className=" translate-x-8  text-gray-400"
              />

              <input 
              className=" p-2 px-4 pl-10 w-full border text-gray-900 text-[15px] p- border-slate-200 rounded-full"
              type="text"
              placeholder="Search a friend..."
              />
  
            </div>


          <div className="items-center flex gap-1">
            <button
                onClick={() => setNotificationOpen(true)}
                className="
                    relative
                    rounded-md
                    border
                    border-slate-200
                    p-2
                    hover:bg-slate-100
                "
            >
                <Bell size={20} />
            </button>
             <button 
             className=" hover:bg-[#111827] hover:text-white border border-slate-200 hidden sm:block  rounded-[5px] px-4 py-2 text-[15px] font-bold transition-all duration-300 ease-in-out"
             onClick={handleLogout} >  Log Out 
             </button>
              {/* <div className=" h-[20px] border-l border-[#e2e2e2]"></div> */}
            <div  
            onClick={()=> setProfileOpen(true)}

            className="hover:bg-[#111827be] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] hover:scale-105 py-2 px-4  text-[15px] bg-[#111827] font-extrabold rounded-[5px] text-white px-4  transition-all duration-300 ease-in-out "
            > {profile?.firstname.charAt(0).toUpperCase() || "?"} </div>
          </div>
        </div>

      </motion.nav> 

    </div>
    );
}

export default HomeNavBar