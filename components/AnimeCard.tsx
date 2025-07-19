'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Anime } from '../types/anime';

type LinkType = 'detail' | 'latest-episode';

interface AnimeCardProps {
  anime?: Partial<Anime>;
  linkTo?: LinkType;
  isLoading?: boolean;
}

// Komponen Skeleton
function AnimeCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] w-full bg-gray-700/50 rounded-lg"></div>
      <div className="h-4 mt-2 bg-gray-700/50 rounded-md w-3/4"></div>
      <div className="h-3 mt-1 bg-gray-700/50 rounded-md w-1/2"></div>
    </div>
  );
}

export default function AnimeCard({ anime, linkTo = 'detail', isLoading }: AnimeCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (isLoading) {
    return <AnimeCardSkeleton />;
  }
  if (!anime?.animeId) {
    return null;
  }

  const href =
    linkTo === 'latest-episode'
      ? `/anime/${anime.animeId}/latest`
      : `/anime/${anime.animeId}`;

  return (
    <Link href={href} className="group relative block">
      <motion.div
        className="aspect-[2/3] relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-pink-500/20"
        
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Placeholder saat gambar belum termuat */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
        )}

        {anime.poster ? (
          <Image
            src={anime.poster}
            alt={anime.title ?? 'Anime Poster'}
            fill
            className={`object-cover transition-all duration-300 group-hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            quality={85}
            onLoad={() => setIsImageLoaded(true)} // <-- Set state saat gambar selesai dimuat
          />
        ) : (
          <div className="bg-gray-800 w-full h-full flex items-center justify-center text-white text-sm">
            No Image
          </div>
        )}
        
        
        {anime.episodes && (
          <div
            className="
              absolute top-2.5 left-2.5 
              bg-black/50 backdrop-blur-sm 
              text-white text-xs font-bold px-2 py-1 rounded-md
            "
          >
            Ep {anime.episodes}
          </div>
        )}
        {anime.estimation && (
          <div
            className="
              absolute bottom-2.5 left-2.5
              bg-black/60 backdrop-blur-sm
              text-white text-xs font-semibold px-2 py-1 rounded-md
              flex items-center gap-1 z-10
            "
          >
            <span>⏰</span>
            <span>{anime.estimation}</span>
          </div>
        )}

      </motion.div>

      {/* Judul */}
      <h3
        className="
          mt-2 font-semibold text-sm line-clamp-2 
          text-gray-800 dark:text-gray-200 transition-colors
          group-hover:text-pink-500
        "
      >
        {anime.title ?? 'No Title'}
      </h3>

      

      {/* Detail Tambahan */}
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
        {anime.releasedOn && <p> {anime.releasedOn}</p>}
        {anime.status && <p>{anime.status}</p>}
        {anime.estimation && <p>{anime.estimation}</p>}
        
        {/* 'estimation' tidak ada di tipe, gunakan properti lain yang ada */}
        {/* {anime.estimation && <p>Durasi: {anime.estimation}</p>} */}
      </div>
    </Link>
  );
}