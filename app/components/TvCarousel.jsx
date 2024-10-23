"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function CarouselSliderTv({ tvShows = [] }) {
  const duplicatedTvShows = [...tvShows, ...tvShows];
  const carouselRef = useRef(null);

  useEffect(() => {
    const ul = carouselRef.current;
    if (ul) {
      ul.insertAdjacentHTML("afterend", ul.outerHTML); // Duplicate for infinite effect
      ul.nextSibling.setAttribute("aria-hidden", "true"); // Set aria-hidden to hide the duplicate from screen readers
    }
  }, []);

  return (
    <div className="relative w-full flex">
      {/* Gradient overlay for fading effect on the sides */}
      <div className="absolute top-0 left-0 w-[128px] h-full bg-gradient-to-r from-black z-10"></div>
      <div className="absolute top-0 right-0 w-[128px] h-full bg-gradient-to-l from-black z-10"></div>

      {/* The slide track container */}
      <ul
        ref={carouselRef}
        className="flex items-center justify-start animate-scrollLeft space-x-4"
      >
        {duplicatedTvShows.map((tvShow, index) => (
          <li key={index} className="flex-none w-[250px] h-[250px] p-2">
            <Link href={`/tv/${tvShow.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/original${tvShow.poster_path}`}
                alt={tvShow.name}
                className="w-full h-full cursor-pointer rounded-md"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
