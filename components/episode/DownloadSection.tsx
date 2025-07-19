'use client';

import { useState, useEffect, useMemo,useRef } from 'react';
import type { DownloadFormat } from '@/types/anime';
import { Download, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DownloadSection({ formats = [] }: { formats?: DownloadFormat[] }) {


  // Kumpulkan semua kualitas unik sebagai tab
  const allQualities = useMemo(
    () => Array.from(new Set(formats.flatMap(f => f.qualities.map(q => q.title.trim())))),
    [formats]
  );
  const [activeTab, setActiveTab] = useState(allQualities[0] || '');

  
  const bottomRef = useRef<HTMLDivElement>(null);
  const [didClickTab, setDidClickTab] = useState(false);



  // Filter link berdasarkan tab kualitas yang aktif
  const downloadLinks = useMemo(() => 
    formats.flatMap(format => 
      format.qualities
        .filter(q => q.title.trim() === activeTab)
        .flatMap(q => q.urls.map(url => ({
          ...url,
          format: format.title,
          quality: q.title
        })))
    ),
    [activeTab, formats]
  );
 useEffect(() => {
  if (!didClickTab) return;

  const timeout = setTimeout(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
    setDidClickTab(false); // reset supaya gak scroll lagi
  }, 200);

  return () => clearTimeout(timeout);
}, [activeTab, didClickTab]);

  if (!formats || formats.length === 0) {
    return null;
  }



  return (
    <section className="bg-gradient-to-br from-gray-800/20 to-gray-900/20 dark:from-black/20 dark:to-gray-900/30 p-4 rounded-xl border border-white/20 shadow-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h3 className="flex items-center gap-2 text-lg font-bold">
          <Download size={20} />
          Link Download
        </h3>
        {/* Tab Pilihan Kualitas */}
        <div className="flex items-center bg-gray-700/50 p-1 rounded-lg flex-wrap">
          {allQualities.map(quality => (
            <button
              key={quality}
              onClick={() => {
  setActiveTab(quality);
  setDidClickTab(true);
}}

              className={`relative px-3 py-1 text-xs font-semibold transition-colors rounded-md ${
                activeTab === quality ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {activeTab === quality && (
                <motion.div
                  layoutId="download-quality-highlight"
                  className="absolute inset-0 bg-pink-500 rounded-md"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{quality}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Daftar Link dalam Grid */}
      <motion.div 
  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
  initial={false} // supaya gak animasi ulang tiap tab
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>

        {downloadLinks.map(link => (
          <a
            key={link.title + link.format}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center gap-2 p-3 bg-gray-800/50 rounded-lg text-gray-300 hover:bg-pink-500 hover:text-white text-center transition-all duration-300 transform hover:-translate-y-1"
          >
            <LinkIcon size={24} className="transition-transform group-hover:scale-110" />
            <div className="text-xs font-bold leading-tight">
              <p>{link.title}</p>
              <p className="text-gray-400 group-hover:text-pink-100">{link.format}</p>
            </div>
          </a>
        ))}
        
      </motion.div>
      <div ref={bottomRef} className="h-1" /> {/* ini penanda akhir */}
    </section>
    
  );
}