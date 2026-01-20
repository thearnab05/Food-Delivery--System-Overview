"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  House,
  ShoppingCart,
  Pizza,
  UtensilsCrossed,
  Coffee,
  Search,
  LogIn,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import { useCart } from "../../components/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import ShoppingCartComponent from "../../components/ShoppingCart";
import LiveSearch from "../../components/LiveSearch";
import ThemeToggle from "../../components/ThemeToggle";

function HeaderWithCart({ isAuthenticated: propIsAuthenticated, onAuthRequired }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated: authIsAuthenticated } = useAuth();
  const router = useRouter();
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Use local auth state after mounting, fallback to prop
  const isAuthenticated = mounted ? authIsAuthenticated : false;

  const handleCartClick = () => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }
    setIsCartOpen(true);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    window.location.href = '/';
  };

  const handleMenuItemClick = (path) => {
    setIsUserMenuOpen(false);
    router.push(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-8">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <UtensilsCrossed className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 dark:text-orange-500" />
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300 hidden xs:block">Take It Cheesy</span>
              <span className="text-lg font-bold text-gray-800 dark:text-white xs:hidden">TIC</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              <a href="/#home" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-sm">
                <House className="w-4 h-4" />
                <span>Home</span>
              </a>
              <a href="/#about" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-sm">
                <LayoutDashboard className="w-4 h-4" />
                <span>About</span>
              </a>
              <a href="/#menu" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-sm">
                <Pizza className="w-4 h-4" />
                <span>Menu</span>
              </a>
              <a href="/#contact" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-sm">
                <Coffee className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </nav>
          </div>

          {/* Search and Cart */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden mobile-menu-button text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 p-2"
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 p-2"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCartClick}
                  className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 relative p-2"
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-orange-500 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Button>

                {/* Custom User Menu Dropdown */}
                <div className="relative hidden sm:block" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="font-medium text-sm hidden md:block">{user?.name || user?.username || 'User'}</span>
                    <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-3 sm:px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">My Account</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || ''}</p>
                      </div>

                      <button
                        onClick={() => handleMenuItemClick('/profile')}
                        className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>

                      <button
                        onClick={() => handleMenuItemClick('/orders')}
                        className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Orders</span>
                      </button>

                      <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile User Icon */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMenuItemClick('/profile')}
                  className="sm:hidden text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 p-2"
                >
                  <User className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAuthRequired}
                className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-1 sm:space-x-2 text-sm p-2"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            )}

            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden absolute left-0 right-0 top-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700 shadow-lg animate-in slide-in-from-top-2 duration-200"
          >
            <nav className="container mx-auto px-4 py-4 space-y-2">
              <a
                href="/#home"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <House className="w-5 h-5" />
                <span>Home</span>
              </a>
              <a
                href="/#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>About</span>
              </a>
              <a
                href="/#menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Pizza className="w-5 h-5" />
                <span>Menu</span>
              </a>
              <a
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Coffee className="w-5 h-5" />
                <span>Contact</span>
              </a>

              {isAuthenticated && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                    <button
                      onClick={() => { handleMenuItemClick('/profile'); setIsMobileMenuOpen(false); }}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => { handleMenuItemClick('/orders'); setIsMobileMenuOpen(false); }}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Orders</span>
                    </button>
                    <button
                      onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Cart Modal */}
      <ShoppingCartComponent
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Search Modal */}
      <LiveSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        isAuthenticated={isAuthenticated}
        onAuthRequired={onAuthRequired}
      />
    </header>
  );
}

export default HeaderWithCart;