'use client';

import { ThemeProvider } from 'next-themes';
import { type ReactNode, useState, useEffect } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Mencegah hydration mismatch dengan memastikan komponen ini
  // hanya dirender di sisi klien setelah 'mounted'.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}