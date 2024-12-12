'use client';
import { useState, useEffect, useCallback } from 'react';
import Tv from '../Tv'; // Zakładam, że komponent Tv jest w folderze tv

const Tvs = () => {
  const [tvs, setTvs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch TV shows function
  const fetchTvs = async (page) => {
    setLoading(true);
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`,
      { next: { revalidate: 60 } }
    );
    const res = await data.json();
    setTvs((prevTvs) => [...prevTvs, ...res.results]);
    setLoading(false);
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchTvs(page);
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
        {tvs.map((tv) => (
          <Tv
            key={tv.id}
            id={tv.id}
            title={tv.name}
            poster_path={tv.poster_path}
            release_date={tv.first_air_date}
            vote_average={tv.vote_average}
          />
        ))}
      </div>
      {loading && <div className="mt-4">Loading...</div>}
    </div>
  );
};

export default Tvs;
