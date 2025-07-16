import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 👇 ini penting biar gak jalan sebelum client siap
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // ⛔ jangan render apapun dulu

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="bg-gray-100 dark:bg-gray-800 rounded-full p-2 shadow-inner transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-yellow-400" />
      )}
    </button>
  );
}
