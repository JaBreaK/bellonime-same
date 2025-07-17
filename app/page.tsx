import AnimeCard from '@/components/AnimeCard';
import MovieCard from '@/components/MovieCard';
import { getOngoingData, getHomeData, getGenresData } from '@/lib/services';
import { Suspense } from 'react';
import SlickCarousel from '@/components/SlickCarousel';
import GenreScroller from '@/components/GenreScroller';

export default async function HomePage() {
  let ongoing, home, genres;
  try {
    ongoing = await getOngoingData();
    home = await getHomeData();
    genres = await getGenresData();
  } catch (error) {
    console.error('Gagal ambil data ongoing:', error);
    return (
      <div className="p-6 text-center text-red-500">
        Gagal mengambil data anime. Silakan coba lagi nanti.
      </div>
    );
  }

  const ongoingAnime = ongoing.animeList ?? [];
  const genresAnime = genres.genreList ?? [];

  return (
    <main className="min-h-screen py-6 px-2 md:px-4">
      {/* Carousel */}
      <section className="mb-8 bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-xl p-4 backdrop-blur-md shadow-md">
        {ongoingAnime.length > 0 && (
          <div className="max-w-[2160px] mx-auto px-2">
            <SlickCarousel animes={ongoingAnime} />
          </div>
        )}
      </section>

      {/* Genre */}
      {genresAnime.length > 0 && (
        <section className="mb-8 bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-xl p-4 backdrop-blur-md shadow-md">
          <GenreScroller genres={genresAnime} />
        </section>
      )}

      {/* Main Grid */}
      <div className="max-w-[1440px] mx-auto px-2 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Konten Kiri */}
        <div className="space-y-10">
          {/* Rilisan Terbaru */}
          <section className="bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-xl p-4 backdrop-blur-xl shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Terbaru</h2>
              <a href="/anime/ongoing" className="text-sm text-primary hover:underline">
                Lihat Semua
              </a>
            </div>

            <Suspense fallback={<div>Loading anime...</div>}>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                {home?.recent.animeList.map((anime) => (
                  <AnimeCard key={anime.animeId} anime={anime} />
                ))}
              </div>
            </Suspense>
          </section>
        </div>

        {/* Sidebar Movie */}
        <aside className="space-y-4">
          <section className="bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-xl p-4 backdrop-blur-md shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Movie</h2>
              <a href="/anime/movie" className="text-sm text-primary hover:underline">
                Lihat Semua
              </a>
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
