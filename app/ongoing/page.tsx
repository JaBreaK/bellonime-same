// src/app/page.tsx (Versi Rombakan Total)

import { getOngoingData } from '@/lib/services';
import SlickCarousel from '@/components/SlickCarousel';
import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Bellonime - Nonton Anime Sub Indo Gratis & Terlengkap',
  description: 'Website nonton anime subtitle indonesia gratis dengan koleksi terlengkap dan update setiap hari. Streaming anime dengan kualitas HD tanpa iklan.',
  keywords: ['nonton anime', 'anime sub indo', 'streaming anime', 'bellonime', 'anime gratis'],
  openGraph: {
    title: 'Bellonime - Nonton Anime Sub Indo Gratis & Terlengkap',
    description: 'Streaming anime dengan kualitas HD tanpa iklan.',
    // Sediakan gambar default untuk homepage
    images: ['/images/bellonime.png'], // Pastikan gambar ini ada di folder /public/images/
  },
};

export default async function HomePage() {
   
 

  let ongoing;
  try {
    ongoing = await getOngoingData();
  } catch (error) {
    console.error('Gagal ambil data ongoing:', error);
    return (
      <div className="p-6 text-center text-red-500">
        Gagal mengambil data anime. Silakan coba lagi nanti.
      </div>
    );
  }




  // Siapkan data, pastikan aman jika kosong
  const recentAnime = ongoing.animeList ?? [];


  return (
    // Kita hapus container di sini agar Carousel bisa full-width
    <main className="container mx-auto px-4">

      {/* Hero Section: Carousel (Full Width) */}
      {recentAnime.length > 0 && <SlickCarousel animes={recentAnime} />}


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-9 space-y-12">
        {/* Section: Rilisan Terbaru */}



        </div>

                {/* Kolom Kanan: Sidebar */}
        <aside className="lg:col-span-3">

        </aside>
        
      </div>

    </main>
  );
}