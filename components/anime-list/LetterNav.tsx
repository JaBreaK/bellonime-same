'use client';

import { useEffect, useState } from 'react';

interface LetterNavProps {
  letters: string[];
}

export default function LetterNav({ letters }: LetterNavProps) {
  const [active, setActive] = useState<string>(letters[0]);

  useEffect(() => {
    const sections = letters
      .map((ltr) => document.getElementById(ltr))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -70% 0px', // trigger ketika top 30% viewport
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [letters]);

  return (
    <nav className="sticky top-0 md:top-16 z-20 bg-white/5 dark:bg-black/80 border border-white/10 dark:border-white rounded-xl p-4 md:p-6 backdrop-blur-xl shadow-lg mb-10">
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#${letter}`}
            className={`
              px-2.5 py-1 text-sm font-bold rounded-md transition-all
              ${active === letter
                ? 'bg-pink-500 text-white'
                : 'text-gray-300 hover:text-white hover:bg-pink-500'}
            `}
          >
            {letter}
          </a>
        ))}
      </div>
    </nav>
  );
}
