'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function SectionWrapper({
  children,
  isLoaded,
}: {
  children: React.ReactNode;
  isLoaded: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isLoaded ? 'loaded' : 'loading'}
        
      >
        <section className="bg-white/5 dark:bg-black/40 border border-white/10 dark:border-black/20 rounded-xl p-4 md:p-6 backdrop-blur-xl shadow-lg">
        {children}
        </section>
      </motion.div>
    </AnimatePresence>
  );
}
