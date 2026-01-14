"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  House,
  ShoppingCart,
  Pizza,
  UtensilsCrossed,
  Coffee,
  IceCream,
  Salad,
  Beef,
  Fish,
  Apple,
  Search,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "../../components/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import ShoppingCartComponent from "../../components/ShoppingCart";
import LiveSearch from "../../components/LiveSearch";
import ThemeToggle from "../../components/ThemeToggle";

function HeaderWithCart({ isAuthenticated, onAuthRequired }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleCartClick = () => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }
    setIsCartOpen(true);
  };

  const handleLogout = () => {
    logout();
    // Redirect to home page after logout
    window.location.href = '/';
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

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>{user?.username || 'User'}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/profile')}>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/orders')}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Orders
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 focus:text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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