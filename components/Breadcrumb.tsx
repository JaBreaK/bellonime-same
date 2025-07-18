'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion'; // <-- Impor
import { ChevronRight } from 'lucide-react';

type BreadcrumbProps = {
  dynamicRoutes?: Record<string, string>;
};

export default function Breadcrumb({ dynamicRoutes = {} }: BreadcrumbProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);

  const formatLabel = (segment: string) => {
    return dynamicRoutes[segment] || segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="container mx-auto mb-2 bg-white/10 dark:bg-[#161616]/60 border border-white/20 dark:border-white/30 rounded-xl p-3 backdrop-blur-md shadow-sm"
    >
      <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <li>
          {pathSegments.length === 0 ? (
            <span className="font-medium text-gray-700 dark:text-gray-200">Home</span>
          ) : (
            <Link href="/" className="hover:text-pink-500">
              Home
            </Link>
          )}
        </li>
        
        {/* --- Bagian Animasi --- */}
        <AnimatePresence>
          {pathSegments.map((segment, index) => {
            const href = '/' + pathSegments.slice(0, index + 1).join('/');
            const isLast = index === pathSegments.length - 1;

            return (
              <motion.li
                key={href}
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }} // Animasi masuk: dari kiri & transparan
                animate={{ opacity: 1, x: 0 }}   // Kondisi normal
                exit={{ opacity: 0, x: 10 }}    // Animasi keluar: ke kanan & transparan
                transition={{ duration: 0.3 }}
              >
                <ChevronRight size={16} className="mx-2" />
                {isLast ? (
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    {formatLabel(segment)}
                  </span>
                ) : (
                  <Link href={href} className="hover:text-pink-500">
                    {formatLabel(segment)}
                  </Link>
                )}
              </motion.li>
            );
          })}
        </AnimatePresence>
        {/* -------------------- */}
      </ol>
    </nav>
  );
}