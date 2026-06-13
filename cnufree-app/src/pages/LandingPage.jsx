import { useNavigate } from "react-router-dom";
import { ChevronLast } from 'lucide-react';
import NavBar from '../components/navBar.jsx';
import logo from '../assets/logo.png';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="">
            {/* <TopBar/> */}
            <NavBar/>
            <section className=" overflow-hidden-[calc(100vh-61.6px)] flex flex-col items-center justify-center">

                <div className="mb-15"> 
                    <img  className="block mt-[50px] w-[300px] sm:w-[400px] md:w-[200px]"  src={logo}  alt="CNU-logo"/>  
                </div>

                <div className="flex flex-col flex-auto items-center justify-center text-center max-w-2xl">
                    <h1 className=" font-bold text-[20px] sm:text-[40px] bg-[#fce13487]"> Stay Connected. Go CNU Free! </h1>
                    <p className=" mt-5 px-5 text-[15px] sm:text-base text-[#9C9C9C]"> The all-in-one student scheduling platform — organize your classes, events, and activities while instantly seeing which friends are available. </p>
                    <button onClick={() => navigate("/SignInPage")} className="hover:bg-[#D6EAC3] transition-all duration-300 ease-in-out m-10 flex gap-2 py-[10px] px-[15px] font-bold rounded-[8px]  bg-[#FCE034] hover:bg-[#5A98E6] " > Get Started     <ChevronLast /> </button>
                </div>
   
            </section>
        </div>
    );
}

export default LandingPage