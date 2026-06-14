import { useNavigate } from "react-router-dom";
import { ChevronLast } from 'lucide-react';
import { motion } from "framer-motion";
import NavBar from '../components/navBar.jsx';
// import logo from '../assets/logo.png';
import heroimage from '../assets/mamamo.png';


function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col">
            {/* <TopBar/> */}
            <NavBar/>
            <section className=" overflow-hidden-[calc(100vh-61.6px)] flex flex-col items-center justify-center">

             <motion.div
                    className="flex flex-col flex-auto items-center justify-center text-center max-w-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.3
                    }}
                >
                    <h1 className="mt-10 text-[#111827] font-extrabold text-[30px] sm:text-[37px]  leading-tight"> A place to sync your <br/> <span className="bg-gradient-to-l from-gray-400 to-[#111827] bg-clip-text text-transparent"> weekly schdule </span> </h1>
                
                </motion.div>
   

                <motion.div
                    className="mb-5"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <img  className="block mt-[20px] w-[300px] sm:w-[400px] md:w-[600px]"  src={heroimage}  alt="CNU-logo"/>  
                </motion.div>

                <motion.div
                    className="flex flex-col flex-auto items-center justify-center text-center max-w-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.3
                    }}
                >
                    <p className="px-5 text-[10px] sm:text-[15px] text-[#9C9C9C]"> CNU Free - the all-in-one student scheduling platform — organize your classes, events, and activities while instantly seeing which friends are available. </p>
                    
                <div className="flex gap-3 md:gap-2 mt-10 ">
                    <button onClick={() => navigate("/SignInPage")} className=" hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] hover:scale-105 transition-all duration-300 ease-in-out border-2 flex gap-2 py-[10px] px-[25px] rounded-full text-white bg-[#111827] text-[13px] md:text-[15px]" > Enter Dashboard    </button>
                    <button onClick={() => navigate("/SignInPage")} className=" hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] hover:scale-105 transition-all duration-300 ease-in-out  border-2 flex gap-2 py-[10px] px-[25px] font-bold  rounded-full text-[#111827] text-[13px] md:text-[15px] " > Learn More   </button>
                </div>
                </motion.div>
   
            </section>
        </div>
    );
}

export default LandingPage