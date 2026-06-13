import { useNavigate } from "react-router-dom";
import { ChevronLast } from 'lucide-react';
import { motion } from "framer-motion";
import NavBar from '../components/navBar.jsx';
import logo from '../assets/logo.png';


function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="">
            {/* <TopBar/> */}
            <NavBar/>
            <section className=" overflow-hidden-[calc(100vh-61.6px)] flex flex-col items-center justify-center">

                <motion.div
                    className="mb-15"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <img  className="block mt-[50px] w-[300px] sm:w-[400px] md:w-[200px]"  src={logo}  alt="CNU-logo"/>  
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
                    <h1 className=" font-bold text-[20px] sm:text-[37px] px-4  bg-[#fce13487]"> Stay Connected. Go CNU Free! </h1>
                    <p className=" mt-5 px-5 text-[15px] sm:text-base text-[#9C9C9C]"> The all-in-one student scheduling platform — organize your classes, events, and activities while instantly seeing which friends are available. </p>
                    <button onClick={() => navigate("/SignInPage")} className=" hover:shadow-[0_0_30px_rgba(252,224,52,0.9)] hover:scale-105 transition-all duration-300 ease-in-out m-10 border-2 flex gap-2 py-[10px] px-[15px] font-bold rounded-[8px]  bg-[#FCE034]" > Get Started     <ChevronLast /> </button>
                </motion.div>
   
            </section>
        </div>
    );
}

export default LandingPage