'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link'; // Import the Link component for navigation

export default function CarouselSlider({ movies = [] }) {
  const duplicatedMovies = [...movies, ...movies];
  const carouselRef = useRef(null);

  useEffect(() => {
    const ul = carouselRef.current;
    if (ul) {
      ul.insertAdjacentHTML('afterend', ul.outerHTML); // Duplicate for infinite effect
      ul.nextSibling.setAttribute('aria-hidden', 'true'); // Set aria-hidden to hide the duplicate from screen readers
    }
  }, []);

  return (
    <div className="relative w-full flex">
      {/* Gradient overlay for fading effect on the sides */}
      <div className="absolute top-0 left-0 w-[128px] h-full bg-gradient-to-r from-black z-10"></div>
      <div className="absolute top-0 right-0 w-[128px] h-full bg-gradient-to-l from-black z-10"></div>

      {/* The slide track container */}
      <ul ref={carouselRef} className="flex items-center justify-start animate-scrollRight space-x-4">
        {duplicatedMovies.map((movie, index) => (
          <li key={index} className="flex-none w-[250px] h-[250px] p-2">
            {/* Wrap the image in a Link to navigate to the movie detail page */}
            <Link href={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full  cursor-pointer" // Ensure cursor indicates clickability
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
