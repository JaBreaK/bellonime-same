'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { EpisodeInfo } from '@/types/anime';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EpisodeListMobile({ episodes }: { episodes: EpisodeInfo[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [ascending, setAscending] = useState(true);
  const pathname = usePathname();
  const activeId = pathname?.split('/').pop();

  // Memoize sorted list based on ascending flag
  const sortedEpisodes = useMemo(() => {
    return [...episodes].sort((a, b) => {
      const getNum = (ep: EpisodeInfo) => {
        const titleStr = typeof ep.title === 'string' ? ep.title : String(ep.title);
        const match = titleStr.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      };
      return ascending ? getNum(a) - getNum(b) : getNum(b) - getNum(a);
    });
  }, [episodes, ascending]);

  return (
    <div className="lg:hidden bg-white/5 dark:bg-black/20 p-4 dark:border-white/20 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        {/* Toggle collapse */}
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="flex items-center text-lg font-semibold"
        >
          <span>Daftar Episode ({episodes.length})</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="ml-2">
            <ChevronDown />
          </motion.div>
        </button>
        {/* Toggle sort order */}
        <button
          onClick={() => setAscending(prev => !prev)}
          className="flex items-center text-sm font-medium"
        >
          <span>{ascending ? 'Terbaru' : 'Terlama'}</span>
          <motion.div animate={{ rotate: ascending ? 0 : 180 }} className="ml-1">
            {ascending ? <ChevronUp /> : <ChevronDown />}
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-4">
              {sortedEpisodes.map(ep => {
                const isActive = String(ep.episodeId) === activeId;
                return (
                  <Link
                    key={ep.episodeId}
                    href={`/episode/${ep.episodeId}`}
                    className={
                      `block w-full text-center p-2 text-sm rounded-md transition-colors ` +
                      (isActive
                        ? 'bg-pink-500 text-white border-2 border-pink-600'
                        : 'bg-gray-700/50 hover:bg-pink-500')
                    }
                  >
                    {String(ep.title).replace(/Episode /i, '')}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
