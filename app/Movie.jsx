import Link from "next/link";
import Image from "next/image";

export default function Movie({
  title,
  id,
  poster_path,
  release_date,
  vote_average,
}) {
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div>
      <Link href={`/movie/${id}`}>
        <div className="relative inline-block">
          <Image
            src={imagePath + poster_path}
            width={800}
            height={800}
            alt={title}
            className="block"
          />
          <h2
            className={`absolute bottom-2 right-2 flex items-center justify-center h-10 w-10 rounded-full bg-white bg-opacity-35 ${
              vote_average >= 9.5
                ? "bg-green-600"
                : vote_average >= 9
                ? "bg-green-300"
                : vote_average >= 8
                ? "bg-orange-300"
                : vote_average >= 7
                ? "bg-orange-500"
                : vote_average >= 6
                ? "bg-red-300"
                : "bg-red-500"
            }`}
          >
            {vote_average.toFixed(1)}
          </h2>
        </div>
      </Link>

      <h1>{title}</h1>
      <h2>{release_date}</h2>
    </div>
  );
}