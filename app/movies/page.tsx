import { getMoviesData } from '@/lib/services';
import type { Anime } from '@/types/anime';
import Breadcrumb from '@/components/Breadcrumb';
import AnimeCard from '@/components/AnimeCard';
import PaginationControls from '@/components/PaginationControls';
import { Film } from 'lucide-react';

// Fungsi untuk SEO
export const metadata = {
  title: 'Daftar Film - AniWeb',
  description: 'Jelajahi semua film anime yang tersedia.',
};

// Tipe untuk props halaman, termasuk searchParams untuk pagination
type Props = {
  searchParams: { page?: string };
};

// Komponen Halaman
export default async function MoviesPage({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  
  try {
    const response = await getMoviesData(page);
    const moviesData = response.data;
    const pagination = response.pagination;

    if (!moviesData || moviesData.animeList.length === 0) {
      return <div className="text-center p-8">Tidak ada film yang ditemukan.</div>;
    }

    return (
      <main className="container mx-auto px-4 py-6">
        <Breadcrumb dynamicRoutes={{ movies: 'Movies' }} />
        
        <div className="container mx-auto px-4 py-8 bg-white/5 dark:bg-black/30 border border-white/10 dark:border-white/20 rounded-xl p-4 md:p-6 backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Film size={32} className="text-pink-500" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Semua Film
            </h1>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {moviesData.animeList.map((anime: Anime) => (
              <AnimeCard key={anime.animeId} anime={anime} />
            ))}
          </div>

          <PaginationControls pagination={pagination} />
        </div>
      </main>
    );
  } catch {
    return (
      <div className="text-center text-red-500 p-8">
        Gagal memuat daftar film.
      </div>
    );
  }
}