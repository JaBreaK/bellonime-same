'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Anime } from '../../types/anime'; // Gunakan tipe gabungan

// Komponen Skeleton terpisah untuk kebersihan kode
function MovieCardSkeleton() {
  return (
    <div className="flex items-center gap-3 p-2 animate-pulse">
      <div className="w-20 h-28 rounded bg-gray-700/50"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-700/50 rounded w-full"></div>
        <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700/50 rounded w-1/2 mt-1"></div>
      </div>
    </div>
  );
}

// Tambahkan isLoading ke props
export default function MovieCard({ anime, isLoading }: { anime?: Partial<Anime>, isLoading?: boolean }) {
  // Jika loading, tampilkan skeleton
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  if (isLoading) {
    return <MovieCardSkeleton />;
  }

  // Jika tidak loading tapi tidak ada data, jangan tampilkan apa-apa
  if (!anime?.animeId) {
    return null;
  }

  return (
    <Link
      href={`/anime/${anime.animeId}`}
      className="flex items-center gap-3 p-2 rounded-lg bg-white/10 dark:bg-black/30 hover:bg-white/20 transition-all border border-white/10"
    >
      <motion.div 
      animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      className="relative w-20 h-28 rounded overflow-hidden flex-shrink-0">
        {/* Placeholder saat gambar belum termuat */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
        )}
        <Image
          src={anime.poster || ''}
          alt={anime.title || 'Movie Poster'}
          fill
          className={`object-cover transition-all duration-300 group-hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            quality={85}
            onLoad={() => setIsImageLoaded(true)}
        />
      </motion.div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold line-clamp-2">{anime.title}</h3>
        <p className="text-xs text-gray-400 mt-1">{anime.releaseDate}</p>
      </div>
    </Link>
  );
}