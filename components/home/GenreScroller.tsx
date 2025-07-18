// src/components/GenreScroller.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { GenresLink } from '../../types/anime';
import GenreScrollerSkeleton from './GenreScrollerSkeleton';

export default function GenreScroller({ genres, isLoading }: { genres: GenresLink[], isLoading?: boolean }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true, // Membuat scroll terasa lebih bebas saat di-drag
    loop: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);


  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  
  if (isLoading) {
    return <GenreScrollerSkeleton />;
  }

  return (
    <div className="relative group fade-edges">
      {/* Tombol Panah Kiri */}
      {canScrollPrev && (
        <button onClick={scrollPrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-1 bg-card/80 backdrop-blur-sm border border-border rounded-full text-text-bright z-10 opacity-0 group-hover:opacity-100 transition-all hover:bg-glow">
          <ChevronLeft size={20} />
        </button>
      )}
      
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {genres.map((genre) => (
            <Link
              href={`/genres/${genre.genreId}`}
              key={genre.genreId}
              // Style Tombol Outline
              className="flex-shrink-0 px-4 py-2 border-1 border-border text-text-dim rounded-full text-sm font-semibold transition-colors duration-200 hover:bg-pink-500 hover:text-white hover:border-pink-500"
            >
              {genre.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Tombol Panah Kanan */}
      {canScrollNext && (
         <button onClick={scrollNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-1 bg-card/80 backdrop-blur-sm border border-border rounded-full text-text-bright z-10 opacity-0 group-hover:opacity-100 transition-all hover:bg-glow">
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}