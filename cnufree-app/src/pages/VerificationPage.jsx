import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/authService";
import CardWrapper from "../components/cardWrapper";
import BackButton from "../components/BackComponent";
import { useToast } from "../context/ToastContext";
import { useEffect } from "react";
import { useRef } from "react";
import { sendOtp } from "../services/authService";

function VerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const inputs = useRef([]);

  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const email = location.state?.email || sessionStorage.getItem("otp_email");

  useEffect(() => {
    if (!email) {
      navigate("/SignInPage");
    }
  }, [email, navigate]);

  async function handleSubmit() {
    if (!otp.trim()) {
      showToast({
        type: "error",
        message: "Please enter the verification code.",
      });

      return;
    }

    try {
      setLoading(true);

      await verifyOtp(email, otp.join(""));

      sessionStorage.removeItem("otp_email");

      showToast({
        type: "success",
        message: "Verification successful!",
      });

      navigate("/auth/callback");
    } catch (error) {
      showToast({
        type: "error",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e, index) {
    const value = e.target.value.replace(/\D/g, "");

    if (!value) return;

    const copy = [...otp];

    copy[index] = value;

    setOtp(copy);

    if (index < 5) {
      inputs.current[index + 1].focus();
    }
  }

  function handleBackspace(e, index) {
    if (e.key !== "Backspace") return;

    const copy = [...otp];

    if (copy[index]) {
      copy[index] = "";

      setOtp(copy);

      return;
    }

    if (index > 0) {
      inputs.current[index - 1].focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    const copy = ["", "", "", "", "", ""];

    pasted.split("").forEach((digit, index) => {
      copy[index] = digit;
    });

    setOtp(copy);
  }

  async function handleResend() {
    try {
      await sendOtp(email);

      showToast({
        type: "success",

        message: "Verification code resent.",
      });

      setSeconds(60);
    } catch (error) {
      showToast({
        type: "error",

        message: error.message,
      });
    }
  }

  useEffect(() => {
    if (seconds === 0) return;

    const timer = setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  return (
    <CardWrapper>
      <BackButton to="/SignInPage" />
      <h1 className="text-center font-bold text-[15px] sm:text-[23px] mb-2">
        {" "}
        Enter your code!{" "}
      </h1>
      <p className=" text-[8px] sm:text-[12px] text-gray-500 mb-6 leading-relaxed text-center">
        We sent an <span className="font-bold"> code </span> through your email
      </p>

      <p className="block text-[10px] text-gray-700 mb-2">
        {" "}
        All fields marked with * are required.{" "}
      </p>
      <label className="block text-[10px] sm:text-sm font-semibold mb-6">
        Enter code*
      </label>
      <div className="flex justify-center gap-3 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(element) => (inputs.current[index] = element)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            onPaste={handlePaste}
            className=" w-12 h-14 text-center text-2xl font-bold border rounded-lg focus:ring-2 focus:ring-[#111827] focus:outline-none"
          />
        ))}
      </div>
      <p className="block text-[10px] text-gray-700 mb-2">
        {" "}
        This code will expire in 10 minutes.{" "}
      </p>
      <button
        disabled={loading}
        onClick={handleSubmit}
        className=" w-full bg-[#111824] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mb-6  
                    duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed "
      >
        {loading ? "Verifying..." : "Submit"}
      </button>
      <div className="text-center">
        {seconds > 0 ? (
          <p className="text-sm text-gray-500">Resend code in {seconds}s</p>
        ) : (
          <button onClick={handleResend} className="text-[#111827] font-bold">
            Resend Code
          </button>
        )}
      </div>
    </CardWrapper>
  );
}

export default VerificationPage;
