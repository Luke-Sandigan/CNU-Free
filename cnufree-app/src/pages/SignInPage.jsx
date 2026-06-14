import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import CardWrapper from '../components/cardWrapper';
import GoogleIcon from '../components/GoogleIcon'
import AppleIcon from '../components/AppleIcon'
import BackButton from '../components/BackComponent';
// import { motion } from "framer-motion";
// import { supabase } from '../utils/supabase'

function SignInPage() {
    // const navigate = useNavigate();
    const [email, setEmail] = useState("");

//     async function handleContinue() {
//     //     const { error } = await supabase.auth.signInWithOtp({
//     //         email,
//     //     });

//     //     if (error) {
//     //         alert(error.message);
//     //         return;
//     //     }

//     //     navigate("/VerificationPage", {
//     //         state: { email }
//     //     });
//     // }

//     // async function handleGoogleLogin() {
//     //     const { error } = await supabase.auth.signInWithOAuth({
//     //         provider: "google",
//     //         options: {
//     //             redirectTo: "http://localhost:5173/Onborading",
//     //         },
//     //     });

//     //     if (error) {
//     //         alert(error.message);
//     //     }
//     }

  return (

    <CardWrapper>
        <BackButton to="/"/>
        <h1 className="font-bold text-[21px] sm:text-[23px] text-white pl-2 bg-[#111827]"> Ready to Organize Your Student Life? </h1>
        <p className=" text-md sm:text-[18px] mt-2 mb-1" > Create an account or sign in </p>
        <p className=" text-[12px] sm:text-[12px] text-gray-500 mb-6 leading-relaxed"> By clicking any of the “Continue” options below, you agree to HireStreet’s <a> Terms of Service  </a>
        and acknowledge our <a> Privacy Policy  </a>and <a> Cookie Policy </a>. You may receive updates and career-related notifications
         from CNU-Free and can opt out at any time through the unsubscribe link in our messages.</p>
    

                <button className="hover:border-[#FCE034] hover:scale-105 hover:shadow-[0_0_30px_rgba(252,224,52,0.9)] flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg py-3 px-4 font-semibold text-gray-800 hover:bg-[#FDFB8F] transition-all duration-300 ease-in-out mb-2">
                    <GoogleIcon />
                    Continue with Google
                </button>
                    

        <button className="hover:bg-[#FDFB8F] hover:border-[#FCE034] hover:scale-105 hover:shadow-[0_0_30px_rgba(252,224,52,0.9)] flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg py-3 px-4 font-semibold text-gray-800 transition-all duration-300 ease-in-out mb-6">
            <AppleIcon />
            Continue with Apple
        </button>

        <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className=" text-xs sm:text-sm text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
        </div>

        <p className="block text-[10px] text-gray-700 mb-2" > All fields marked with * are required. </p>
        <label className="block text-[10px] sm:text-sm font-semibold mb-1">
            Enter a valid Email Address*
        </label>

        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            className="w-full border text-sm border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#111827] focus:border-[#111827] mb-2 transition"
        />

        <button
            
            className="w-full bg-[#111827] text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] hover:scale-105 border-2 font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out mb-6 "
        >
            Continue
        </button>

      

    </CardWrapper>

  );
}

export default SignInPage