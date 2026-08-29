'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { clsx } from 'clsx';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-slate-800 animate-pulse" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={clsx(
        'relative w-16 h-8 rounded-full transition-colors duration-300',
        'focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2 focus:ring-offset-background-dark',
        isDark ? 'bg-slate-700' : 'bg-primary-gold'
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
    >
      <span
        className={clsx(
          'absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center',
          isDark ? 'translate-x-8' : 'translate-x-0'
        )}
      >
        {isDark ? (
          <FaMoon className="w-3 h-3 text-slate-700" aria-hidden="true" />
        ) : (
          <FaSun className="w-3 h-3 text-primary-gold" aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
