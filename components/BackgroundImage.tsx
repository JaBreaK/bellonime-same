'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function BackgroundImage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const backgroundUrl = currentTheme === 'dark' ? '/bg1.webp' : '/bg1.webp';

  return (
    <div
      className="fixed inset-0 -z-10 bg-cover bg-center before:absolute before:inset-0 before:bg-black/40 will-change-transform transform-gpu"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
      }}
    />
  );
}
