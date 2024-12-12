'use client';
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { TbMovie } from "react-icons/tb";

const SidebarComponent = () => {
  const [expanded, setExpanded] = useState(false); // Default to false to hide sidebar
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Sprawdza status użytkownika
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser); // Słuchacz stanu autentykacji
    return () => unsubscribe(); // Usuwa subskrypcję po unmount
  }, []);

  // Funkcja do wylogowania użytkownika
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Przekierowuje po wylogowaniu
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div
      className={`${
        expanded ? "w-64" : "w-20"
      } bg-black border-r-2 text-white transition-all duration-300 h-full p-4 fixed top-0 left-0 z-50`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <TbMovie size={24} />
            {expanded && (
              <span className="ml-2 text-xl font-semibold">Movies App</span>
            )}
          </div>
          <button className="text-2xl" onClick={() => setExpanded(!expanded)}>
            {expanded ? "❮" : "❯"}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex flex-col space-y-4 flex-grow">
          <div className="space-y-2">
            <Link
              href="/"
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
            >
              <AiOutlineHome />
              {expanded && <span>Home</span>}
            </Link>
          </div>

          <div className="space-y-2">
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
          </div>
        </div>

        {/* Ikona użytkownika i przycisk logowania/wylogowania */}
        <div className="mt-auto flex items-center">
          {user ? (
            <>
              
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
