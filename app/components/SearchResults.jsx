'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function SearchResults({ movies }) {
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div className="mt-4">
      <h2 className="text-white mb-4">Search Results</h2>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mx-auto">
        {movies.map((movie) => (
          <div key={movie.id} className="relative inline-block">
            <Link href={`/movie/${movie.id}`}>
              <Image
                src={imagePath + movie.poster_path}
                width={300}
                height={450}
                alt={movie.title}
                className="block rounded-md"
              />
            </Link>
            <h3 className="text-white">{movie.title}</h3>
            <p className="text-white">{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
