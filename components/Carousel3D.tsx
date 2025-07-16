'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import type { Ongoing } from '../types/anime';

export default function Carousel3DCurved({ animeList }: { animeList: Ongoing['animeList'] }) {
  return (
    <div className="py-6">
      <Swiper
        modules={[Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor
        loop
        centeredSlides
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        autoHeight
        coverflowEffect={{
          rotate: 0,
          stretch: -40,
          depth: 160,
          modifier: 1.3,
          slideShadows: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.8, // Lebih lega
            spaceBetween: 24,
          },
          640: {
            slidesPerView: 2.5,
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
        }}
        className="max-w-full"
      >
        {animeList.map((anime) => (
          <SwiperSlide key={anime.animeId} className="!w-36 sm:!w-40 md:!w-44">
            <Link href={`/anime/${anime.animeId}`} className="group block">
              <div className="aspect-[2/3] relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={anime.poster}
                  alt={anime.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-2 text-center text-sm font-semibold  truncate group-hover:text-pink-500">
                {anime.title}
              </h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
