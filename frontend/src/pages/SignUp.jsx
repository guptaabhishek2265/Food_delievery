import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

export default function SignUp() {
  // Existing state for the form
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  // New state to hold Google user info temporarily
  const [googleUser, setGoogleUser] = useState(null);
  
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const dispatch = useDispatch();

  // --- This function handles the standard email/password sign-up ---
  const handleSignUp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { fullName, email, mobile, password, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  // --- STEP 1: This function now ONLY handles the Google Popup ---
const handleGoogleAuth = async () => {
  if (!mobile) {
    return alert("mobile no is required")
  }
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)

  try {
    const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
      fullName: result.user.displayName,
      email: result.user.email,
      role,
      mobile
    }, { withCredentials: true })
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8"
        style={{ border: `1px solid ${borderColor}` }}
      >
        {/* --- Conditionally render the form based on Google login step --- */}
        { !googleUser ? (
          <>
            {/* --- ORIGINAL SIGN-UP FORM --- */}
            <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
              Vingo
            </h1>
            <p className="text-gray-600 mb-8">
              Create your account to get started
            </p>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input type="text" placeholder="Enter your full name" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500" style={{ borderColor }} value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input type="email" placeholder="Enter your email" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500" style={{ borderColor }} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {/* Mobile Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Mobile Number</label>
              <input type="tel" placeholder="Enter your mobile number" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500" style={{ borderColor }} value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Enter your password" className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-orange-500" style={{ borderColor }} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-500">
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Role</label>
              <div className="flex gap-2">
                {["user", "owner", "deliveryBoy"].map((r) => (
                  <button key={r} type="button" onClick={() => setRole(r)} className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors" style={role === r ? { backgroundColor: primaryColor, color: "white" } : { borderColor, color: "#333" }}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sign Up Button */}
            <button className="w-full font-semibold py-2 rounded-lg transition duration-200" style={{ backgroundColor: primaryColor, color: "white" }} onClick={handleSignUp}>
              Sign Up
            </button>

            {/* Google Auth Button */}
            <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200" style={{ borderColor }} onClick={handleGoogleAuth}>
              <FcGoogle size={20} />
              <span className="font-medium text-gray-700">Sign up with Google</span>
            </button>

            {/* Already have account */}
            <p className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="font-semibold" style={{ color: primaryColor }}>Login</Link>
            </p>
          </>
        ) : (
          <>
            {/* --- STEP 2: COMPLETE GOOGLE SIGN-UP FORM --- */}
            <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
              Almost There!
            </h1>
            <p className="text-gray-600 mb-8">
              Welcome, {googleUser.displayName}! Please provide your mobile number to complete your registration.
            </p>

            {/* Email (pre-filled and disabled) */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input type="email" className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed" style={{ borderColor }} value={googleUser.email} disabled />
            </div>
            
            {/* Mobile Number (required) */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Mobile Number</label>
              <input type="tel" placeholder="Enter your mobile number" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500" style={{ borderColor }} value={mobile} onChange={(e) => setMobile(e.target.value)} autoFocus/>
            </div>

            {/* Role Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Your Role</label>
              <div className="flex gap-2">
                {["user", "owner", "deliveryBoy"].map((r) => (
                  <button key={r} type="button" onClick={() => setRole(r)} className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors" style={role === r ? { backgroundColor: primaryColor, color: "white" } : { borderColor, color: "#333" }}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Complete Sign Up Button */}
            <button className="w-full font-semibold py-2 rounded-lg transition duration-200" style={{ backgroundColor: primaryColor, color: "white" }} onClick={handleGoogleSignUpSubmit}>
              Complete Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}