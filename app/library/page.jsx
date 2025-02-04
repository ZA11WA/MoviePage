'use client'
import { useEffect, useState } from "react";
import { auth } from "../lib/firebaseConfig"; // Firebase Auth
import { db } from "../lib/firebaseConfig"; // Firebase Firestore instance
import { collection, getDocs } from "firebase/firestore"; // Firestore functions
import Image from "next/image";
import Link from "next/link";

export default function Library() {
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibrary = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userLibraryRef = collection(db, "users", user.uid, "library");
          const snapshot = await getDocs(userLibraryRef);
          const movies = snapshot.docs.map(doc => doc.data());
          setLibrary(movies);
        } catch (error) {
          console.error("Error fetching library:", error);
        }
      }
      setLoading(false);
    };

    fetchLibrary();
  }, []);

  // Function to determine the movie rating color
  const getRatingColor = (rating) => {
    if (rating >= 8.5) return "bg-green-600";
    if (rating >= 8) return "bg-green-300";
    if (rating >= 7) return "bg-orange-300";
    if (rating >= 6) return "bg-orange-500";
    if (rating >= 5) return "bg-red-300";
    return "bg-red-500";
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : library.length === 0 ? (
        <p>Your library is empty!</p>
      ) : (
        <div className="flex flex-col items-center">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mx-auto">
          {library.map((movie) => (
            
            <div key={movie.id} className="relative inline-block">
              <Link href={`/movie/${movie.id}`}>
                <div className="relative inline-block">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movie.image}`}
                    width={800}
                    height={800}
                    alt={movie.title}
                    className="block rounded-md"
                  />
                  {/* Rating Badge */}
                  <div
                    className={`absolute bottom-0 right-0 flex items-center justify-center min-h-9 min-w-9 rounded-full ${getRatingColor(movie.vote_average)}`}
                    >
                    <h2 className="flex items-center justify-center h-7 w-7 rounded-full bg-black text-white">
                      {movie.vote_average.toFixed(1)}
                    </h2>
                  </div>
                </div>
              </Link>
              <h3 className=" ">{movie.title}</h3>
              
              <p className="">{movie.release_date}</p>
            </div>
          ))}
        </div>
          </div>
      )}
    </>
  );
}
