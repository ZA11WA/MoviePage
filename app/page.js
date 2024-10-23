import CarouselSlider from './components/Carousel'; // For movies (scroll to the right)
import CarouselSliderTv from './components/TvCarousel'; // For TV shows (scroll to the left)

export default async function Home() {
  const movieData = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const movieRes = await movieData.json();
  const tvData = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const tvRes = await tvData.json();

  return (
    <div>
      <div className='mb-8'>
        <h1>New Movies</h1>
        <CarouselSlider movies={movieRes.results.slice(0, 7)} /> {/* Scroll right */}
      </div>
      <div>
        <h1>New Series</h1>
        <CarouselSliderTv tvShows={tvRes.results.slice(0,7)} /> {/* Scroll left */}
      </div>
    </div>
  );
}
