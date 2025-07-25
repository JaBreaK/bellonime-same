import { getHomeData } from '@/lib/services';
import SlickCarousel from '@/components/home/SlickCarousel';
import MovieSection from '@/components/home/MovieSection';
import TabbedAnimeSection from '@/components/home/TabbedAnimeSection';
import Breadcrumb from '@/components/Breadcrumb';
import GenreSection from '@/components/home/GenreSection';

export default async function HomePage() {
const [top10Result] = await Promise.allSettled([
    getHomeData(),
  ]);

  // Cek hasil masing-masing dan tangani error
  if (top10Result.status === 'rejected') {
    console.error('Gagal ambil data ongoing:', top10Result.reason);
    // Tampilkan pesan error atau fallback UI
  }

  // Ambil data jika berhasil, atau sediakan nilai default
  const top10Anime = top10Result.status === 'fulfilled' ? top10Result.value.top10.animeList : [];

  

  return (
    <main className="min-h-screen py-6 px-2 md:px-4">
      <Breadcrumb  />
      {/* Carousel */}
      <section className="mb-2  bg-white dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-xl p-2 backdrop-blur-xl shadow-md">
        {top10Anime.length > 0 && (
          <div className="max-w-[2160px] mx-auto px-2">
            <SlickCarousel animes={top10Anime} />
          </div>
        )}
      </section>

<GenreSection />

      {/* Main Grid */}
      <div className="max-w-[1440px] mx-auto px-2 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Konten Kiri */}
        <div className="space-y-10">
          {/* Rilisan Terbaru */}
          <TabbedAnimeSection />
        </div>

        {/* Sidebar Movie */}
        <MovieSection />
      </div>
    </main>
  );
}
