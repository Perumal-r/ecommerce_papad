// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import loginImage from "../../images/loginpageImage.png";
// import APiClient from "@/api/ApiClient";
// import toast from "react-hot-toast";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { AxiosError } from "axios";
// import { useRouter } from "next/navigation";

// interface FormData {
//   email: string;
//   password: string;
// }

// const RegisterLoginPage: React.FC = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     email: "",
//     password: "",
//   });
//   const [showOtpScreen, setShowOtpScreen] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();

//   // Update form fields
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle login or register submit
// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   setIsLoading(true);

//   try {
//     if (isLogin) {
//       // Login flow remains the same
//       const response = await APiClient.post("/user/login", formData);
//       const token = response.data.token;
//       sessionStorage.setItem("token", token);
//       sessionStorage.setItem("user", response.data.user.id);
//       toast.success("Login successful!");
//       router.push("/");
//     } else {
//       // Register flow - modified
//       const res = await APiClient.post("/user/send-otp", formData);
//       sessionStorage.setItem("registerUser", res.data.userId)
//       // More flexible success check
//       if (res.status >= 200 && res.status < 300) {

//         toast.success("OTP sent to your email!");

//         // Store the user ID if it's in the response
//         if (res.data.user?.id) {
//           sessionStorage.setItem("user", res.data.user.id);
//         }
//         setShowOtpScreen(true);
//       } else {
//         toast.error("Failed to send OTP. Please try again.");
//       }
//     }
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       const errorMsg = error.response?.data?.message ||
//                       error.response?.data?.error ||
//                       "Something went wrong.";
//       toast.error(errorMsg);
//     } else {
//       toast.error("An unexpected error occurred.");
//     }
//   } finally {
//     setIsLoading(false);
//   }
// };

//   // Handle OTP verification submit
//   const handleOtpSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       // Verify OTP - marks user as verified
//       await APiClient.post("/user/verify-otp", {
//         userId: sessionStorage.getItem("registerUser"),
//         otp,
//       });

//       toast.success("OTP verified! Registration complete.");

//       // After verification, auto-login user
//       const loginResponse = await APiClient.post("/user/login", formData);
//       const token = loginResponse.data.token;
//       sessionStorage.setItem("token", token);
//       sessionStorage.setItem("user", loginResponse.data.user.id);
//       router.push("/");
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         const errorMsg =
//           error.response?.data?.message ||
//           error.response?.data?.error ||
//           "Verification failed";
//         toast.error(errorMsg);
//       } else {
//         toast.error("Unexpected error during verification");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const transitionSettings = {
//     type: "spring",
//     duration: 0.5,
//     stiffness: 100,
//     damping: 15,
//   };

//   // Login/Register form UI
//   const FormSection = (
//     <motion.div
//       key="form"
//       initial={{ x: isLogin ? -100 : 100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       exit={{ x: isLogin ? 100 : -100, opacity: 0 }}
//       transition={transitionSettings}
//       className="w-full md:w-1/2 p-8 shadow-lg"
//     >
//       <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//         {isLogin ? "Login" : "Register"}
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="email" className="block text-gray-500 mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="password" className="block text-gray-500 mb-1">
//             Password
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
//               required
//               minLength={6}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3 text-gray-500"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>
//         </div>

//         {isLogin && (
//           <div className="text-right">
//             <button
//               type="button"
//               className="text-sm text-green-600 hover:underline"
//             >
//               Forgot password?
//             </button>
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`w-full bg-green-700 text-white py-2 rounded hover:bg-green-600 transition ${
//             isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
//           }`}
//         >
//           {isLoading ? "Processing..." : isLogin ? "Login" : "Register"}
//         </button>
//       </form>

//       <div className="mt-6 text-center text-sm text-gray-600">
//         {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//         <button
//           type="button"
//           className="text-green-600 hover:underline"
//           onClick={() => {
//             setIsLogin(!isLogin);
//             setShowOtpScreen(false);
//             setOtp("");
//             setFormData({ email: "", password: "" });
//           }}
//         >
//           {isLogin ? "Sign up now" : "Login now"}
//         </button>
//       </div>
//     </motion.div>
//   );

