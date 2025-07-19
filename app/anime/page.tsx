import { getAnimeListData } from "@/lib/services";
import Link from 'next/link';
import LetterNav from "@/components/anime-list/LetterNav"; // sesuaikan path
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = {
  title: 'Daftar Semua Anime',
  description: 'Cari semua judul anime favoritmu berdasarkan abjad.',
};

export default async function DaftarAnimePage() {
  let animeData;
  try {
    animeData = await getAnimeListData();
  } catch (error) {
    console.error(error);
    return (
      <main className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">
          Gagal Memuat Daftar Anime
        </h1>
        <p className="text-gray-400 mt-2">Silakan coba lagi nanti.</p>
      </main>
    );
  }

  if (!animeData?.list?.length) {
    return (
      <main className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Daftar Anime Kosong</h1>
      </main>
    );
  }

  const availableLetters = animeData.list.map((g) => g.startWith);

  return (
    <main className="container mx-auto px-4 py-8">
        <Breadcrumb  />
      <section className="bg-white/5 dark:bg-black/80 border border-white/10 dark:border-white/20 rounded-xl p-4 md:p-6 backdrop-blur-xl shadow-lg">
        <h1 className="text-3xl font-extrabold text-center mb-8">
          Daftar Semua Anime
        </h1>

        {/* NAVIGATION */}
        <LetterNav letters={availableLetters} />

        {/* CONTENT */}
        <div className="space-y-12">
          {animeData.list.map((group) => (
            <section
              key={group.startWith}
              id={group.startWith}
              className="scroll-mt-32"
            >
              <h2 className="text-3xl font-bold text-pink-500 border-b-2 border-pink-500/30 pb-2 mb-6">
                {group.startWith}
              </h2>

              <ul className="columns-2 md:columns-3 lg:columns-4 gap-x-6">
                {group.animeList.map((anime) => (
                  <li
                    key={anime.animeId}
                    className="mb-2 break-inside-avoid"
                  >
                    <Link
                      href={anime.href}
                      className="text-gray-300 hover:text-pink-400 transition-colors"
                    >
                      {anime.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
