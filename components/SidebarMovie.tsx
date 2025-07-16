'use client';

import Link from 'next/link';
import { Section } from './Section';

export default function SidebarMovie({
  data,
  href,
}: {
  data: any[];
  href: string;
}) {
  return (
    <aside className="w-full lg:w-[280px] xl:w-[300px] shrink-0">
      <Section title="Anime Movie" href={href} icon="movie" className="bg-white dark:bg-gray-900">
        <div className="space-y-3">
          {data.slice(0, 6).map((anime) => (
            <Link
              key={anime.animeId}
              href={`/anime/${anime.animeId}`}
              className="flex items-start gap-2 group transition-all duration-300 hover:shadow-md hover:ring-1 hover:ring-pink-300/40 hover:scale-[1.015] rounded-lg p-1.5"
            >
              <div className="relative w-12 h-[74px] flex-shrink-0 overflow-hidden rounded-md shadow-sm">
                <img
                  src={anime.poster}
                  alt={anime.title}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-medium text-gray-800 dark:text-gray-100 leading-tight line-clamp-2 group-hover:text-pink-500">
                  {anime.title}
                </h3>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                  {anime.releasedOn}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </aside>
  );
}
