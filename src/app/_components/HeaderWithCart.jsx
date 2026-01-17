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
  const [mounted, setMounted] = useState(false);
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated: authIsAuthenticated } = useAuth();
  const router = useRouter();
  const userMenuRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
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
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <UtensilsCrossed className="w-8 h-8 text-orange-600 dark:text-orange-500" />
              <span className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300">Take It Cheesy</span>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <a href="/#home" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                <House className="w-4 h-4" />
                <span>Home</span>
              </a>
              <a href="/#about" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                <LayoutDashboard className="w-4 h-4" />
                <span>About</span>
              </a>
              <a href="/#menu" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                <Pizza className="w-4 h-4" />
                <span>Menu</span>
              </a>
              <a href="/#contact" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                <Coffee className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </nav>
          </div>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Search className="w-5 h-5" />
            </Button>

            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCartClick}
                  className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Button>

                {/* Custom User Menu Dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="font-medium">{user?.name || user?.username || 'User'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">My Account</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || ''}</p>
                      </div>

                      <button
                        onClick={() => handleMenuItemClick('/profile')}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>

                      <button
                        onClick={() => handleMenuItemClick('/orders')}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Orders</span>
                      </button>

                      <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAuthRequired}
                className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Button>
            )}

            <ThemeToggle />
          </div>
        </div>
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