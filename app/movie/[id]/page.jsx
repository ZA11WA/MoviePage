'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "../../lib/firebaseConfig"; // Ścieżka względna do firebaseConfig.js
import { addToLibrary } from "../../lib/firestore"; // Funkcja do dodawania do biblioteki

export default function MovieDetail({ params }) {
  const { id } = params; // Dynamiczny parametr z URL
  const imagePath = "https://image.tmdb.org/t/p/original";
  
  const [movie, setMovie] = useState(null); // Stan dla danych filmu
  const [isInLibrary, setIsInLibrary] = useState(false); // Stan dla informacji, czy film jest w bibliotece

  // Funkcja do pobierania danych filmu
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const res = await data.json();
      setMovie(res); // Ustawiamy dane filmu w stanie
    };

    fetchMovieDetails();
  }, [id]); // Fetchujemy dane tylko wtedy, gdy zmienia się id

  // Funkcja do dodawania filmu do biblioteki
  const handleAddToLibrary = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Musisz być zalogowany, aby dodać film do biblioteki.");
      return;
    }

    const movieData = {
      id: movie.id,
      title: movie.title,
      image: movie.backdrop_path,
      overview: movie.overview,
      release_date: movie.release_date,
      runtime: movie.runtime,
      vote_average: movie.vote_average,
    };

    await addToLibrary(user.uid, movieData); // Dodajemy film do biblioteki użytkownika
    setIsInLibrary(true);
  };

  if (!movie) {
    return <div>Loading...</div>; // Ewentualnie możesz dodać loader podczas ładowania danych
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-5xl font-bold mb-2">{movie.title}</h2>
      <h3 className="text-lg text-gray-600 mb-4">{movie.release_date}</h3>
      
      <div className="flex items-center mb-4">
        <span className="text-xl font-semibold">Runtime: {movie.runtime} minutes</span>
        <span className="ml-4 text-xl font-semibold">Rating: {movie.vote_average.toFixed(1)}</span>
        <span className="ml-2 text-sm text-gray-500">({movie.vote_count} votes)</span>
      </div>

      <Image
        className="rounded-lg shadow-lg my-8 w-full"
        src={imagePath + movie.backdrop_path}
        width={1000}
        height={500}
        priority
        alt={movie.title}
      />

      <h4 className="text-2xl font-semibold mb-2">Overview</h4>
      <p className="text-gray-400 leading-relaxed">{movie.overview}</p>

      <div className="mt-6">
        <button
          onClick={handleAddToLibrary}
          disabled={isInLibrary}
          className={`${
            isInLibrary ? "bg-gray-500" : "bg-red-500"
          } text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300`}
        >
          {isInLibrary ? "Dodano do biblioteki" : "Dodaj do biblioteki"}
        </button>
      </div>

      <div className="mt-6">
        <Link href="/movie">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
            Back to Movies
          </button>
        </Link>
      </div>
    </div>
  );
}
