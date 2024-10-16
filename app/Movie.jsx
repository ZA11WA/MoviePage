import Link from "next/link"
import Image from 'next/image'

export default function Movie({title, id, poster_path, release_date, vote_average}) {
    const imagePath ='https://image.tmdb.org/t/p/original'
    return(
        <div>
            <Link href={`/${id}`}>
                <Image src={imagePath + poster_path} width={800} height={800} alt={title} />
            </Link>
            <h1>{title}</h1>
            <h2>{release_date}</h2>
            <h2>{vote_average.toFixed(1)}</h2>
        </div>
    )
    
};
