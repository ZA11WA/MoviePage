'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MovieCarousel.module.css'; // Import CSS module

/**
 * Movie Carousel Component
 * @param {Object} props - Component props
 * @param {Array} props.movies - List of movies to display
 */
export default function MovieCarousel({ movies = [] }) {
  const carouselRef = useRef(null);

  return (
    <div 
      className={`relative group overflow-hidden ${styles.carouselWrapper}`} // Apply animation class
    >
      <div 
        ref={carouselRef} 
        className={`flex space-x-4 py-4 ${styles.carousel}`}
      >
        {movies.concat(movies).map((movie, index) => ( // Duplicate items for infinite scrolling
          <Link
            key={`${movie.id}-${index}`}
            href={`/movie/${movie.id}`}
            className="flex-shrink-0 w-[250px] h-[375px] transition-transform duration-300 hover:scale-105"
          >
            <div className="relative w-full h-full">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 250px, 375px"
                className="object-cover rounded-lg shadow-lg"
                priority={false}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
