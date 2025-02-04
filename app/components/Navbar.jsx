"use client";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt } from "react-icons/fa"; // Icons for user, login, logout
import { useEffect, useState } from "react";
import { auth } from "../lib/firebaseConfig"; // Your Firebase config
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation"; // For redirection after logout

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-black shadow w-full">
      <div className="flex justify-start py-4    px-4">
        <button
          className="text-gray-500 hover:text-gray-600"
          id="open-sidebar"
          onClick={toggleSidebar} // Call the toggleSidebar function here
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
