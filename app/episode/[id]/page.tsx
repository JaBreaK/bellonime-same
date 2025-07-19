import { getAnimeDetail, getEpisodeData } from '@/lib/services';
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ListVideo } from 'lucide-react';
import type { Episode, AnimeDetail } from '@/types/anime';
import EpisodePlayerSection from '@/components/episode/EpisodePlayerSection';
import EpisodeSidebar from '@/components/episode/EpisodeSidebar';
import EpisodeListMobile from '@/components/episode/EpisodeListMobile';
import DownloadSection from '@/components/episode/DownloadSection'; // <-- Impor

// Fungsi untuk SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const episode: Episode = await getEpisodeData(params.id);
    return { title: `${episode.title} - AniWeb` };
  } catch  {
    return { title: 'Episode Tidak Ditemukan' };
  }
}

// Komponen Halaman
export default async function EpisodePage({ params }: { params: { id: string } }) {
  let episode: Episode;
  let anime: AnimeDetail;

  try {
    // Langkah 1: Ambil data episode terlebih dahulu
    episode = await getEpisodeData(params.id);
    if (!episode) throw new Error('Episode tidak ditemukan');

    // Langkah 2: Gunakan animeId dari data episode untuk mengambil detail anime
    anime = await getAnimeDetail(episode.animeId);
    if (!anime) throw new Error('Anime induk tidak ditemukan');
  } catch (error) {
    console.error(error);
    return <div className="text-center p-8">Gagal memuat data.</div>;
  }

  const dynamicRoutes = {
    [episode.animeId]: anime.title,
    [params.id]: episode.title,
  };

  return (
    <main className="min-h-screen py-6 px-2 md:px-4">
      <Breadcrumb dynamicRoutes={dynamicRoutes} />
      
      <div className="container mx-auto  grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* Kolom Kiri: Player & Download */}
        <div className="space-y-8 bg-white/5 dark:bg-black/40 border border-white/10 dark:border-white/20 rounded-xl p-4 md:p-6 backdrop-blur-xl shadow-lg">
          {/* Judul & Navigasi */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{episode.title}</h1>
            <div className="flex justify-between items-center mt-2">
              <Link 
                href={`/anime/${episode.animeId}`} 
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 text-sm font-medium rounded-full hover:bg-pink-500 hover:text-white transition-colors"
              >
                <ListVideo size={16} />
                <span>Kembali ke Daftar Episode</span>
              </Link>
              <div className="flex gap-2">
                {episode.hasPrevEpisode && episode.prevEpisode && (
                  <Link href={`/episode/${episode.prevEpisode.episodeId}`} className="p-2 bg-gray-700/50 rounded-full hover:bg-pink-500">
                    <ChevronLeft size={20} />
                  </Link>
                )}
                {episode.hasNextEpisode && episode.nextEpisode && (
                  <Link href={`/episode/${episode.nextEpisode.episodeId}`} className="p-2 bg-gray-700/50 rounded-full hover:bg-pink-500">
                    <ChevronRight size={20} />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Player & Pilihan Server */}
          <EpisodePlayerSection  episode={episode} />
          {anime.episodeList && anime.episodeList.length > 0 && (
            <EpisodeListMobile episodes={anime.episodeList} />
          )}

          {/* Link Download */}
          {/* GANTI BAGIAN DOWNLOAD YANG LAMA DENGAN INI */}
          {episode.downloadUrl?.formats && (
            <DownloadSection formats={episode.downloadUrl.formats} />
          )}
        </div>

        {/* Kolom Kanan: Daftar Episode (Sidebar) */}
        {anime.episodeList && anime.episodeList.length > 0 && (
          <EpisodeSidebar episodes={anime.episodeList} />
        )}
      </div>
    </main>
  );
}