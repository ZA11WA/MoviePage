'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { FaTv, FaSignOutAlt, FaSignInAlt, FaRegHeart } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { MdMovieCreation, MdMovieFilter } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebaseConfig"; // Firebase Auth
import { TbMovie } from "react-icons/tb";
import Link from "next/link";

const SidebarComponent = ({ isOpen, toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
      toggleSidebar(); // Hide the sidebar after signing out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/search/${searchQuery}`);
      toggleSidebar(); // Hide the sidebar after search
    }
  };

  return (
    <>
      {/* Overlay that darkens the rest of the screen */}
      {isOpen && (
        <div
          onClick={() => {
            toggleSidebar(); // Hide the sidebar when clicking the overlay
          }}
          className="fixed inset-0 bg-gray-500 opacity-50 z-40 transition-opacity duration-500"
        />
      )}

      <div
        className={`${
          isOpen ? "w-64 left-0" : "w-20 left-[-100%]"
        } bg-black border-r-2 text-white transition-all duration-500 ease-in-out h-full p-4 fixed top-0 z-50`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <TbMovie size={24} />
              {isOpen && <span className="ml-2 text-xl font-semibold">Movies App</span>}
            </div>
          </div>

          {/* Search Field */}
          <div className="mt-4 p-1">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search"
                className="p-2 bg-gray-800 text-white rounded-l-md w-full"
              />
              <button type="submit" className="p-2 bg-blue-600 rounded-r-md text-white">
                Search
              </button>
            </form>
          </div>

          {/* Sidebar Navigation */}
          <div className="flex flex-col space-y-4 flex-grow">
            <Link
              href="/"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              onClick={toggleSidebar} // Hide sidebar when clicking a link
            >
              <FiHome />
              {isOpen && <span>Home</span>}
            </Link>
            <Link
              href="/recommend"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              onClick={toggleSidebar} // Hide sidebar when clicking a link
            >
              <FiHome />
              {isOpen && <span>Recommend</span>}
            </Link>
            <Link
              href="/movie"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              onClick={toggleSidebar} // Hide sidebar when clicking a link
            >
              <MdMovieCreation />
              {isOpen && <span>Movies</span>}
            </Link>
            <Link
              href="/tv"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              onClick={toggleSidebar} // Hide sidebar when clicking a link
            >
              <FaTv />
              {isOpen && <span>TV Series</span>}
            </Link>
            <Link
              href="/topMovies"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              onClick={toggleSidebar} // Hide sidebar when clicking a link
            >
              <MdMovieFilter />

              {isOpen && <span>Top Movies</span>}
            </Link>
            {user && (
              <Link
                href="/library"
                className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
                onClick={toggleSidebar} // Hide sidebar when clicking a link
              >
                <FaRegHeart />
                {isOpen && <span>Component Library</span>}
              </Link>
              
            )}
            
          </div>
          

          {/* User Login/Logout Section */}
          <div className="mt-auto flex items-center">
            {user ? (
              <>
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <button onClick={handleSignOut} className="text-white hover:text-red-400 ml-2">
                  <FaSignOutAlt size={24} />
                </button>
                {isOpen && <span className="ml-2">Log Out</span>}
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 text-white hover:text-red-400"
                onClick={toggleSidebar} // Hide sidebar when clicking login
              >
                <FaSignInAlt size={24} />
                {isOpen && <span className="ml-2">Log In</span>}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarComponent;
