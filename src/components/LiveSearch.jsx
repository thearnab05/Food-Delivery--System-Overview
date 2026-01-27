"use client";

import { useState, useEffect, useCallback } from 'react';
import { Search, Clock, DollarSign, Star, Filter, X, Loader2 } from 'lucide-react';
import { useCart } from './CartContext';
import { fetchAllFoodItems, allFoodItems } from './all-food-items.js';

const LiveSearch = ({ isOpen, onClose, isAuthenticated, onAuthRequired }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [allDishes, setAllDishes] = useState([]);
  const { addToCart } = useCart();

  // Fetch food data on component mount
  useEffect(() => {
    const loadFoodData = async () => {
      try {
        const dishes = await fetchAllFoodItems();
        setAllDishes(dishes);
      } catch (error) {
        console.error('Error loading food data for search:', error);
        // Fallback to static data
        setAllDishes(allFoodItems);
      }
    };

    if (isOpen) {
      loadFoodData();
    }
  }, [isOpen]);

  // Suggested filters
  const suggestedFilters = [
    { id: 'under20', label: 'Under ₹500', icon: DollarSign, color: 'text-green-600' },
    { id: 'quick', label: 'Quick Meals', icon: Clock, color: 'text-blue-600' },
    { id: 'vegetarian', label: 'Vegetarian', icon: Filter, color: 'text-green-600' },
    { id: 'highRating', label: '4.5+ Rating', icon: Star, color: 'text-yellow-600' },
    { id: 'indian', label: 'Indian Cuisine', icon: Filter, color: 'text-orange-600' },
    { id: 'healthy', label: 'Healthy', icon: Filter, color: 'text-green-600' }
  ];

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (!query.trim()) {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      // Simulate API delay
      setTimeout(() => {
        const filtered = allDishes.filter(dish => {
          const matchesQuery = dish.name.toLowerCase().includes(query.toLowerCase()) ||
            dish.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
            dish.category.toLowerCase().includes(query.toLowerCase());

          const matchesFilters = filters.length === 0 || filters.every(filter => {
            switch (filter) {
              case 'under20':
                return dish.price < 20;
              case 'quick':
                return parseInt(dish.cookTime) <= 30;
              case 'vegetarian':
                return dish.tags.includes('Vegetarian');
              case 'highRating':
                return dish.rating >= 4.5;
              case 'indian':
                return dish.category === 'indian';
              case 'healthy':
                return dish.tags.includes('Healthy');
              default:
                return true;
            }
          });

          return matchesQuery && matchesFilters;
        });

        setSuggestions(filtered.slice(0, 8)); // Limit to 8 suggestions
        setIsLoading(false);
      }, 300);
    }, 300),
    [filters]
  );

  // Debounce utility function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSelectedIndex(-1);

    if (query.trim()) {
      debouncedSearch(query);
    } else {
      setSuggestions([]);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (dish) => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }
    addToCart(dish);
    setSearchQuery('');
    setSuggestions([]);
    onClose();
  };

  // Handle filter toggle
  const toggleFilter = (filterId) => {
    setFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  // Close search on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Search Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Search Dishes</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Search for dishes, cuisines, or ingredients..."
              className="w-full pl-12 pr-12 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Suggested Filters */}
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Filters:</h3>
            <div className="flex flex-wrap gap-2">
              {suggestedFilters.map((filter) => {
                const Icon = filter.icon;
                const isActive = filters.includes(filter.id);
                return (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
              <span className="ml-2 text-gray-600">Searching...</span>
            </div>
          )}

          {!isLoading && suggestions.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Found {suggestions.length} dishes
              </h3>
              <div className="space-y-2">
                {suggestions.map((dish, index) => (
                  <div
                    key={dish.id}
                    onClick={() => handleSuggestionClick(dish)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${index === selectedIndex
                        ? 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 border border-transparent'
                      }`}
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">{dish.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {dish.cookTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current text-yellow-400" />
                          {dish.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          ₹{dish.price}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {dish.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isAuthenticated) {
                          onAuthRequired();
                          return;
                        }
                        addToCart(dish);
                      }}
                      className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isLoading && searchQuery && suggestions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <Search className="w-12 h-12 mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No dishes found</h3>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}

          {!searchQuery && !isLoading && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <Search className="w-12 h-12 mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">Start searching</h3>
              <p className="text-sm">Search for your favorite dishes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveSearch; 