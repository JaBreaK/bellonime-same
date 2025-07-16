import { getHomeData, getOngoingData } from '@/lib/services';
import Carousel3D from '@/components/Carousel3D';
import AnimeCard from '@/components/AnimeCard';
import { Section } from '@/components/Section';
import { Suspense } from 'react';
import SidebarMovie from '@/components/SidebarMovie';


export default async function HomePage() {
  const homeData = await getHomeData();
  const ongoingData = await getOngoingData();

  return (
    <main className="container mx-auto px-4 py-6 space-y-8">
      <Carousel3D animeList={ongoingData.animeList} />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          <Section title="Rilisan Terbaru" href={homeData.recent.href} icon="recent">
            <Suspense fallback={<LoadingGrid />}>
              <AnimeGrid data={homeData.recent.animeList} />
            </Suspense>
          </Section>

          <Section title="Batch Lengkap" href={homeData.batch.href} icon="batch">
            {homeData.batch.batchList.length === 0 && (
              <div className="text-gray-500 dark:text-gray-300 italic">
                Belum ada data batch.
              </div>
            )}
          </Section>
        </div>

        {/* Sidebar */}
        <SidebarMovie data={homeData.movie.animeList} href={homeData.movie.href} />
      </div>
    </main>
  );
}
function AnimeGrid({ data }: { data: any[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-4">
      {data.map((anime) => (
        <AnimeCard
          key={anime.animeId}
          animeId={anime.animeId}
          poster={anime.poster}
          title={anime.title}
          episodes={anime.episodes}
        />
      ))}
    </div>
  );
}
function LoadingGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 animate-pulse">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="w-full aspect-[2/3] bg-gray-300/30 dark:bg-gray-700/30 rounded-md" />
      ))}
    </div>
  );
}