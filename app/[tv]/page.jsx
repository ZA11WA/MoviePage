import Image from "next/image";

export async function generateStaticParams() {
  const data = await fetch(
    `https://api.themoviedb.org/3/tv/${tv}?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const res = await data.json();
  return res.results.map((tv) => ({
    tv: toString(tv.id),
  }));
}

export default async function TvDetail({ params }) {
  
  const {tv} = params;
  const imagePath = "https://image.tmdb.org/t/p/original";
  const data = await fetch(
    `https://api.themoviedb.org/3/tv/${tv}?api_key=${process.env.API_KEY}`
  
    
);
  const res = await data.json();
  return (
    <div>
      <h2 className="text-4xl">{res.name}</h2>{" "}
      {/* Poprawione z res.title na res.name */}
      <h2 className="text-lg">{res.first_air_date}</h2>{" "}
      {/* Użyj first_air_date zamiast release_date */}
      <h2>Runtime: {res.runtime} minutes</h2>
      <h2 className="text-sm bg-green-600 inline-block my-2 py-2 px-4 rounded">
        {res.status}
      </h2>{" "}
      {/* Poprawione 'rounde' na 'rounded' */}
      <h2>
        <Image
          className="my-12 w-full"
          src={imagePath + res.backdrop_path}
          width={1000}
          height={1000}
          priority
        />
      </h2>
      <p>{res.overview}</p>
    </div>
  );
}