import { useState, useEffect } from "react";
import OnboardingWrap from "./OnboardingWrap";
import { updateProfile } from "../services/profileService";
import LoadingModal from "./LoadingModal";

function EditProfile({openEdit, closeEdit, profile, refreshProfile }) {

    const [school, setSchool] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [IDnum, setIDnum] = useState("");
    const [year, setYear] = useState("");
    const [program, setProgram] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);


    // useEffect(() => {
    //   if (profile) {
    //     setSchool(profile.school || "");
    //     setFirstname(profile.firstname || "");
    //     setLastname(profile.lastname || "");
    //     setIDnum(profile.IDnum || "");
    //     setYear(profile.year || "");
    //     setProgram(profile.program || "");
    //     setUsername(profile.username || "");
    //   }
    // }, [profile, openEdit]);

    // const handleSave = () => {
    //   const updatedProfile = {
    //     ...profile,

    //         school,
    //         firstname,
    //         lastname,
    //         IDnum,
    //         year,
    //         program,
    //         username,
    //   };

    //   localStorage.setItem(
    //     "studentProfile",
    //     JSON.stringify(updatedProfile)
    //   );

    //   onUpdateProfile(updatedProfile);

    //   closeEdit();
      
    // }

    useEffect(() => {

        if (!profile) return;

        setSchool(profile.school_name || "");
        setFirstname(profile.firstname || "");
        setLastname(profile.lastname || "");
        setIDnum(profile.id_num || "");
        setYear(profile.year || "");
        setProgram(profile.program || "");
        setUsername(profile.username || "");

    }, [profile, openEdit]);

    async function handleSubmit() {

        setLoading(true);

        try {
            await updateProfile({
                firstname,
                lastname,
                username,
                school_name: school,
                id_num: IDnum,
                year,
                program
            });

            await refreshProfile();

            closeEdit();

        } catch (error) {
            console.error(error);
            alert(error.message);

        } finally {
            setLoading(false);
        }


    }
        

    if (!openEdit) return null;

  return (
    <>
        <div
            className="fixed inset-0 bg-black/50 z-70 flex items-center justify-center"
            onClick={closeEdit}
        />

      <OnboardingWrap className="fixed z-[80]  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="font-extrabold  mb-3 text-[18px]"> EDIT PROFILE</div>

          <div className="flex flex-col gap-3">
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
          
            <div className="flex gap-2 w-full items-center justify-between ">
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

          <div className="flex gap-2 w-full items-center justify-between">    
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
          
          <button
                className="ml-auto flex gap-2 py-[10px] px-[15px] 
                font-bold rounded-[8px] text-sm transition-all duration-300 ease-in-out 
                text-amber-50 bg-[#111827] hover:bg-[#5A98E6] "
            onClick={handleSubmit}
            >
                SAVE
                <span> </span>
          </button>
        </div>
        <LoadingModal open={loading} />
      </OnboardingWrap>

    </>
  )
}

export default EditProfile