"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import loginImage from "../../images/loginpageImage.png";
import APiClient from "@/api/ApiClient";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { AxiosError } from "axios";

interface FormData {
  email: string;
  password: string;
}


const RegisterLoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endpoint = isLogin ? "/user/login" : "/user/register";

    try {
      const response = await APiClient.post(endpoint, formData);
      if (isLogin) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        toast.success("Login successful!");
      } else {
        toast.success("Registration successful!");
      }
    } catch (error: unknown) {
      // Narrow down the type to AxiosError
      if (error instanceof AxiosError) {
        // 👇 Safely extract backend error message
        const errorMsg =
          error?.response?.data?.message ||
          error?.response?.data?.error || // sometimes it might be under 'error'
          "Something went wrong. Please try again.";
    
        toast.error(errorMsg);
      } else {
        // Handle other types of errors
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };
  const transitionSettings = {
    type: "spring",
    duration: 1.2, // Slower
    stiffness: 40, // Less springy
    damping: 18, // More bounce control
    ease: "easeInOut",
  };

  const FormSection = (
    <motion.div
      key="form"
      initial={{ x: isLogin ? -200 : 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: isLogin ? 200 : -200, opacity: 0 }}
      transition={transitionSettings}
      className="w-full md:w-1/2 p-8 shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        {isLogin ? "Login" : "Register"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="email" className="text-gray-500">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        />

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border  border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        {isLogin && (
          <div className="text-right text-sm text-green-600 hover:underline cursor-pointer">
            Forgot password?
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-600 transition cursor-pointer"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span
          className="text-green-600 cursor-pointer hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Signup now" : "Login now"}
        </span>
      </div>
    </motion.div>
  );

  const ImageSection = (
    <motion.div
      key="image"
      initial={{ x: isLogin ? 200 : -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: isLogin ? -200 : 200, opacity: 0 }}
      transition={transitionSettings}
      className="hidden md:flex w-1/2 bg-green-200 text-white items-center justify-center p-8"
    >
      <Image
        width={1000}
        height={1000}
        src={loginImage}
        alt="loginregImage"
        className="w-full h-full object fit"
      />
    </motion.div>
  );

  return (
    <div className="mt-20 flex items-center justify-center p-4">
      <div className="flex w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-lg flex-col md:flex-row relative">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <>
              {FormSection}
              {ImageSection}
            </>
          ) : (
            <>
              {ImageSection}
              {FormSection}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RegisterLoginPage;
