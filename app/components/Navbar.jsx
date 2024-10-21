import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="mb-10 flex items-center justify-center py-6 ">
      <div className="space-x-6"> {/* Dodano odstępy między linkami */}
        <Link href="/movie" className="text-lg font-semibold hover:text-cyan-400">
          Movies
        </Link>
        <Link href="/tv" className="text-lg font-semibold hover:text-cyan-400">
          TV Series
        </Link>
        <Link href="/topMovies" className="text-lg font-semibold hover:text-cyan-400">
          Top Movies
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
