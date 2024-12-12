'use client';
import { useState, useEffect, useCallback } from 'react';
import Movie from '../Movie'; // Zakładam, że komponent Movie jest w folderze movie

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch movies function
  const fetchMovies = async (page) => {
    setLoading(true);
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`,
      { next: { revalidate: 60 } }
    );
    const res = await data.json();
    setMovies((prevMovies) => [...prevMovies, ...res.results]);
    setLoading(false);
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex flex-col items-center">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mx-auto">
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
            vote_average={movie.vote_average}
          />
        ))}
      </div>
      {loading && <div className="mt-4">Loading...</div>}
    </div>
  );
};

export default Movies;
