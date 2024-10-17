import Image from "next/image";

export default async function MovieDetail({ params }) {
  const { id } = params; // Dynamiczny parametr z URL
  const imagePath = "https://image.tmdb.org/t/p/original";
  
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();

  return (
    <div>
      <h2 className="text-4xl">{res.title}</h2>
      <h2 className="text-lg">{res.release_date}</h2>
      <h2>Runtime: {res.runtime} minutes</h2>
      <Image
        className="my-12 w-full"
        src={imagePath + res.backdrop_path}
        width={1000}
        height={1000}
        priority
        alt={res.title}
      />
      <p>{res.overview}</p>
    </div>
  );
}
