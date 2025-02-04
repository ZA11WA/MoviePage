'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Movie from "../../Movie"; // Załóżmy, że masz komponent Movie

const SearchPage = () => {
  const { query } = useParams();
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [sortOrder, setSortOrder] = useState("default");

  // Fetch movies and TV shows based on query
  useEffect(() => {
    if (query) {
      const fetchMoviesAndTVShows = async () => {
        setLoading(true);
        try {
          const movieResponse = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
          );
          const movieData = await movieResponse.json();
          setMovies(movieData.results);

          const tvResponse = await fetch(
            `https://api.themoviedb.org/3/search/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
          );
          const tvData = await tvResponse.json();
          setTvShows(tvData.results);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        setLoading(false);
      };

      fetchMoviesAndTVShows();
    }
  }, [query]);

  // Obsługa zmiany pola wyszukiwania
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Obsługa zatwierdzenia wyszukiwania
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/search/${searchQuery}`);
    }
  };

  // Funkcja grupowania dokładnych i podobnych wyników
  const groupResults = (data, query) => {
    const exactMatches = [];
    const similarTitles = [];
    const lowerCaseQuery = query.toLowerCase();

    data.forEach((item) => {
      const title = item.title || item.name; // Filmy mają `title`, seriale mają `name`
      if (title.toLowerCase() === lowerCaseQuery) {
        exactMatches.push(item);
      } else if (title.toLowerCase().includes(lowerCaseQuery)) {
        similarTitles.push(item);
      }
    });

    return { exactMatches, similarTitles };
  };

  // Obsługa sortowania wyników
  const sortResults = (data) => {
    if (sortOrder === "highest") {
      return [...data].sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortOrder === "lowest") {
      return [...data].sort((a, b) => a.vote_average - b.vote_average);
    }
    return data;
  };

  return (
    <div className="flex flex-col items-center">
      {/* Pole wyszukiwania */}
      <div className="w-full p-4 bg-black">
        <form onSubmit={handleSearchSubmit} className="flex items-center justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search movies or TV shows..."
            className="p-2 w-3/4 sm:w-1/2 bg-gray-700 text-white rounded-l-md"
          />
          <button type="submit" className="p-2 bg-blue-600 text-white rounded-r-md">
            Search
          </button>
        </form>
      </div>

      <h1 className="text-2xl font-semibold my-4">Search Results for: {query}</h1>

      {/* Sortowanie */}
      <div className="w-full flex justify-end px-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 bg-gray-700 text-white rounded-md"
        >
          <option value="default">Sort by</option>
          <option value="highest">Rating: High to Low</option>
          <option value="lowest">Rating: Low to High</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full">
          {/* Movies */}
          <div className="mb-8  text-center">
            <h2 className="text-xl font-semibold mb-4">Movies</h2>
            {(() => {
              const { exactMatches, similarTitles } = groupResults(movies, query);

              return (
                <>
                  {/* Dokładne dopasowania */}
                  {exactMatches.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-2">Exact Matches</h3>
                      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
                        {sortResults(exactMatches).map((movie) => (
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
                    </div>
                  )}

                  {/* Podobne tytuły */}
                  {similarTitles.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-center">Similar Titles</h3>
                      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
                        {sortResults(similarTitles).map((movie) => (
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
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          {/* TV Shows */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">TV Shows</h2>
            {(() => {
              const { exactMatches, similarTitles } = groupResults(tvShows, query);

              return (
                <>
                  {/* Dokładne dopasowania */}
                  {exactMatches.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-2 text-center">Exact Matches</h3>
                      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
                        {sortResults(exactMatches).map((tv) => (
                          <Movie
                            key={tv.id}
                            id={tv.id}
                            title={tv.name}
                            poster_path={tv.poster_path}
                            release_date={tv.first_air_date}
                            vote_average={tv.vote_average}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Podobne tytuły */}
                  {similarTitles.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-center">Similar Titles</h3>
                      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
                        {sortResults(similarTitles).map((tv) => (
                          <Movie
                            key={tv.id}
                            id={tv.id}
                            title={tv.name}
                            poster_path={tv.poster_path}
                            release_date={tv.first_air_date}
                            vote_average={tv.vote_average}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
