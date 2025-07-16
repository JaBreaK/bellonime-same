'use client';

import { motion } from 'framer-motion';
import { Film, Flame, Layers } from 'lucide-react';
import Link from 'next/link';

const icons = {
  recent: <Flame className="w-5 h-5 text-pink-500" />,
  movie: <Film className="w-5 h-5 text-pink-500" />,
  batch: <Layers className="w-5 h-5 text-pink-500" />,
};

type SectionProps = {
  title: string;
  href: string;
  icon?: keyof typeof icons;
  children: React.ReactNode;
  className?: string;
};

export function Section({ title, href, icon = 'recent', children, className = '' }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-6 shadow-sm ${className}`}
    >
      <div className="sticky top-0 z-10 bg-inherit pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icons[icon]}
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
          </div>
          <Link
            href={href}
            className="text-sm font-medium px-3 py-1.5 rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300 hover:bg-pink-200/80 dark:hover:bg-pink-800/50 transition-colors"
          >
            Lihat Semua
          </Link>
        </div>
      </div>
      {children}
    </motion.section>
  );
}
