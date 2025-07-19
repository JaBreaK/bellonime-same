import { getGenresDetailData } from '@/lib/services';
import type { Anime } from '@/types/anime';
import Breadcrumb from '@/components/Breadcrumb';
import AnimeCard from '@/components/AnimeCard';
import PaginationControls from '@/components/PaginationControls';
import Link from 'next/link';
import { Tags } from 'lucide-react';


type Props = {
  params: { id: string };
  searchParams: { page?: string };
};

// Fungsi untuk SEO: Mengatur judul tab browser
export async function generateMetadata({ params }: Props) {
  // Mengubah 'action' menjadi 'Action'
  const genreTitle = params.id.charAt(0).toUpperCase() + params.id.slice(1);
  return {
    title: `Genre: ${genreTitle} - AniWeb`,
  };
}

export default async function GenreDetailPage({ params, searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  
  try {
    // 'response' sekarang berisi seluruh ApiResponse
    const response = await getGenresDetailData(params.id, page);
    // Ambil 'data' dan 'pagination' secara terpisah
    const genreData = response.data;
    const pagination = response.pagination;

    if (!genreData || genreData.animeList.length === 0) {
      return <div className="text-center p-8">Tidak ada anime untuk genre ini.</div>;
    }

    const genreTitle = params.id.charAt(0).toUpperCase() + params.id.slice(1).replace(/-/g, ' ');
    const dynamicRoutes = {
      genres: 'Genres',
      [params.id]: genreTitle,
    };

    return (
      <main className="min-h-screen py-6 px-2 md:px-4">
        <Breadcrumb dynamicRoutes={dynamicRoutes} />
        
        <div className="container mx-auto px-4 py-8 bg-white/5 dark:bg-black/30 border border-white/10 dark:border-white/20 rounded-xl p-4 md:p-6 backdrop-blur-xl shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
    <h1 className="text-3xl md:text-4xl font-bold">
      Genre: <span className="text-pink-500">{genreTitle}</span>
    </h1>
    <Link 
      href="/genres"
      className="inline-flex items-center gap-2 px-4 py-2 mt-3 sm:mt-0 bg-gray-700/50 text-gray-300 text-sm font-medium rounded-full hover:bg-pink-500 hover:text-white transition-colors"
    >
      <Tags size={16} />
      <span>Lihat Semua Genre</span>
    </Link>
  </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {genreData.animeList.map((anime: Anime) => (
              <AnimeCard key={anime.animeId} anime={anime} />
            ))}
          </div>

          <PaginationControls pagination={pagination} />
        </div>
      </main>
    );
  } catch  {
    return (
      <div className="text-center text-red-500 p-8">
        Gagal memuat data genre.
      </div>
    );
  }
}