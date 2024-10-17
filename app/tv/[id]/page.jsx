import Image from "next/image";

export default async function TvDetail({ params }) {
  const { id } = params; // Dynamiczny parametr z URL
  const imagePath = "https://image.tmdb.org/t/p/original";
  
  const data = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();

  return (
    <div>
      <h2 className="text-4xl">{res.name}</h2> {/* Poprawione z res.title na res.name */}
      <h2 className="text-lg">{res.first_air_date}</h2> {/* Użyj first_air_date zamiast release_date */}
      <h2>Runtime: {res.runtime} minutes</h2>
      <Image
        className="my-12 w-full"
        src={imagePath + res.backdrop_path}
        width={1000}
        height={1000}
        priority
        alt={res.name}
      />
      <p>{res.overview}</p>
    </div>
  );
}
