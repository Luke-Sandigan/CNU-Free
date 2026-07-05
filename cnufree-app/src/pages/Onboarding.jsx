import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingWrap from "../components/OnboardingWrap";
import ProgressBar from "../components/ProgressBar";
import { supabase } from "../utils/supabase";
import LoadingModal from "../components/LoadingModal";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../context/ToastContext";

const stepVariants = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
};

const stepTransition = { duration: 0.35, ease: "easeInOut" };

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { showToast } = useToast();

  const [IDnum, setIDnum] = useState("");
  const [school, setSchool] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [year, setYear] = useState("");
  const [program, setProgram] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!username.trim()) {
      showToast({
        type: "warning",
        message: "Please add a username.",
      });
      return;
    }

    if (username.length < 3) {
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

    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const profile = {
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        username: username.trim(),
        school_name: school.trim(),
        id_num: IDnum.trim(),
        year: Number(year),
        program: program.trim(),
        onboarding_complete: true,
      };

      const { error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", user.id);

      if (error) throw error;
      navigate("/Home");
      showToast({
        type: "success",
        message: "You are all set. You can create your schedule now!",
      });
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

  return (
    <div className="bg-[#111827] w-full h-screen flex flex-col items-center gap-4 overflow-hidden">
      <ProgressBar
        percentage={
          step === 1 ? "25%" : step === 2 ? "50%" : step === 3 ? "75%" : "100%"
        }
        progress={step === 1 ? 25 : step === 2 ? 50 : step === 3 ? 75 : 100}
      />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            className="w-full flex flex-col items-center gap-4"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
          >
            <OnboardingWrap>
              <h1 className="font-extrabold text-sm sm:text-xl mb-2">
                Tell us which school you're currently attending!
              </h1>
              <p className="text-sm text-[#A3A3A3] text-center mb-8">
                This helps personalize your academic profile and identify your
                institution.
              </p>

              <div className="flex gap-2 w-full items-center justify-between mb-8">
                <div className="flex flex-col gap-2 w-full">
                  <label
                    className="font-extrabold text-sm text-[#A3A3A3]"
                    htmlFor="school"
                  >
                    SCHOOL NAME
                  </label>
                  <input
                    id="school"
                    value={school}
                    maxLength={50}
                    placeholder="e.g. ADNU"
                    onChange={(e) => setSchool(e.target.value.trimStart())}
                    className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"
                  />
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
                    value={IDnum}
                    maxLength={20}
                    placeholder="e.g. 202400143"
                    onChange={(e) => setIDnum(e.target.value.trimStart())}
                    className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between w-full">
                <button
                  className="flex gap-3 text-[#111827] border rounded border-slate-500 py-2.25 px-[15px] font-bold text-sm hover:underline"
                  onClick={() => navigate("/")}
                >
                  <span>←</span> Back
                </button>
                <button
                  className="ml-auto flex gap-2 py-[10px] px-[15px] font-bold rounded-[8px] text-sm transition-all duration-300 ease-in-out text-amber-50 bg-[#111827] hover:bg-[#5A98E6]"
                  onClick={() => {
                    if (!school.trim()) {
                      showToast({
                        type: "warning",
                        message: "Please enter your school name.",
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

                    setStep(2);
                  }}
                >
                  NEXT <span>→</span>
                </button>
              </div>
            </OnboardingWrap>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            className="w-full flex flex-col items-center gap-4"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
          >
            <OnboardingWrap>
              <h1 className="font-extrabold text-sm sm:text-xl mb-2">
                What's your name?
              </h1>
              <p className="text-sm text-[#A3A3A3] text-center mb-8">
                We will use this to personalize your profile and identify you
                within our web application.
              </p>

              <div className="flex gap-2 w-full items-center justify-between mb-8">
                <div className="flex flex-col gap-2 w-full">
                  <label
                    className="font-extrabold text-sm text-[#A3A3A3]"
                    htmlFor="firstName"
                  >
                    FIRSTNAME
                  </label>
                  <input
                    id="firstName"
                    value={firstname}
                    maxLength={20}
                    placeholder="e.g. Juan"
                    onChange={(e) => setFirstname(e.target.value.trimStart())}
                    className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"
                  />
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
                    value={lastname}
                    maxLength={20}
                    placeholder="e.g. Dela Cruz"
                    onChange={(e) => setLastname(e.target.value.trimStart())}
                    className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between w-full">
                <button
                  className="flex gap-3 text-[#111827] border rounded border-slate-500 py-2.25 px-[15px] font-bold text-sm hover:underline"
                  onClick={() => setStep(1)}
                >
                  <span>←</span> Back
                </button>
                <button
                  className="ml-auto flex gap-2 py-[10px] px-[15px] font-bold rounded-[8px] text-sm transition-all duration-300 ease-in-out text-amber-50 bg-[#111827] hover:bg-[#5A98E6]"
                  onClick={() => {
                    if (!firstname.trim().trimStart()) {
                      showToast({
                        type: "warning",
                        message: "Please enter your first name.",
                      });
                      return;
                    }

                    if (!lastname.trim().trimStart()) {
                      showToast({
                        type: "warning",
                        message: "Please enter your last name.",
                      });
                      return;
                    }

                    setStep(3);
                  }}
                >
                  NEXT <span>→</span>
                </button>
              </div>
            </OnboardingWrap>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            className="w-full flex flex-col items-center gap-4"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
          >
            <OnboardingWrap>
              <h1 className="font-extrabold text-sm sm:text-xl mb-2">
                What is your current year level and program?
              </h1>
              <p className="text-sm text-[#A3A3A3] text-center mb-8">
                Let us know your current academic standing, such as 1st Year,
                2nd Year, and so on.
              </p>

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
                    type="number"
                    min="1"
                    max="6"
                    value={year}
                    placeholder="number only (e.g. 1, 2, 3, or 4)"
                    onChange={(e) => setYear(e.target.value.trimStart())}
                    className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"
                  />
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
                    className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between w-full">
                <button
                  className="flex gap-3 text-[#111827] border rounded border-slate-500 py-2.25 px-[15px] font-bold text-sm hover:underline"
                  onClick={() => setStep(2)}
                >
                  <span>←</span> Back
                </button>
                <button
                  className="ml-auto flex gap-2 py-[10px] px-[15px] font-bold rounded-[8px] text-sm transition-all duration-300 ease-in-out text-amber-50 bg-[#111827] hover:bg-[#5A98E6]"
                  onClick={() => {
                    if (!year.trim()) {
                      showToast({
                        type: "warning",
                        message: "Please enter your year level.",
                      });
                      return;
                    }

                    const yearNumber = Number(year);

                    if (yearNumber < 1 || yearNumber > 12) {
                      showToast({
                        type: "warning",
                        message: "Year level must be between 1 and 12.",
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

                    setStep(4);
                  }}
                >
                  NEXT <span>→</span>
                </button>
              </div>
            </OnboardingWrap>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            className="w-full flex flex-col items-center gap-4"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
          >
            <OnboardingWrap>
              <h1 className="font-extrabold text-sm sm:text-xl mb-2">
                You are almost done!
              </h1>
              <p className="text-sm text-[#A3A3A3] text-center mb-8">
                Set your username so that friends could see you.
              </p>

              <div className="flex gap-2 w-full items-center justify-between mb-8">
                <div className="flex flex-col gap-2 w-full">
                  <label
                    className="font-extrabold text-sm text-[#A3A3A3]"
                    htmlFor="username"
                  >
                    USERNAME
                  </label>
                  <input
                    id="username"
                    type="text"
                    maxLength={20}
                    value={username}
                    placeholder="juandelacruz"
                    onChange={(e) => setUsername(e.target.value.trimStart())}
                    className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between w-full">
                <button
                  className="flex gap-3 text-[#111827] border rounded border-slate-500 py-2.25 px-[15px] font-bold text-sm hover:underline"
                  onClick={() => setStep(3)}
                >
                  <span>←</span> Back
                </button>
                <button
                  disabled={loading}
                  className="ml-auto flex gap-2 py-[10px] px-[15px] font-bold rounded-[8px] text-sm transition-all duration-300 ease-in-out text-amber-50 bg-[#111827] hover:bg-[#5A98E6]"
                  onClick={handleSubmit}
                >
                  SUBMIT <span></span>
                </button>
              </div>
            </OnboardingWrap>
          </motion.div>
        )}
      </AnimatePresence>

      <LoadingModal open={loading} />
    </div>
  );
}

export default Onboarding;
