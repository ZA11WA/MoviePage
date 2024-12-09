'use client';
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt } from "react-icons/fa"; // Ikony dla użytkownika, logowania, wylogowywania
import { useEffect, useState } from "react";
import { auth } from "../lib/firebaseConfig"; // Twoja konfiguracja Firebase
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation"; // Aby przekierować po wylogowaniu

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Obsługuje przewijanie strony
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }

    setLastScrollY(currentScrollY);
  };

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="mb-16">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${showNavbar ? "transform translate-y-0" : "transform -translate-y-full"} bg-black rounded-b-md shadow-md mb-10 flex items-center justify-between py-3 px-4`}>
        <div className="flex-shrink-0">
          <Link href="/" className="text-lg md:text-xl font-semibold hover:text-red-400">
            <AiOutlineHome size={24} />
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="space-x-6 flex flex-wrap justify-center">
            <Link href="/movie" className="text-sm md:text-lg font-semibold hover:text-red-400">
              Movies
            </Link>
            <Link href="/tv" className="text-sm md:text-lg font-semibold hover:text-red-400">
              TV Series
            </Link>
            <Link href="/topMovies" className="text-sm md:text-lg font-semibold hover:text-red-400">
              Top Movies
            </Link>
            <Link href="/about" className="text-sm md:text-lg font-semibold hover:text-red-400">
              About
            </Link>
          </div>
        </div>

        {/* Ikona użytkownika i przycisk logowania/wylogowania */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-white font-semibold">{user.displayName || "User"}</span>
              <button onClick={handleSignOut} className="text-white hover:text-red-400">
                <FaSignOutAlt size={24} />
              </button>
            </>
          ) : (
            <Link href="/login" className="text-white hover:text-red-400">
              <FaSignInAlt size={24} />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
