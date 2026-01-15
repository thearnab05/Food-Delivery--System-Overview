"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LiveSearch from "../../components/LiveSearch";
import ThemeToggle from "../../components/ThemeToggle";

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  return (
    <header className="sticky top-0 z-50 w-full border-b shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://media.istockphoto.com/id/1435983029/vector/food-delivery-logo-images.jpg?s=612x612&w=0&k=20&c=HXPxcjOxUiW4pMW1u9E0k2dJYQOU37a_0qZAy3so8fY="
                alt="FoodDelivery Logo"
                className="h-12 w-12 rounded-xl object-cover shadow-lg transform hover:scale-105 transition-transform duration-200"
              />
              <span className="text-2xl font-bold text-gray-800 dark:text-white drop-shadow-sm transition-colors duration-300">
                FoodDelivery
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/main"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              <House className="h-4 w-4" />
              <span>Home</span>
            </a>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <a
                  href="#"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-800 transition-all duration-300 cursor-pointer transform hover:scale-105"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Categories</span>
                </a>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-white/95 backdrop-blur-sm border-orange-200 shadow-xl animate-in fade-in-0 zoom-in-95">
                <DropdownMenuLabel className="text-orange-600 font-semibold">
                  Food Categories
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="flex items-center space-x-3 hover:bg-orange-50 cursor-pointer transition-all duration-200">
                  <Pizza className="h-4 w-4 text-orange-600" />
                  <span>Pizza & Italian</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center space-x-3 hover:bg-orange-50 cursor-pointer transition-all duration-200">
                  <UtensilsCrossed className="h-4 w-4 text-orange-600" />
                  <span>Fast Food</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center space-x-3 hover:bg-orange-50 cursor-pointer transition-all duration-200">
                  <Coffee className="h-4 w-4 text-orange-600" />
                  <span>Beverages</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center space-x-3 hover:bg-orange-50 cursor-pointer transition-all duration-200">
                  <IceCream className="h-4 w-4 text-orange-600" />
                  <span>Desserts</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="flex items-center space-x-3 hover:bg-orange-50 cursor-pointer transition-all duration-200">
                  <Salad className="h-4 w-4 text-green-600" />
                  <span>Healthy & Salads</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center space-x-3 hover:bg-orange-50 cursor-pointer transition-all duration-200">
                  <Beef className="h-4 w-4 text-red-600" />
                  <span>Burgers & Meat</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center space-x-3 hover:bg-orange-50 cursor-pointer transition-all duration-200">
                  <Fish className="h-4 w-4 text-blue-600" />
                  <span>Seafood</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center space-x-3 hover:bg-orange-50 cursor-pointer transition-all duration-200">
                  <Apple className="h-4 w-4 text-green-600" />
                  <span>Fruits & Vegetables</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-6 hidden lg:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full pl-10 pr-4 py-2.5 border border-white/30 bg-white/90 backdrop-blur-sm rounded-xl text-sm text-left text-gray-500 hover:bg-white/95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent shadow-lg"
              >
                Search for restaurants, dishes...
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            {/* Theme Toggle */}
            <ThemeToggle className="hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-white transition-all duration-200" />

            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transform hover:scale-110 transition-all duration-200"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transform hover:scale-110 transition-all duration-200"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-medium shadow-lg animate-bounce">
                {cartItems}
              </span>
            </Button>

            {/* Login/Signup Button */}
            <a href="/login">
              {" "}
              <Button className="hidden sm:inline-flex bg-orange-600 hover:bg-orange-700 text-white border-none shadow-lg transform hover:scale-105 transition-all duration-200">
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Login / Signup
              </Button>{" "}
            </a>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-white/20 text-white transform hover:scale-110 transition-all duration-200"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Shopping Cart Modal - Only show on main page */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Shopping Cart</h3>
            <p className="text-gray-600">Cart functionality is available on the main food page.</p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Live Search Modal */}
      <LiveSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}

export default Header;
