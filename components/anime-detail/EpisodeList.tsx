'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { EpisodeInfo } from '@/types/anime';
import { ArrowDownUp } from 'lucide-react';

export default function EpisodeList({ episodes }: { episodes: EpisodeInfo[] }) {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const sortedEpisodes = useMemo(() => {
    // Buat salinan array agar tidak mengubah data asli
    const episodesCopy = [...episodes];
    if (sortOrder === 'asc') {
      return episodesCopy.reverse();
    }
    return episodesCopy;
  }, [episodes, sortOrder]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold border-l-4 border-pink-500 pl-3">
          Daftar Episode
        </h2>
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 text-gray-300 text-xs rounded-full hover:bg-pink-500 hover:text-white transition-colors"
        >
          <ArrowDownUp size={14} />
          <span>{sortOrder === 'asc' ? 'Terbaru' : 'Terlama'}</span>
        </button>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {sortedEpisodes.map(episode => (
          <Link
            key={episode.episodeId}
            href={`/episode/${episode.episodeId}`}
            className="block p-3 bg-[#161616] rounded-md text-center text-sm font-medium hover:bg-pink-500 hover:text-white transition-colors"
          >
            {episode.title}
          </Link>
        ))}
      </div>
    </div>
  );
}