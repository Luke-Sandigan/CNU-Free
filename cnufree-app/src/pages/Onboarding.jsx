import { useState } from "react"
import { useNavigate } from "react-router-dom";
import OnboardingWrap from '../components/OnboardingWrap';
import ProgressBar from '../components/ProgressBar';

function Onboarding() {

    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    
    const [IDnum, setIDnum] = useState("")
    const [school, setSchool] = useState("")

    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")

    const [year, setYear] = useState("")
    const [program, setProgram] = useState("")

    const [username, setUsername] = useState("")

  return (
    <div   className="bg-[#111827] w-full h-screen flex flex-col items-center gap-4">
        {step === 1 &&  (
            <>
                <ProgressBar
                    percentage="25%"
                    progress={25}
                />
                <OnboardingWrap>


                    <h1 className="font-extrabold text-sm sm:text-xl mb-2">
                        Tell us which school you're currently attending!
                    </h1>

                    <p className="text-sm text-[#A3A3A3] text-center mb-8">
                        This helps personalize your academic profile and identify your institution.
                    </p>


                    <div className="flex gap-2 w-full items-center justify-between mb-8">    
                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-extrabold text-sm text-[#A3A3A3]" htmlFor="school">
                                SCHOOL NAME
                            </label>

                            <input
                             id="school"
                             value={school}
                             placeholder="e.g. ADNU"
                             onChange={(e)=> setSchool(e.target.value)}
                             className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"   
                            >
                            </input>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-extrabold text-sm text-[#A3A3A3]" htmlFor="idnum">
                                ID NUMBER
                            </label>

                            <input
                             id="idnum"
                             value={IDnum}
                             placeholder="e.g. 202400143"
                             onChange={(e)=> setIDnum(e.target.value)}
                             className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"   
                            >
                            </input>
                        </div>
                    </div>

                    <div className="flex items-center justify-between w-full"> 
                        <button   className="flex gap-3 text-[#111827] border rounded border-slate-500 py-2.25 px-[15px]
                         font-bold text-sm hover:underline " onClick={() => navigate("/")}>
                            <span>←</span>
                                Back
                        </button>

                         <button
                            className="ml-auto flex gap-2 py-[10px] px-[15px] 
                            font-bold rounded-[8px] text-sm transition-all duration-300 ease-in-out 
                            text-amber-50 bg-[#111827] hover:bg-[#5A98E6] "
                            onClick={() => setStep(2)}
                        >
                            NEXT
                            <span> → </span>
                        </button>


                    </div>
                       
                </OnboardingWrap>

            </>

            )}

            {step === 2 &&  (
                    <>
                        <ProgressBar
                            percentage="50%"
                            progress={50}
                        />
                        <OnboardingWrap>


                            <h1 className="font-extrabold text-sm sm:text-xl mb-2">
                                What's your name?
                            </h1>

                            <p className="text-sm text-[#A3A3A3] text-center mb-8">
                                We'll use this to personalize your profile and identify you within the system.
                            </p>


                            <div className="flex gap-2 w-full items-center justify-between mb-8">    
                                <div className="flex flex-col gap-2 w-full">
                                    <label className="font-extrabold text-sm text-[#A3A3A3]" htmlFor="firstName">
                                        FIRSTNAME
                                    </label>

                                    <input
                                    id="firstName"
                                    value={firstname}
                                    placeholder="e.g. Juan"
                                    onChange={(e)=> setFirstname(e.target.value)}
                                    className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"   
                                    >
                                    </input>
                                </div>

                                <div className="flex flex-col gap-2 w-full">
                                    <label className="font-extrabold text-sm text-[#A3A3A3]" htmlFor="lastName">
                                        LASTNAME
                                    </label>

                                    <input
                                    id="lastName"
                                    value={lastname}
                                    placeholder="e.g. Dela Cruz"
                                    onChange={(e)=> setLastname(e.target.value)}
                                    className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"   
                                    >
                                    </input>
                                </div>
                            </div>

                            <div className="flex items-center justify-between w-full"> 
                                <button   className="flex gap-3 text-[#111827] border rounded border-slate-500 py-2.25 px-[15px]
                                font-bold text-sm hover:underline " onClick={() => setStep(1)}>
                                    <span>←</span>
                                        Back
                                </button>

                                <button
                                    className="ml-auto flex gap-2 py-[10px] px-[15px] 
                                    font-bold rounded-[8px] text-sm transition-all duration-300 ease-in-out 
                                    text-amber-50 bg-[#111827] hover:bg-[#5A98E6] "
                                    onClick={() => setStep(3)}
                                >
                                    NEXT
                                    <span> → </span>
                                </button>


                            </div>
                            
                        </OnboardingWrap>

                    </>
                )}

                {step === 3 &&  (
                        <>
                            <ProgressBar
                                percentage="75%"
                                progress={75}
                            />
                            <OnboardingWrap>


                                <h1 className="font-extrabold text-sm sm:text-xl mb-2">
                                    What is your current year level and program?
                                </h1>

                                <p className="text-sm text-[#A3A3A3] text-center mb-8">
                                    Let us know your current academic standing, such as 1st Year, 2nd Year, and so on.
                                </p>


                                <div className="flex gap-2 w-full items-center justify-between mb-8">    
                                    <div className="flex flex-col gap-2 w-full">
                                        <label className="font-extrabold text-sm text-[#A3A3A3]" htmlFor="year">
                                            YEAR
                                        </label>

                                        <input
                                        id="year"
                                        type="number"
                                        value={year}
                                        placeholder="number only (e.g. 1, 2, 3, or 4)"
                                        onChange={(e)=> setYear(e.target.value)}
                                        className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"   
                                        >
                                        </input>
                                    </div>

                                    <div className="flex flex-col gap-2 w-full">
                                        <label className="font-extrabold text-sm text-[#A3A3A3]" htmlFor="program">
                                            PROGRAM
                                        </label>

                                        <input
                                        id="program"
                                        value={program}
                                        placeholder="e.g. BSIT"
                                        onChange={(e)=> setProgram(e.target.value)}
                                        className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"   
                                        >
                                        </input>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between w-full"> 
                                    <button   className="flex gap-3 text-[#111827] border rounded border-slate-500 py-2.25 px-[15px]
                                    font-bold text-sm hover:underline " onClick={() => setStep(2)}>
                                        <span>←</span>
                                            Back
                                    </button>

                                    <button
                                        className="ml-auto flex gap-2 py-[10px] px-[15px] 
                                        font-bold rounded-[8px] text-sm transition-all duration-300 ease-in-out 
                                        text-amber-50 bg-[#111827] hover:bg-[#5A98E6] "
                                        onClick={() => setStep(4)}
                                    >
                                        NEXT
                                        <span> → </span>
                                    </button>


                                </div>
                                
                            </OnboardingWrap>

                        </>
                    )}         

                    {step === 4 &&  (
                        <>
                            <ProgressBar
                                percentage="100%"
                                progress={100}
                            />
                            <OnboardingWrap>


                                <h1 className="font-extrabold text-sm sm:text-xl mb-2">
                                    You are almost done!
                                </h1>

                                <p className="text-sm text-[#A3A3A3] text-center mb-8">
                                    Set your username so that friends could see you.
                                </p>


                                <div className="flex gap-2 w-full items-center justify-between mb-8">    
                                    <div className="flex flex-col gap-2 w-full">
                                        <label className="font-extrabold text-sm text-[#A3A3A3]" htmlFor="username">
                                            USERNAME
                                        </label>

                                        <input
                                        id="username"
                                        type="text"
                                        value={username}
                                        placeholder="@iloveyoubabygirl"
                                        onChange={(e)=> setUsername(e.target.value)}
                                        className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"   
                                        >
                                        </input>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between w-full"> 
                                    <button   className="flex gap-3 text-[#111827] border rounded border-slate-500 py-2.25 px-[15px]
                                    font-bold text-sm hover:underline " onClick={() => setStep(3)}>
                                        <span>←</span>
                                            Back
                                    </button>

                                    <button
                                        className="ml-auto flex gap-2 py-[10px] px-[15px] 
                                        font-bold rounded-[8px] text-sm transition-all duration-300 ease-in-out 
                                        text-amber-50 bg-[#111827] hover:bg-[#5A98E6] "
                                        onClick={() => {
                    
                                              const profileData = {
                                                                school,
                                                                IDnum,
                                                                firstname,
                                                                lastname,
                                                                year,
                                                                program,
                                                                username,
                                                            };

                                                            localStorage.setItem("studentProfile",                                                         
                                                                JSON.stringify(profileData)
                                                            );
                                                            
                                            navigate("/Home")
                                        }}
                                    >
                                        SUBMIT
                                        <span> </span>
                                    </button>


                                </div>
                                
                            </OnboardingWrap>

                        </>
                    )}     



    </div>
  )
}

export default Onboarding