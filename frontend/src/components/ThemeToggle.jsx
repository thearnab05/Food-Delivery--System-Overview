"use client";

import { Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useEffect } from 'react';

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme, isTransitioning } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className={`relative p-3 rounded-2xl transition-all duration-300 shadow-xl backdrop-blur-sm bg-gray-200 ${className}`}
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      disabled={isTransitioning}
      className={`group relative p-3 rounded-2xl transition-all duration-500 hover:scale-110 shadow-xl backdrop-blur-sm overflow-hidden ${
        isDark
          ? 'bg-gradient-to-br from-slate-800/95 via-gray-900/95 to-slate-800/95 hover:from-slate-700/95 hover:via-gray-800/95 hover:to-slate-700/95 text-yellow-400 shadow-slate-900/60 border border-slate-700/50'
          : 'bg-gradient-to-br from-amber-50/95 via-orange-50/95 to-yellow-50/95 hover:from-amber-100/95 hover:via-orange-100/95 hover:to-yellow-100/95 text-amber-700 border border-amber-300/50 shadow-amber-200/40'
      } ${isTransitioning ? 'opacity-75 scale-95' : ''} ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {isDark ? (
          // Stars for dark mode
          <>
            <div className="absolute top-1 left-2 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-2 right-3 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse opacity-40" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-1 left-3 w-0.5 h-0.5 bg-indigo-400 rounded-full animate-pulse opacity-50" style={{animationDelay: '1s'}}></div>
          </>
        ) : (
          // Sun rays for light mode
          <>
            <div className="absolute top-1 left-1 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-30"></div>
            <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-orange-400 rounded-full animate-ping opacity-40" style={{animationDelay: '0.3s'}}></div>
            <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-amber-400 rounded-full animate-ping opacity-50" style={{animationDelay: '0.6s'}}></div>
          </>
        )}
      </div>

      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <Sun
          className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
            isDark
              ? 'opacity-0 rotate-180 scale-0 drop-shadow-none'
              : 'opacity-100 rotate-0 scale-100 drop-shadow-lg fill-current'
          }`}
        />

        {/* Moon Icon */}
        <Moon
          className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
            isDark
              ? 'opacity-100 rotate-0 scale-100 drop-shadow-lg'
              : 'opacity-0 -rotate-180 scale-0 drop-shadow-none'
          }`}
        />

        {/* Sparkles effect for dark mode */}
        {isDark && (
          <Sparkles
            className="absolute -top-1 -right-1 w-3 h-3 text-purple-400 animate-pulse opacity-70"
            style={{animationDelay: '0.2s'}}
          />
        )}
      </div>

      {/* Hover glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
          isDark
            ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100'
            : 'bg-gradient-to-br from-yellow-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100'
        }`}
      ></div>
    </button>
  );
};

export default ThemeToggle; 