'use client';

import { useKeenSlider } from 'keen-slider/react';
import Link from 'next/link';
import Image from 'next/image';
import 'keen-slider/keen-slider.min.css';
import type { Ongoing } from '../types/anime';

export default function CarouselOngoing3D({ animeList }: { animeList: Ongoing['animeList'] }) {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    renderMode: 'performance',
    mode: 'free-snap',
    slides: {
      perView: 5,
      spacing: 16,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: { perView: 2.2, spacing: 12 },
      },
      '(max-width: 1024px)': {
        slides: { perView: 3.2, spacing: 14 },
      },
    },
  });

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sedang Tayang</h2>
        <div className="space-x-2">
          <button
            onClick={() => instanceRef.current?.prev()}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-pink-500 hover:text-white transition"
          >
            ←
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-pink-500 hover:text-white transition"
          >
            →
          </button>
        </div>
      </div>

      <div ref={sliderRef} className="keen-slider">
        {animeList.map((anime) => (
          <div key={anime.animeId} className="keen-slider__slide">
            <Link
              href={`/anime/${anime.animeId}`}
              className="group flex-shrink-0 w-full max-w-[150px] mx-auto"
            >
              <div className="aspect-[2/3] relative rounded-xl overflow-hidden shadow-lg group-hover:shadow-pink-500/30 transition">
                <Image
                  src={anime.poster}
                  alt={anime.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-center text-gray-800 dark:text-gray-100 truncate group-hover:text-pink-500">
                {anime.title}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
