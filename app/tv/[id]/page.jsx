import Image from "next/image";
import Link from "next/link";

export default async function TvDetail({ params }) {
  const { id } = params; // Dynamiczny parametr z URL
  const imagePath = "https://image.tmdb.org/t/p/original";
  
  const data = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-5xl font-bold mb-2">{res.name}</h2> {/* Poprawione z res.title na res.name */}
      <h2 className="text-lg text-gray-600 mb-4">{res.first_air_date}</h2> {/* Użyj first_air_date zamiast release_date */}
      
      
      <div className="flex items-center mb-4">
        <span className="text-xl font-semibold">Runtime: {res.runtime} minutes</span>
        <span className="ml-4 text-xl font-semibold">Rating: {res.vote_average.toFixed(1)}</span>
        <span className="ml-2 text-sm text-gray-500">({res.vote_count} votes)</span>
      </div>
      <Image
        className="rounded-lg shadow-lg my-8 w-full"
        src={imagePath + res.backdrop_path}
        width={1000}
        height={500} // Adjusted for better aspect ratio
        priority
        alt={res.title}
      />


<h4 className="text-2xl font-semibold mb-2">Overview</h4>
      <p className="text-gray-400 leading-relaxed">{res.overview}</p>
      
      {/* Add a button for user interaction, like going back or seeing more movies */}
      <div className="mt-6">
        <Link href="/tv">
        <button 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
          Back to Tv Series
        </button>
        </Link>
      </div>
      </div>
  );
}
