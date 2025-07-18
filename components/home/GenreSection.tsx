'use client';

import { useState, useEffect } from 'react';
import { getGenresData } from '@/lib/services';
import type { GenresLink } from '@/types/anime';
import GenreScroller from './GenreScroller';

export default function GenreSection() {
  const [genres, setGenres] = useState<GenresLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await getGenresData();
        setGenres(response.genreList);
      } catch (error) {
        console.error('Gagal memuat data genre:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGenres();
  }, []);

  return (
    <section className="mb-2 bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-xl p-2 backdrop-blur-md shadow-md">
      <GenreScroller genres={genres} isLoading={isLoading} />
    </section>
  );
}