//   // OTP verification UI
//   const OtpSection = (
//     <motion.div
//       key="otp"
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       className="w-full md:w-1/2 p-8 shadow-lg"
//     >
//       <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//         Verify Your Email
//       </h2>

//       <form onSubmit={handleOtpSubmit} className="space-y-4">
//         <p className="text-gray-600 mb-4">
//           We&apos;ve sent a 6-digit OTP to <strong>{formData.email}</strong>
//       </p>

//         <div>
//           <label htmlFor="otp" className="block text-gray-500 mb-1">
//             Enter OTP
//           </label>
//           <input
//             type="text"
//             inputMode="numeric"
//             pattern="[0-9]*"
//             maxLength={6}
//             value={otp}
//             onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//             placeholder="123456"
//             className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading || otp.length !== 6}
//           className={`w-full bg-green-700 text-white py-2 rounded hover:bg-green-600 transition ${
//             isLoading || otp.length !== 6
//               ? "opacity-70 cursor-not-allowed"
//               : "cursor-pointer"
//           }`}
//         >
//           {isLoading ? "Verifying..." : "Verify & Register"}
//         </button>

//         <div className="text-center text-sm text-gray-500 mt-4">
//           Didn&apos;t receive OTP?{" "}
//           <button
//             type="button"
//             className="text-green-600 hover:underline"
//             onClick={async () => {
//               try {
//                 await APiClient.post("/user/register", {
//                   email: formData.email,
//                   password: formData.password,
//                 });
//                 toast.success("OTP resent successfully!");
//               } catch {
//                 toast.error("Failed to resend OTP");
//               }
//             }}
//           >
//             Resend OTP
//           </button>
//         </div>
//       </form>
//     </motion.div>
//   );

