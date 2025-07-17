'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Anime } from '../types/anime';

export default function MovieCard({ anime }: { anime: Anime }) {
  return (
    <Link
      href={`/anime/${anime.animeId}`}
      className="flex items-center gap-3 p-2 rounded-lg bg-white/10 dark:bg-black/30 hover:bg-white/20 transition-all border border-white/10"
    >
      <div className="relative w-20 h-28 rounded overflow-hidden">
        <Image
          src={anime.poster}
          alt={anime.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold line-clamp-2">{anime.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{anime.releasedOn}</p>
      </div>
    </Link>
  );
}