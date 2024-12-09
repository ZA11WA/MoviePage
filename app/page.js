'use client'
import { Suspense } from 'react';
import MovieCarousel from './components/Carousel';
import TvCarousel from './components/TvCarousel';
import { fetchPopularMovies, fetchPopularTvShows } from './lib/api';
import AuthGuard from './components/AuthGuard';
import { auth } from './lib/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default async function Home() {
  return (
    
      <div className="container mx-auto px-4 py-8 space-y-12 bg-black text-white">
        {/* Header with Logout Button */}
        <header className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Log in to add movies to your library!</h1>
          
        </header>

        <section>
          <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>
          <Suspense fallback={<CarouselSkeleton />}>
            <MovieCarouselWrapper />
          </Suspense>
        </section>
        
        <section>
          <h1 className="text-3xl font-bold mb-6">Popular TV Shows</h1>
          <Suspense fallback={<CarouselSkeleton />}>
            <TvCarouselWrapper />
          </Suspense>
        </section>
      </div>
    
  );
}

async function MovieCarouselWrapper() {
  const movies = await fetchPopularMovies();
  return <MovieCarousel movies={movies.slice(0, 10)} />;
}

async function TvCarouselWrapper() {
  const tvShows = await fetchPopularTvShows();
  return <TvCarousel tvShows={tvShows.slice(0, 10)} />;
}

function CarouselSkeleton() {
  return (
    <div className="flex space-x-4 overflow-hidden">
      {[...Array(5)].map((_, index) => (
        <div 
          key={index} 
          className="w-[250px] h-[375px] bg-gray-800 animate-pulse rounded-lg"
        ></div>
      ))}
    </div>
  );
}


