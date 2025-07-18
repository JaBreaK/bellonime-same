// src/components/SlickCarousel.tsx (Versi Final dengan Tombol Custom)
'use client';

import Slider, { type CustomArrowProps } from "react-slick";
import type { Anime } from '../../types/anime';
import AnimeCard from "../AnimeCard";
import { ChevronLeft, ChevronRight } from "lucide-react";


// Komponen custom untuk tombol "Panah Berikutnya"
const NextArrow = ({ onClick }: CustomArrowProps) => {
  return (
    <button 
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-2 bg-card/80 backdrop-blur-sm border border-border rounded-full text-text-bright z-10 hover:bg-glow hover:text-white transition-all"
      onClick={onClick}
    >
      <ChevronRight size={28} />
    </button>
  );
};

// Komponen custom untuk tombol "Panah Sebelumnya"
const PrevArrow = ({ onClick }: CustomArrowProps) => {
  return (
    <button 
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-2 bg-card/80 backdrop-blur-sm border border-border rounded-full text-text-bright z-10 hover:bg-glow hover:text-white transition-all"
      onClick={onClick}
    >
      <ChevronLeft size={28} />
    </button>
  );
};


export default function SlickCarousel({ animes}: { animes: Anime[], isLoading?: boolean }) {
  const settings = {
    // --- UBAH & TAMBAHKAN BAGIAN INI ---
    className: "center", // Memberi class pada wrapper untuk styling
    centerMode: true,    // Mengaktifkan mode fokus di tengah
    infinite: true,      // Kita aktifkan lagi loop biar lebih keren
    centerPadding: "60px", // Jarak untuk 'ngintip' slide di samping
    speed: 350,
    arrows: true,
    slidesToShow: 7, 
    swipeToSlide: true,    // Tampilkan 5 slide agar ada 1 di tengah dan 2 di tiap sisi
    // ------------------------------------

    // Sisanya bisa tetap sama
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
      { breakpoint: 475, settings: { slidesToShow: 1 } }
    ]
  };


  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {animes.map((anime) => (
          <div key={anime.animeId} className="px-2 py-4">
            <AnimeCard anime={anime as Anime} />
          </div>
        ))}
      </Slider>
    </div>
  );
}