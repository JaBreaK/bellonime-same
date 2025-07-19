'use client';

import { useState, useEffect } from 'react';
import { getHomeData } from '@/lib/services';
import type { Anime } from '@/types/anime';
import MovieCard from './MovieCard';
import Link from 'next/link';

export default function MovieSection() {
  const [movies, setMovies] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getHomeData();
        setMovies(response.movie.animeList.slice(0, 8));
      } catch (error) {
        console.error('Gagal memuat data movie:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
<aside className="space-y-4">
          <section className="bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/30 rounded-xl p-2 backdrop-blur-md shadow-md">
            <div className="flex items-center justify-between mb-3 p-2">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Movie</h2>
              <Link href="/movies" className="flex-shrink-0 px-4 py-1 border-1 border-border text-text-dim rounded-full text-sm font-semibold transition-colors duration-200 hover:bg-pink-500 hover:text-white hover:border-pink-500">
                Lihat Semua
              </Link>
            </div>
        <div className="space-y-3">
          {isLoading ? (
            // Jika loading, render beberapa skeleton
            Array.from({ length: 5 }).map((_, i) => (
              <MovieCard key={i} isLoading />
            ))
          ) : (
            // Jika tidak, render data asli
            movies.map((movie) => (
              <MovieCard key={movie.animeId} anime={movie} />
            ))
          )}
        </div>
      </section>
    </aside>
  );
}