import Link from "next/link";
import Image from "next/image";

export default function Tv({ title, id, poster_path, release_date, vote_average }) {
  const imagePath = 'https://image.tmdb.org/t/p/original';

  return (
    <div>
      <Link href={`/tv/${id}`}> {/* Poprawiona dynamiczna trasa */}
      <div className="relative inline-block rounded-md">
          <Image
            src={imagePath + poster_path}
            width={800}
            height={800}
            alt={title}
            className="block rounded-md"
          />
          <div className={`absolute bottom-0 right-0 flex items-center justify-center min-h-9 min-w-9 rounded-full ${
              vote_average >= 8.5
                ? "bg-green-600"
                : vote_average >= 8
                ? "bg-green-300"
                : vote_average >= 7
                ? "bg-orange-300"
                : vote_average >= 6
                ? "bg-orange-500"
                : vote_average >= 5
                ? "bg-red-300"
                : "bg-red-500"
            }`}>
            <h2 className="flex items-center justify-center h-7 w-7 rounded-full bg-black text-white ">
              {vote_average.toFixed(1)}
            </h2>
          </div>
        </div>
      </Link>
      <h1>{title}</h1>
      <h2>{release_date}</h2>
      
    </div>
  );
}