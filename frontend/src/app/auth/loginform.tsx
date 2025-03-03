"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Loginf = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const notify = () => {
    toast.success("Otp Sent !", {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:8000/sendotp`, {
        email,
      });
      if (response.status === 204) {
        setError(`First register on vscode extension`);
        setLoading(false);
        return;
      }
      setServerOtp(response.data.otp);
      setIsOtpSent(true);
      setError("");
      notify();
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    if (otp == serverOtp) {
      const response = await axios.post(`http://localhost:8000/auth`, {
        email,
      });
      if (response.status === 200 || response.status === 201) {
        const userId = response.data.result._id;
        localStorage.setItem("userId", userId);
        localStorage.setItem("email", email);
        toast.success("Login Success please wait !", {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        router.replace("/dashboardins");
      }
    } else {
      setError("Invalid OTP. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex  s flex-col items-center gap-6 justify-center min-h-screen w-full">
     
      <h2 className="text-5xl font-bold">Exo Login</h2>
          <p className="text-lg text-gray-600">
          Enter your email below to create your account
          </p>
        {!isOtpSent ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="shadin w-full placeholder-[#71717a] p-2 border mb-2 border-gray-300 rounded-lg bg-gray-50 text-black focus:ring-2 transition-all duration-300 ease-in-out hover:shadow-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className=" w-full  border-[#e4e4e7] bg-black text-white p-2 rounded-lg hover:opacity-85 flex justify-center items-center"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-4 border-indigo-500 border-solid rounded-full animate-spin border-t-transparent"></div>
              ) : (
                "SIGN IN"
              )}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="shadin w-full placeholder-[#71717a] p-2 border mb-2 border-gray-300 rounded-lg bg-gray-50 text-black focus:ring-2 transition-all duration-300 ease-in-out hover:shadow-lg"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className=" w-full  border-[#e4e4e7] bg-black text-white p-2 rounded-lg hover:opacity-85 flex justify-center items-center"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-4 border-indigo-500 border-solid rounded-full animate-spin border-t-transparent"></div>
              ) : (
                "Verify OTP"
              )}
            </button>
          </>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      
      <ToastContainer className="p-16" />
    </div>
  );
};

export default Loginf;
