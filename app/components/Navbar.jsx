import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className="mb-10 flex items-center justify-between py-6 px-4">
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
          <Link href="/test" className="text-sm md:text-lg font-semibold hover:text-red-400">
            Test
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
