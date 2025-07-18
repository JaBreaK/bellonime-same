'use client';

import { useState, useEffect } from 'react';
import AnimeCard from '../AnimeCard';
import type { Recent, Popular, Completed, Ongoing, Pagination, ApiResponse } from '@/types/anime';
import { getRecentData, getPopularData, getCompletedData, getOngoingData } from '@/lib/services';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Tipe data sekarang adalah tipe data dari dalam 'animeList'
type AnimeItem = (Recent['animeList'][0] | Popular['animeList'][0] | Completed['animeList'][0] | Ongoing['animeList'][0]);

const TABS = ['Terbaru', 'Populer', 'Tamat'];

export default function TabbedAnimeSection() {
  const [activeTab, setActiveTab] = useState(TABS.at(0) || TABS.at(0));
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<Pagination | null>(null);
  const [data, setData] = useState<AnimeItem[]>([]); // <-- Tipe diubah
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let response: ApiResponse<Recent | Popular | Completed | Ongoing> | undefined;
        if (activeTab === 'Terbaru') {
          response = await getRecentData(currentPage);
        } else if (activeTab === 'Populer') {
          response = await getPopularData(currentPage);
        } else if (activeTab === 'Tamat') {
          response = await getCompletedData(currentPage);
        } else if (activeTab === 'Ongoing') {
          response = await getOngoingData(currentPage);
        }

        setData(response?.data?.animeList ?? []);
        setPaginationInfo(response?.pagination ?? null);
      } catch (error) {
        console.error(`Gagal memuat data untuk tab ${activeTab}:`, error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab, currentPage]);

  const handleTabClick = (tab: string) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <section className="bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/30 rounded-xl p-4 backdrop-blur-xl shadow-md">
      <div className="flex items-center justify-between border-b border-gray-500/30 mb-4">
        {/* Kumpulan Tombol Tab */}
        <div className="flex items-center space-x-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`relative px-4 py-2 text-sm sm:text-base font-medium transition-colors rounded-md ${
                activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {/* Highlight yang bergerak */}
              {activeTab === tab && (
                <motion.div
                  layoutId="active-tab-highlight"
                  className="absolute inset-0 bg-pink-500 rounded-md z-0"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {/* Teks tab */}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* 4. Tombol Panah Navigasi Halaman */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={isLoading || !paginationInfo?.hasPrevPage}
            className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-medium w-4 text-center">{currentPage}</span>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={isLoading || !paginationInfo?.hasNextPage}
            className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div>
  {isLoading ? (
    // Jika loading, render beberapa skeleton card
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <AnimeCard key={i} isLoading />
      ))}
    </div>
  ) : (
    // Jika tidak, render data anime asli
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
      {data.map((anime: AnimeItem) => (
        <AnimeCard key={anime.animeId} anime={anime} />
      ))}
    </div>
  )}
</div>
    </section>
  );
}