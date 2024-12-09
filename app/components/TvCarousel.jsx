'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './TvCarousel.module.css'; // Import CSS module

/**
 * TV Shows Carousel Component
 * @param {Object} props - Component props
 * @param {Array} props.tvShows - List of TV shows to display
 */
export default function TvCarousel({ tvShows = [] }) {
  const carouselRef = useRef(null);

  return (
    <div 
      className={`relative group overflow-hidden ${styles.carouselWrapper}`} // Apply animation class
    >
      <div 
        ref={carouselRef} 
        className={`flex space-x-4 py-4 ${styles.carousel}`}
      >
        {tvShows.concat(tvShows).map((tvShow, index) => ( // Duplicate items for infinite scrolling
          <Link
            key={`${tvShow.id}-${index}`}
            href={`/tv/${tvShow.id}`}
            className="flex-shrink-0 w-[250px] h-[375px] transition-transform duration-300 hover:scale-105"
          >
            <div className="relative w-full h-full">
              <Image
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={tvShow.name}
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
