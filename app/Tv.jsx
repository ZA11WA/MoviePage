import Link from "next/link";
import Image from 'next/image';

export default function Tv({ title, id, poster_path, release_date, vote_average }) {
    const imagePath = 'https://image.tmdb.org/t/p/original';

    return (
        <div className="relative mb-4">
            <Link href={`/${id}`}>
                <Image 
                    src={imagePath + poster_path} 
                    width={800} 
                    height={800} 
                    alt={title} 
                />
                {/* Ocena na obrazku */}
            </Link>
            <div className="flex flex-col flex-grow ml-4 p-4">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">{title}</h1>
                        <h2 className="text-gray-600">{release_date}</h2>
                <div className="absolute bottom-2 right-2 flex items-center justify-center border rounded-full w-12 h-12 bg-white shadow-lg">
                    <span className="text-black">{vote_average.toFixed(1)}</span>
                </div>
                    </div>
                    {/* Miejsce na ocenę poza obrazkiem */}
                    
                </div>
            </div>
        </div>
    );
}
