import { getAnimeDetail } from '@/lib/services';
import Breadcrumb from '@/components/Breadcrumb';
import { AnimeDetail } from '@/types/anime';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params: rawParams }: Props) {
  const params = await rawParams; // <-- Tambahkan await
  try {
    const anime: AnimeDetail = await getAnimeDetail(params.id);
    return {
      title: `${anime.title} - AniWeb`,
      description: anime.synopsis?.paragraphs,
    };
  } catch {
    
  }
}

export default async function AnimeDetailPage({ params: rawParams }: Props) {
  const params = await rawParams; // <-- Tambahkan await
  let anime: AnimeDetail;

  try {
    anime = await getAnimeDetail(params.id);
  } catch (error) {
    console.error(error);
    return (
      <div className="text-center text-red-500 p-8">
        Gagal memuat data anime.
      </div>
    );
  }

  if (!anime) {
    return <div>Anime tidak ditemukan.</div>;
  }

  const dynamicRoutes = {
    [params.id]: anime.title,
  };

  return (
    <main className="min-h-screen py-6 px-2 md:px-4">
      <Breadcrumb dynamicRoutes={dynamicRoutes} />

      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold">{anime.title}</h1>
        {/* ... sisa konten detail animenya ... */}
      </div>
    </main>
  );
}