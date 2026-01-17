"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const ThemeContext = createContext(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    // If user has a saved preference, honor it
    if (savedTheme) {
      if (savedTheme === 'dark') {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Logic: Home page ('/') defaults to Light, others default to Dark
      const shouldBeDark = pathname !== '/';

      if (shouldBeDark) {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
      }
    }

    // Mark as mounted after theme is initialized
    setMounted(true);

    // Listen for system theme changes ONLY if no preference is saved (optional, keeping previous logic structure)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        // If system changes, we might want to respect it, OR respect our route rule.
        // For now, let's keep the route rule dominant if no user pref.
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []); // Run once on mount (logic relies on initial pathname)

  // Toggle theme function with smooth transition
  const toggleTheme = () => {
    setIsTransitioning(true);

    const newTheme = !isDark;
    setIsDark(newTheme);

    // Add transition class for smooth animation
    document.documentElement.style.setProperty('--theme-transition-duration', '300ms');
    document.documentElement.classList.add('theme-transitioning');

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    // Remove transition class after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
      document.documentElement.classList.remove('theme-transitioning');
    }, 300);
  };

  // Set specific theme with smooth transition
  const setTheme = (theme) => {
    setIsTransitioning(true);

    document.documentElement.style.setProperty('--theme-transition-duration', '300ms');
    document.documentElement.classList.add('theme-transitioning');

    if (theme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    setTimeout(() => {
      setIsTransitioning(false);
      document.documentElement.classList.remove('theme-transitioning');
    }, 300);
  };

  // Always provide the context value, but include mounted flag
  const value = {
    isDark,
    isTransitioning,
    toggleTheme,
    setTheme,
    mounted
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 