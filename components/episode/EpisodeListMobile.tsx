'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { EpisodeInfo } from '@/types/anime';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EpisodeListMobile({ episodes }: { episodes: EpisodeInfo[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden bg-white/5 dark:bg-black/20 p-4 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-lg font-semibold"
      >
        <span>Daftar Episode ({episodes.length})</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-4">
              {episodes.map(ep => (
                <Link
                  key={ep.episodeId}
                  href={`/episode/${ep.episodeId}`}
                  className="block w-full text-center p-2 text-sm rounded-md bg-gray-700/50 hover:bg-pink-500"
                >
                  {String(ep.title).replace(/Episode /i, '')}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}