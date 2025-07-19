'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { EpisodeInfo } from '@/types/anime';
import { ListVideo, ArrowDownUp } from 'lucide-react';

export default function EpisodeSidebar({ episodes }: { episodes: EpisodeInfo[] }) {
  const pathname = usePathname();
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const sortedEpisodes = useMemo(() => {
    const episodesCopy = [...episodes];
    if (sortOrder === 'asc') {
      return episodesCopy.reverse();
    }
    return episodesCopy;
  }, [episodes, sortOrder]);

  return (
    <aside className="hidden lg:block space-y-4">
      <div className="p-4 bg-white/5 dark:bg-black/20 rounded-lg border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="flex items-center gap-2 text-xl font-bold">
            <ListVideo size={24} />
            Daftar Episode
          </h3>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 text-gray-300 text-xs rounded-full hover:bg-pink-500 hover:text-white transition-colors"
          >
            <ArrowDownUp size={14} />
            <span>{sortOrder === 'asc' ? 'Terbaru' : 'Terlama'}</span>
          </button>
        </div>
        
        {/* --- BAGIAN YANG DIUBAH --- */}
        <div className="max-h-[500px] overflow-y-auto pr-2 grid grid-cols-4 gap-2">
          {sortedEpisodes.map(ep => {
            const isActive = pathname === `/episode/${ep.episodeId}`;
            return (
              <Link
                key={ep.episodeId}
                href={`/episode/${ep.episodeId}`}
                className={`block w-full text-center p-2 text-sm rounded-md transition-colors ${
                  isActive 
                    ? 'bg-pink-500 text-white font-semibold' 
                    // Tampilan tombol untuk grid
                    : 'bg-gray-700/50 hover:bg-gray-700'
                }`}
              >
                {/* Hanya tampilkan nomor episodenya saja agar compact */}
                {String(ep.title).replace(/Episode /i, '')}
              </Link>
            )
          })}
        </div>
        {/* --------------------------- */}
      </div>
    </aside>
  );
}