"use client";

import { useState,useRef,useEffect } from 'react';
import type { Schedule } from '@/types/anime';
import AnimeCard from '../AnimeCard';
// 👉 1. Impor AnimatePresence
import { motion, AnimatePresence } from 'framer-motion';

interface ScheduleTabsProps {
  scheduleData: Schedule;
}

export default function ScheduleTabs({ scheduleData }: ScheduleTabsProps) {
  const [activeTab, setActiveTab] = useState(0) ;
  const activeDayData = scheduleData.days[activeTab];
  const sectionRef = useRef<HTMLElement>(null);
    const scrollToTop = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  useEffect(() => {
    scrollToTop();
  }, [activeTab]);

  return (
    <section ref={sectionRef}  className='bg-white/5 dark:bg-black/40 border border-white/10 dark:border-white/20 rounded-xl p-4 md:p-6 backdrop-blur-xl shadow-lg'>
      {/* Container untuk Tab yang bisa di-scroll */}
      <div className="mb-10 overflow-x-auto no-scrollbar sticky top-0 md:top-16 z-20 py-4  mx-auto w-full md:w-max bg-white/10 dark:bg-black/60 border border-white/20 dark:border-white/30 rounded-xl p-4 backdrop-blur-xl shadow-md">
        <div className="flex items-center space-x-2 border-b border-gray-500/30 pb-2 min-w-max">
          {scheduleData.days.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setActiveTab(index)}
              className={`relative px-3 py-2 text-sm sm:text-base font-medium transition-colors rounded-md ${
                activeTab === index ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {activeTab === index && (
                <motion.div
                  layoutId="schedule-tab-highlight"
                  className="absolute inset-0 bg-pink-500 rounded-md z-0"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{day.day}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Konten Tab */}
      <div className="relative">
        {/* 👉 2. Bungkus konten dengan AnimatePresence */}
        <AnimatePresence mode="wait">
          {/* Ganti div menjadi motion.div dan gunakan props animasi.
            Hapus kelas `animate-fade-in` dari sini.
          */}
          <motion.div
            key={activeTab} // `key` tetap penting untuk AnimatePresence
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-x-4 gap-y-8">
              {activeDayData.animeList.map((anime) => {
                const transformedAnime = {
                  ...anime,
                  genres: anime.genres ? anime.genres.split(',').map(g => g.trim()) : [],
                };
                return <AnimeCard key={anime.animeId} anime={transformedAnime} />;
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}