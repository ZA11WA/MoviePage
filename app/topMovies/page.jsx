import Movie from "../Movie";

const Movies = async () => {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const res = await data.json();

  return ( 
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mx-auto ">
      {res.results.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
          release_date={movie.release_date}
          vote_average={movie.vote_average}
        />
      ))}
    </div>
  );
}
 
export default Movies;
