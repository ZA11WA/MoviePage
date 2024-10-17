import Tv from "../Tv"; // Zakładam, że komponent Tv jest w folderze tv

const Tvs = async () => {
  const data = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const res = await data.json();

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-fluid mx-auto">
      {res.results.map((tv) => (
        <Tv
          key={tv.id}
          id={tv.id}
          title={tv.name}
          poster_path={tv.poster_path}
          release_date={tv.first_air_date}
          vote_average={tv.vote_average}
        />
      ))}
    </div>
  );
};

export default Tvs;
