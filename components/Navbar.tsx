'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Clapperboard,
  Library,
  Sparkles,
  Bell,
  Star,
  Sun,
  Moon,
  ChevronRight,
  ChevronLeft,
  
} from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastScrollY && currentY > 50);
      setLastScrollY(currentY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (!mounted) return <div />;

  const isDark = theme === 'dark';

  const mainNavItems = [
    { href: '/', label: 'Home', icon: <Home size={20} /> },
    { href: '/ongoing', label: 'Ongoing', icon: <Clapperboard size={20} /> },
    { href: '/completed', label: 'Completed', icon: <Library size={20} /> },
    { href: '/popular', label: 'Popular', icon: <Sparkles size={20} /> },
  ];

  const otherNavItems = [
    
    { href: '/favorites', label: 'Favorites', icon: <Star size={20} /> },
    { href: '/notifications', label: 'Notifs', icon: <Bell size={20} />, badge: 9 },
  ];

  type NavItem = {
    href: string;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  };

  const renderItem = (item: NavItem, isActive: boolean, compact = false) => (
    <Link
      key={item.href}
      href={item.href}
      className={`relative ${compact ? 'w-14 h-14' : 'w-12 h-12'} flex flex-col items-center justify-center text-xs rounded-xl`}
      onClick={() => setShowModal(false)}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence>
          {isActive && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-pink-500 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
        <motion.div
          whileTap={{ scale: 0.85 }}
          className={`z-10 flex flex-col items-center transition-colors duration-300 ${
            isActive ? 'text-white' : 'text-gray-400'
          }`}
        >
          <div className="relative">
            {item.icon}
            {item.badge && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold z-20">
                {item.badge > 9 ? '9+' : item.badge}
              </span>
            )}
          </div>
          {!compact && <span className="text-[10px] mt-1">{item.label}</span>}
        </motion.div>
      </div>
    </Link>
  );

if (isMobile) {
    return (
        <motion.footer
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: hidden ? 100 : 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
        >
            <motion.div
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="flex items-center bg-[#161616] px-3 py-2 rounded-full shadow-lg shadow-pink-500/20 backdrop-blur-lg border border-white/10 space-x-2"
            >
                {mainNavItems.map((item) => renderItem(item, pathname === item.href, true))}

                <button
                    onClick={() => setShowModal(!showModal)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        showModal ? 'text-pink-400' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: showModal ? 180 : 0 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        {showModal ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </motion.div>
                </button>
                <button
                                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                                className="bg-gray-100 dark:bg-gray-800 rounded-full p-2 shadow-inner  transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-yellow-400" />}
                            </button>

                <AnimatePresence>
                    {showModal && (
                        <motion.div
                            key="horizontal-menu-mobile"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex space-x-2 overflow-hidden"
                        >
                            {otherNavItems.map((item) => renderItem(item, pathname === item.href, false))}
                            
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.footer>
    );
}


  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`flex items-center px-6 py-2 bg-[#161616]/80 border border-white/10 backdrop-blur-md shadow-lg shadow-pink-500/10 space-x-4 rounded-full ${
          showModal ? 'w-auto max-w-5xl' : hidden ? 'w-[160px]' : 'max-w-xl'
        }`}
      >
        {mainNavItems.map((item) => renderItem(item, pathname === item.href, true))}


        {/* Tombol panah kanan/kiri */}
        <button
          onClick={() => setShowModal(!showModal)}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            showModal ? 'text-pink-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: showModal ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {showModal ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </motion.div>
        </button>
                <div className="hidden md:flex ml-auto">
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="bg-gray-100 dark:bg-gray-800 rounded-full p-2 shadow-inner transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-yellow-400" />}
          </button>
        </div>

        {/* Menu samping yang muncul horizontal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              key="horizontal-menu"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              className="flex space-x-4 overflow-hidden"
            >
              {otherNavItems.map((item) => renderItem(item, pathname === item.href, false))}
            </motion.div>
          )}
        </AnimatePresence>

        
      </motion.div>
    </motion.header>
  );
}