//   // Image on the side
//   const ImageSection = (
//     <motion.div
//       key="image"
//       initial={{ x: isLogin ? 100 : -100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       exit={{ x: isLogin ? -100 : 100, opacity: 0 }}
//       transition={transitionSettings}
//       className="hidden md:flex w-1/2 bg-green-200 text-white items-center justify-center p-8"
//     >
//       <Image
//         width={500}
//         height={500}
//         src={loginImage}
//         alt="Illustration"
//         className="w-full h-auto object-cover"
//       />
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
//       <div className="flex w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-lg flex-col md:flex-row">
//         <AnimatePresence mode="wait">
//           {showOtpScreen ? (
//             <>
//               {OtpSection}
//               <motion.div
//                 key="otp-image"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="hidden md:flex w-1/2 bg-green-200 items-center justify-center p-8"
//               >
//                 <Image
//                   width={500}
//                   height={500}
//                   src={loginImage}
//                   alt="OTP verification"
//                   className="w-full h-auto object-cover"
//                 />
//               </motion.div>
//             </>
//           ) : isLogin ? (
//             <>
//               {FormSection}
//               {ImageSection}
//             </>
//           ) : (
//             <>
//               {ImageSection}
//               {FormSection}
//             </>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default RegisterLoginPage;

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import APiClient from "@/api/ApiClient";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";

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
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const response = await APiClient.post("/user/login", formData);
        const token = response.data.token;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", response.data.user.id);
        toast.success("Login successful!");
        router.push("/");
      } else {
        const res = await APiClient.post("/user/send-otp", formData);
        sessionStorage.setItem("registerUser", res.data.userId);

        if (res.status >= 200 && res.status < 300) {
          toast.success("OTP sent to your email!");
          if (res.data.user?.id) {
            sessionStorage.setItem("user", res.data.user.id);
          }
          setShowOtpScreen(true);
        } else {
          toast.error("Failed to send OTP. Please try again.");
        }
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMsg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Something went wrong.";
        toast.error(errorMsg);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await APiClient.post("/user/verify-otp", {
        userId: sessionStorage.getItem("registerUser"),
        otp,
      });

      toast.success("OTP verified! Registration complete.");

      const loginResponse = await APiClient.post("/user/login", formData);
      const token = loginResponse.data.token;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", loginResponse.data.user.id);
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Verification failed";
        toast.error(errorMsg);
      } else {
        toast.error("Unexpected error during verification");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4" style={{ backgroundColor: "#f0f4f8" }}>
      <div className="bg-white rounded-3xl shadow-2xl flex w-full max-w-lg overflow-hidden">
        {/* Left Illustration */}
        {/* <div className="hidden md:flex flex-1 bg-gray-100 items-center justify-center px-8 py-10 relative">
          <Image
            src={loginImage}
            width={400}
            height={400}
            alt="Login Illustration"
          />
        </div> */}

        {/* Right Form Section */}
        <div className="flex-1 px-8 py-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4 flex">
            Welcome to SPP{" "}
            <span className="ms-3">
              <BsEmojiSmile />
            </span>
          </h2>
          <h2 className="text-lg font-semibold text-green-800 mb-5">
            {isLogin
              ? "Please Sign-in your account and start the adventure"
              : "Please Sign-up first to start the adventure"
              }
          </h2>

          <AnimatePresence mode="wait">
            {!showOtpScreen ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-4">
                  <label className="text-gray-600 text-sm">Email</label>
                  <div className="flex items-center bg-white border rounded-md shadow-sm mt-1 px-4 py-2">
                    <div className="bg-green-600 rounded-full p-1 text-white mr-3">
                      <MdOutlineEmail />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="outline-none w-full text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="text-gray-600 text-sm">Password</label>
                  <div className="flex items-center bg-white border rounded-md shadow-sm mt-1 px-4 py-2">
                    <div className="bg-green-600 rounded-full p-1 text-white mr-3">
                      <RiLockPasswordLine />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="outline-none w-full text-sm"
                      required
                    />
                    <button
                      type="button"
                      className="ml-2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* <div
                  className="text-right text-md text-gray-500 mb-4"
                  style={{ display: isLogin ? "block" : "none" }}
                >
                  <button
                    type="button"
                    className="hover:underline cursor-pointer text-green-700"
                  >
                    Forget password?
                  </button>
                </div> */}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 mt-5 rounded-md cursor-pointer text-white font-bold bg-gradient-to-r from-green-600 to-green-500 hover:opacity-90 transition"
                >
                  {isLoading ? "Processing..." : isLogin ? "LOGIN" : "SIGN UP"}
                </button>

                <p className="text-center mt-4 text-sm">
                  {isLogin
                    ? "DON'T HAVE AN ACCOUNT?"
                    : "ALREADY HAVE AN ACCOUNT?"}{" "}
                  <button
                    type="button"
                    className="text-green-700 font-semibold hover:underline cursor-pointer"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setShowOtpScreen(false);
                      setOtp("");
                      setFormData({ email: "", password: "" });
                    }}
                  >
                    {isLogin ? "CREATE AN ACCOUNT" : "LOGIN"}
                  </button>
                </p>
              </motion.form>
            ) : (
              <motion.form
                key="otp"
                onSubmit={handleOtpSubmit}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-lg text-gray-800 font-medium mb-2">
                  Verify Your Email
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  We&apos;ve sent a 6-digit OTP to{" "}
                  <strong>{formData.email}</strong>
                </p>

                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full p-2 rounded border border-gray-300 mb-4"
                  placeholder="Enter OTP"
                  required
                />

                <button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                 className="w-full py-2 mt-5 rounded-md cursor-pointer text-white font-bold bg-gradient-to-r from-green-600 to-green-500 hover:opacity-90 transition"
                >
                  {isLoading ? "Verifying..." : "Verify & Register"}
                </button>

                <div className="text-sm text-gray-500 mt-4 text-center">
                  Didn&apos;t receive OTP?{" "}
                  <button
                    type="button"
                    className="text-green-700 cursor-pointer font-semibold hover:underline"
                    onClick={async () => {
                      try {
                        await APiClient.post("/user/register", {
                          email: formData.email,
                          password: formData.password,
                        });
                        toast.success("OTP resent successfully!");
                      } catch {
                        toast.error("Failed to resend OTP");
                      }
                    }}
                  >
                    Resend OTP
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RegisterLoginPage;
