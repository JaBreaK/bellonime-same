'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import {
  Home,
  Sun,
  Moon,
  List,
  Film,
  CalendarDays,
  ChevronRight,
  ChevronLeft,
  Tags,
} from 'lucide-react';
import { useTheme } from 'next-themes';

// Variants for container width/glow
const containerVariants = {
  collapsed: { width: 40 },
  expanded: { width: 'auto' },
};
const itemVariants = {
  hover: {},
  tap: { scale: 0.9 },
};

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!mounted) return null;
  const isDark = theme === 'dark';

  const mainNav = [
    { href: '/', icon: <Home size={18} />, label: 'Home' },
    { href: '/jadwal', icon: <CalendarDays size={18} />, label: 'Jadwal' },
    { href: '/movies', icon: <Film size={18} />, label: 'Movies' },

  ];
  const extraNav = [
    { href: '/genres', icon: <Tags size={18} />, label: 'Genres' },
        { href: '/anime', icon: <List size={18} />, label: 'Anime' },
  ];

  const renderItem = (item: { href: string; icon: React.ReactNode; label: string; badge?: number }) => {
    const active = pathname === item.href;
    return (
      <motion.div
        key={item.href}
        initial="collapsed"
        animate={active ? 'expanded' : 'collapsed'}
        whileHover="expanded"
        variants={containerVariants}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`relative flex items-center h-10 mx-1 group overflow-hidden rounded-lg transition-colors duration-200 
          ${active ? 'bg-pink-500 text-white px-3' : 'bg-transparent text-gray-400'}
          ${!active && 'group-hover:bg-gray-700 group-hover:text-gray-100 group-hover:px-3'}`}
        onClick={() => isMobile && setShowMenu(false)}
      >
        <Link href={item.href} className="relative z-10 flex items-center">
          {item.icon}
          <span
            className={`ml-2 whitespace-nowrap overflow-hidden 
              ${active ? 'block' : 'hidden group-hover:block'}`}
          >
            {item.label}
          </span>
        </Link>
        {item.badge && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 rounded-full z-10"
          >
            {item.badge > 9 ? '9+' : item.badge}
          </motion.span>
        )}
      </motion.div>
    );
  };

  // Mobile Bottom Bar
  if (isMobile) {
    return (
      <motion.footer
        initial={{ y: 100 }}
        animate={{ y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
      >
        <LayoutGroup>
          <motion.div
            className="flex items-center bg-[#161616] px-4 py-1 rounded-full shadow-lg"
            initial=""
            animate=""
          >
            {mainNav.map(renderItem)}
            <motion.button
              onClick={() => setShowMenu(!showMenu)}
              variants={itemVariants}
              whileHover="hover"
              className="w-10 h-10 mx-1 flex items-center justify-center text-gray-400"
            >
              {showMenu ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </motion.button>
            <motion.button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              variants={itemVariants}
              whileHover="hover"
              className="hidden w-10 h-10 mx-1 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1, transition: { type: 'spring', stiffness: 300 } }}
                  exit={{ width: 0, opacity: 0 }}
                  className="flex"
                >
                  {extraNav.map(renderItem)}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </motion.footer>
    );
  }

  // Desktop Top Bar
  return (
    <LayoutGroup>
      <motion.nav
        variants={{}}
        initial={false}
        animate="visible"
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center bg-[#161616] px-4 py-1 rounded-full shadow-lg"
      >
        {mainNav.map(renderItem)}
        <motion.button
          onClick={() => setShowMenu(!showMenu)}
          variants={itemVariants}
          whileHover="hover"
          className="w-10 h-10 mx-1 flex items-center justify-center text-gray-400"
        >
          {showMenu ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </motion.button>
        <motion.button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          variants={itemVariants}
          whileHover="hover"
          className="hidden w-10 h-10 mx-1 flex items-center justify-center text-white bg-gray-200 dark:bg-gray-700 rounded-lg"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </motion.button>
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1, transition: { type: 'spring', stiffness: 300 } }}
              exit={{ width: 0, opacity: 0 }}
              className="flex space-x-2 overflow-hidden"
            >
              {extraNav.map(renderItem)}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </LayoutGroup>
  );
}
