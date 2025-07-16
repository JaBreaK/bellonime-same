import Image from 'next/image';
import Link from 'next/link';

interface AnimeCardProps {
  animeId: string;
  poster: string;
  title: string;
  episodes?: string;
}

export default function AnimeCard({ animeId, poster, title, episodes }: AnimeCardProps) {
  return (
    <Link href={`/anime/${animeId}`} className="group cursor-pointer">
      <div className="relative w-full aspect-[2/3] overflow-hidden rounded-md shadow-lg">
        <Image
          src={poster}
          alt={`Poster anime ${title}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        {episodes && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 px-2 py-1 text-center">
            <span className="text-white text-sm font-semibold">
              Eps {episodes}
            </span>
          </div>
        )}
      </div>
      <h3 className="mt-2 text-md font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-pink-500"> {/* Diubah */}
        {title}
      </h3>
    </Link>
  );
}