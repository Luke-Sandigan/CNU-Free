import { useState, useEffect } from "react";
import OnboardingWrap from "./OnboardingWrap";
import { updateProfile } from "../services/profileService";
import LoadingModal from "./LoadingModal";
import { useToast } from "../context/ToastContext";

function EditProfile({ openEdit, closeEdit, profile, refreshProfile }) {
  const [school, setSchool] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [IDnum, setIDnum] = useState("");
  const [year, setYear] = useState("");
  const [program, setProgram] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

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
    if (!username.trim()) {
      showToast({
        type: "warning",
        message: "Please enter a username.",
      });
      return;
    }

    if (username.trim().length < 3) {
      showToast({
        type: "warning",
        message: "Username must be at least 3 characters.",
      });
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (!usernameRegex.test(username.trim())) {
      showToast({
        type: "warning",
        message: "Username can only contain letters, numbers, and underscores.",
      });
      return;
    }

    if (!firstname.trim()) {
      showToast({
        type: "warning",
        message: "Please enter your first name.",
      });
      return;
    }

    if (!lastname.trim()) {
      showToast({
        type: "warning",
        message: "Please enter your last name.",
      });
      return;
    }

    if (!school.trim()) {
      showToast({
        type: "warning",
        message: "Please enter your school.",
      });
      return;
    }

    if (!IDnum.trim()) {
      showToast({
        type: "warning",
        message: "Please enter your ID number.",
      });
      return;
    }

    if (!program.trim()) {
      showToast({
        type: "warning",
        message: "Please enter your program.",
      });
      return;
    }

    const yearNumber = Number(year);

    if (yearNumber < 1 || yearNumber > 12) {
      showToast({
        type: "warning",
        message: "Year level must be between 1 and 6.",
      });
      return;
    }

    setLoading(true);

    try {
      await updateProfile({
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        username: username.trim(),
        school_name: school.trim(),
        id_num: IDnum.trim(),
        year: Number(year),
        program: program.trim(),
      });

      await refreshProfile();

      showToast({
        type: "success",
        message: "Profile edited successfully!",
      });
      closeEdit();
    } catch (error) {
      console.error(error);
      showToast({
        type: "error",
        message: error.message,
      });
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
            <label
              className="font-extrabold text-sm text-[#A3A3A3]"
              htmlFor="username"
            >
              USERNAME
            </label>

            <input
              id="username"
              maxLength={20}
              type="text"
              value={username}
              placeholder="juandelacruz"
              onChange={(e) => setUsername(e.target.value.trimStart())}
              className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"
            ></input>
          </div>

          <div className="flex gap-2 w-full items-center justify-between ">
            <div className="flex flex-col gap-2 w-full">
              <label
                className="font-extrabold text-sm text-[#A3A3A3]"
                htmlFor="school"
              >
                SCHOOL NAME
              </label>

              <input
                id="school"
                maxLength={50}
                value={school}
                placeholder="e.g. ADNU"
                onChange={(e) => setSchool(e.target.value.trimStart())}
                className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"
              ></input>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label
                className="font-extrabold text-sm text-[#A3A3A3]"
                htmlFor="idnum"
              >
                ID NUMBER
              </label>

              <input
                id="idnum"
                maxLength={20}
                value={IDnum}
                placeholder="e.g. 202400143"
                onChange={(e) => setIDnum(e.target.value.trimStart())}
                className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"
              ></input>
            </div>
          </div>

          <div className="flex gap-2 w-full items-center justify-between">
            <div className="flex flex-col gap-2 w-full">
              <label
                className="font-extrabold text-sm text-[#A3A3A3]"
                htmlFor="firstName"
              >
                FIRSTNAME
              </label>

              <input
                id="firstName"
                maxLength={20}
                value={firstname}
                placeholder="e.g. Juan"
                onChange={(e) => setFirstname(e.target.value.trimStart())}
                className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"
              ></input>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label
                className="font-extrabold text-sm text-[#A3A3A3]"
                htmlFor="lastName"
              >
                LASTNAME
              </label>

              <input
                id="lastName"
                maxLength={20}
                value={lastname}
                placeholder="e.g. Dela Cruz"
                onChange={(e) => setLastname(e.target.value.trimStart())}
                className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"
              ></input>
            </div>
          </div>

          <div className="flex gap-2 w-full items-center justify-between mb-8">
            <div className="flex flex-col gap-2 w-full">
              <label
                className="font-extrabold text-sm text-[#A3A3A3]"
                htmlFor="year"
              >
                YEAR
              </label>

              <input
                id="year"
                min="1"
                max="12"
                type="number"
                value={year}
                placeholder="number only (e.g. 1, 2, 3, or 4)"
                onChange={(e) => setYear(e.target.value.trimStart())}
                className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"
              ></input>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label
                className="font-extrabold text-sm text-[#A3A3A3]"
                htmlFor="program"
              >
                PROGRAM
              </label>

              <input
                id="program"
                maxLength={50}
                value={program}
                placeholder="e.g. BSIT"
                onChange={(e) => setProgram(e.target.value.trimStart())}
                className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"
              ></input>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={closeEdit}
              className=" flex gap-2 py-[10px] px-[15px] rounded-[8px] border font-bold
                 text-sm  hover:bg-[#5A98E6] transition-all duration-300 ease-in-out  "
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="ml-auto flex gap-2 py-[10px] px-[15px] 
                    font-bold rounded-[8px] text-sm transition-all duration-300 ease-in-out 
                    text-amber-50 bg-[#111827] hover:bg-[#5A98E6] "
              onClick={handleSubmit}
            >
            {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
        <LoadingModal open={loading} />
      </OnboardingWrap>
    </>
  );
}

export default EditProfile;
