import MovieCard from '@/components/MovieCard';
import { getOngoingData, getHomeData, getGenresData } from '@/lib/services';
import { Suspense } from 'react';
import SlickCarousel from '@/components/SlickCarousel';
import GenreScroller from '@/components/GenreScroller';
import TabbedAnimeSection from '@/components/TabbedAnimeSection';
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';

export default async function HomePage() {
const [ongoingResult, homeResult, genresResult] = await Promise.allSettled([
    getOngoingData(),
    getHomeData(),
    getGenresData(),
  ]);

  // Cek hasil masing-masing dan tangani error
  if (ongoingResult.status === 'rejected') {
    console.error('Gagal ambil data ongoing:', ongoingResult.reason);
    // Tampilkan pesan error atau fallback UI
  }
  if (homeResult.status === 'rejected') {
    console.error('Gagal ambil data home:', homeResult.reason);
  }
  if (genresResult.status === 'rejected') {
    console.error('Gagal ambil data genres:', genresResult.reason);
  }

  // Ambil data jika berhasil, atau sediakan nilai default
  const ongoingAnime = ongoingResult.status === 'fulfilled' ? ongoingResult.value.data.animeList : [];
  const home = homeResult.status === 'fulfilled' ? homeResult.value : null;
  const genresAnime = genresResult.status === 'fulfilled' ? genresResult.value.genreList : [];
  

  return (
    <main className="min-h-screen py-6 px-2 md:px-4">
      <Breadcrumb  />
      {/* Carousel */}
      <section className="mb-2  bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-xl p-2 backdrop-blur-md shadow-md">
        {ongoingAnime.length > 0 && (
          <div className="max-w-[2160px] mx-auto px-2">
            <SlickCarousel animes={ongoingAnime} />
          </div>
        )}
      </section>

      {/* Genre */}
      {genresAnime.length > 0 && (
        <section className="mb-2 bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-xl p-2 backdrop-blur-md shadow-md">
          <GenreScroller genres={genresAnime} />
        </section>
      )}

      {/* Main Grid */}
      <div className="max-w-[1440px] mx-auto px-2 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Konten Kiri */}
        <div className="space-y-10">
          {/* Rilisan Terbaru */}
          <TabbedAnimeSection />
        </div>

        {/* Sidebar Movie */}
        <aside className="space-y-4">
          <section className="bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-xl p-2 backdrop-blur-md shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Movie</h2>
              <Link href="/anime/movie" className="text-sm text-primary hover:underline">
                Lihat Semua
              </Link>
            </div>

            <Suspense fallback={<div>Loading anime...</div>}>
              <div className="space-y-3">
                {home?.movie.animeList.slice(0, 8).map((anime) => (
                  <MovieCard key={anime.animeId} anime={anime} />
                ))}
              </div>
            </Suspense>
          </section>
        </aside>
      </div>
    </main>
  );
}
