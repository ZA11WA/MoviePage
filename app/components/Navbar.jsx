'use client'
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY) {
      // Scrolling down - hide navbar
      setShowNavbar(false);
    } else {
      // Scrolling up - show navbar
      setShowNavbar(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <div className="mb-16">
    <nav className={`fixed  top-0 left-0 right-0 z-50 transition-transform duration-300 ${
      showNavbar ? "transform translate-y-0" : "transform -translate-y-full"
    } bg-black rounded-b-md shadow-md mb-10 flex items-center justify-between py-3 px-4`}
  >
      <div className="flex-shrink-0"> {/* Prevent the home icon from shrinking */}
        <Link href="/" className="text-lg md:text-xl font-semibold hover:text-red-400">
          <AiOutlineHome size={24} />
        </Link>
      </div>

      <div className="flex-1 flex justify-center"> {/* Center the links */}
        <div className="space-x-6 flex flex-wrap justify-center"> {/* Flex wrap for smaller screens */}
          <Link href="/movie" className="text-sm md:text-lg font-semibold hover:text-red-400"> {/* Responsive text size */}
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
    </nav>
    </div>
  );
};

export default Navbar;
