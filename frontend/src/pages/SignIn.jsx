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

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const primaryColor = "#0f8b8d";
  const hoverColor = "#0b6f71";
  const borderColor = "#d5ece9";
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  // --- CORRECTED FUNCTION ---
  const handleGoogleAuth = async () => {
    try {
      // Use the 'provider' you imported from firebase.js
      const result = await signInWithPopup(auth, provider);

      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: result.user.email,
        },
        { withCredentials: true }
      );

      // Dispatch the user data to the Redux store
      dispatch(setUserData(data));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className="brand-panel rounded-3xl w-full max-w-md p-8"
        style={{ border: `1px solid ${borderColor}` }}
      >
        {/* Brand Heading */}
        <h1 className="text-4xl font-black mb-2" style={{ color: primaryColor }}>
          Bingo
        </h1>
        <p className="text-[#5f7474] mb-8">
          Welcome back! Please sign in to continue enjoying delicious food
          deliveries.
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-2xl px-4 py-3 focus:outline-none focus:border-teal-600"
            style={{ borderColor: borderColor }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border rounded-2xl px-4 py-3 pr-10 focus:outline-none focus:border-teal-600"
              style={{ borderColor: borderColor }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-[#6b7f7f]"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right mb-4">
          <Link
            to="/forgot-password"
            style={{ color: primaryColor }}
            className="text-sm font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Sign In Button */}
        <button
          className="w-full font-semibold py-3 rounded-2xl transition duration-200"
          style={{ backgroundColor: primaryColor, color: "white" }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = hoverColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = primaryColor)
          }
          onClick={handleSignIn}
        >
          Sign In
        </button>

        {/* Google Auth */}
        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-2xl px-4 py-3 transition duration-200 hover:bg-[#f4fbfa]"
          style={{ borderColor: borderColor }}
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={20} />
          <span className="font-medium text-gray-700">
            Sign in with Google
          </span>
        </button>

        {/* No account yet */}
        <p className="mt-6 text-center text-[#5f7474]">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold"
            style={{ color: primaryColor }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
