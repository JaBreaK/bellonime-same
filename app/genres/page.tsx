import { getGenresData } from '@/lib/services';
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import { Tags } from 'lucide-react';
import type { Genres } from '@/types/anime';

// Fungsi untuk SEO
export const metadata = {
  title: 'Daftar Genre - AniWeb',
  description: 'Jelajahi semua genre anime yang tersedia.',
};

// Komponen Halaman
export default async function GenresPage() {
  let genresData: Genres;

  try {
    const response = await getGenresData();
    genresData = response.data;
  } catch {
    return (
      <div className="text-center text-red-500 p-8">
        Gagal memuat daftar genre.
      </div>
    );
  }

  if (!genresData || genresData.genreList.length === 0) {
    return <div className="text-center p-8">Tidak ada genre yang ditemukan.</div>;
  }

  return (
    <main className="min-h-screen py-6 px-2 md:px-4">
      <Breadcrumb dynamicRoutes={{ genres: 'Genres' }} />
      
      <div className="container mx-auto px-4 py-8 bg-white/5 dark:bg-black/30 border border-white/10 dark:border-white/20 rounded-xl p-4 md:p-6 backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Tags size={32} className="text-pink-500" />
          <h1 className="text-3xl md:text-4xl font-bold">
            Daftar Genre
          </h1>
        </div>

        {/* Grid untuk daftar genre */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {genresData.genreList.map((genre) => (
            <Link
              key={genre.genreId}
              href={`/genres/${genre.genreId}`}
              className="block p-4 bg-white/5 dark:bg-black/20 border border-white/10 rounded-lg text-center font-semibold
                         hover:bg-pink-500 hover:text-white hover:border-pink-500 
                         transition-all duration-300 transform hover:-translate-y-1"
            >
              {genre.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}