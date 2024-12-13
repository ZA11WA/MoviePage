'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebaseConfig"; // Firebase Auth
import { TbMovie } from "react-icons/tb";
import Link from "next/link";

const SidebarComponent = () => {
  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Stan na zapytanie wyszukiwania
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
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
    }
  };

  return (
    <div
      className={`${expanded ? "w-64" : "w-20"} bg-black border-r-2 text-white transition-all duration-300 h-full p-4 fixed top-0 left-0 z-50`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <TbMovie size={24} />
            {expanded && <span className="ml-2 text-xl font-semibold">Movies App</span>}
          </div>
          <button className="text-2xl" onClick={() => setExpanded(!expanded)}>
            {expanded ? "❮" : "❯"}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex flex-col space-y-4 flex-grow">
          <Link
            href="/"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
          >
            <AiOutlineHome />
            {expanded && <span>Home</span>}
          </Link>
          <Link
            href="/movie"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
          >
            <AiOutlineHome />
            {expanded && <span>Movies</span>}
          </Link>
          <Link
            href="/tv"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
          >
            <AiOutlineHome />
            {expanded && <span>TV Series</span>}
          </Link>
          <Link
            href="/topMovies"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
          >
            <AiOutlineHome />
            {expanded && <span>Top Movies</span>}
          </Link>
          {user && (
            <Link
              href="/library"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
            >
              <AiOutlineHome />
              {expanded && <span>Component Library</span>}
            </Link>
          )}
        </div>

        {/* Search Field */}
        <div className="mt-4 p-2">
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search movies or TV shows..."
              className="p-2 bg-gray-800 text-white rounded-l-md w-full"
            />
            <button type="submit" className="p-2 bg-blue-600 rounded-r-md text-white">
              Search
            </button>
          </form>
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
              <button
                onClick={handleSignOut}
                className="text-white hover:text-red-400 ml-2"
              >
                <FaSignOutAlt size={24} />
              </button>
            </>
          ) : (
            <Link href="/login" className="text-white hover:text-red-400">
              <FaSignInAlt size={24} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
