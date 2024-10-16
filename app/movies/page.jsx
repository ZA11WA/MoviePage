import Movie from "../Movie";

const Movies = async () => {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const res = await data.json();

  return ( 
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-fluid mx-auto">
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
