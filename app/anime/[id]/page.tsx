import { getAnimeDetail } from '@/lib/services';
import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import Link from 'next/link';
import { Star, PlayCircle, Film, Calendar, Tv, Tag } from 'lucide-react';
import type { AnimeDetail } from '@/types/anime';
import Synopsis from '@/components/anime-detail/Synopsis';
import EpisodeList from '@/components/anime-detail/EpisodeList';
import SectionWrapper from '@/components/anime-detail/SectionWrapper';
import SkeletonHeader from '@/components/anime-detail/SkeletonHeader';
import SkeletonSynopsis from '@/components/anime-detail/SkeletonSynopsis';
import SkeletonBatch from '@/components/anime-detail/SkeletonBatch';
import SkeletonEpisodes from '@/components/anime-detail/SkeletonEpisodes';
import SkeletonSidebar from '@/components/anime-detail/SkeletonSidebar';

// Komponen Section dengan judul


// Sidebar Detail
function DetailSidebar({ anime }: { anime: AnimeDetail }) {
  const details = [
    { icon: <Tv size={16} />, label: 'Tipe', value: anime.type },
    { icon: <Film size={16} />, label: 'Episode', value: anime.episodes },
    { icon: <Calendar size={16} />, label: 'Musim', value: anime.season },
    { icon: <Star size={16} />, label: 'Skor', value: anime.score.value },
  ];

  return (
    <aside className="space-y-4 bg-white/10 dark:bg-black/60 border border-white/20 dark:border-white/10 rounded-xl p-2 backdrop-blur-xl shadow-md">
      <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-2xl">
        <Image src={anime.poster} alt={`Poster ${anime.english}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
      </div>
      <div className="space-y-3 text-sm">
        {details.map(detail => (
          <div key={detail.label} className="flex items-center gap-3">
            <div className="p-1.5 bg-gray-700/50 rounded-md">{detail.icon}</div>
            <div>
              <strong className="block text-gray-400">{detail.label}</strong>
              <span className="font-medium">{detail.value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {anime.genreList.map(genre => (
          <Link key={genre.genreId} href={`/genres/${genre.genreId}`} className="flex items-center gap-1 px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full hover:bg-pink-500 hover:text-white transition-colors">
            <Tag size={12} /> {genre.title}
          </Link>
        ))}
      </div>
    </aside>
  );
}

// SEO Metadata
export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const anime = await getAnimeDetail(params.id);
    return {
      title: `${anime.english} - AniWeb`,
      description: anime.synopsis?.paragraphs.slice(0, 160),
    };
  } catch {
    return { title: 'Anime Tidak Ditemukan', description: 'Gagal memuat data anime.' };
  }
}

// Halaman Detail Anime
export default async function AnimeDetailPage({ params }: { params: { id: string } }) {
  let anime: AnimeDetail | null = null;
  try {
    anime = await getAnimeDetail(params.id);
  } catch {
    anime = null;
  }

  const isLoaded = Boolean(anime);

  return (
    <main className="min-h-screen py-6 px-2 md:px-4 space-y-8">
      <Breadcrumb dynamicRoutes={{ [params.id]: anime?.title || '' }} />
      <div className="container mb-2 p-2 px-4 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* Konten Utama */}
        <div className="space-y-6">
          {/* Header */}
          <SectionWrapper isLoaded={isLoaded}>
            {anime ? (
              
                <div className="p-6 bg-white/60 dark:bg-black/60 border border-white/20 dark:border-white/10 rounded-xl backdrop-blur-xl shadow-md">
                  <h1 className="text-4xl font-bold">{anime.english}</h1>
                  <p className="text-lg text-gray-400">{anime.japanese}</p>
                  {anime.trailer && (
                    <Link href={anime.trailer} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 mt-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors">
                      <PlayCircle size={20} />
                      <span>Tonton Trailer</span>
                    </Link>
                  )}
                </div>
              
            ) : (
              <SkeletonHeader />
            )}
          </SectionWrapper>

          {/* Sinopsis */}
          <SectionWrapper isLoaded={isLoaded} >
            {anime ? <Synopsis text={anime.synopsis.paragraphs} /> : <SkeletonSynopsis />}
          </SectionWrapper>

          {/* Download Batch */}
          <SectionWrapper isLoaded={isLoaded} >
            {anime && anime.batchList && anime.batchList.length > 0 ? (
              <div className="space-y-3">
                {anime.batchList.map(batch => (
                  <Link key={batch.batchId} href={batch.href} className="block p-3 bg-[#161616] rounded-md text-center text-sm font-medium hover:bg-pink-500 hover:text-white transition-colors">
                    {batch.title}
                  </Link>
                ))}
              </div>
            ) : (
              <SkeletonBatch />
            )}
          </SectionWrapper>

          {/* Episodes */}
          <SectionWrapper isLoaded={isLoaded} >
            {anime ? <EpisodeList episodes={anime.episodeList} /> : <SkeletonEpisodes />}
          </SectionWrapper>
        </div>

        {/* Sidebar */}
        <SectionWrapper isLoaded={isLoaded}>
          {anime ? <DetailSidebar anime={anime} /> : <SkeletonSidebar />}
        </SectionWrapper>
      </div>
    </main>
  );
}
