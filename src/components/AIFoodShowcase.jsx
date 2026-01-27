"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Star, Clock, Users, ChefHat, ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import { useFlyToCart } from './FlyToCartAnimation';
import { fetchAllFoodItems, getAllCategories, allFoodItems } from './all-food-items.js';

// Get static categories for initial render
const getStaticCategories = () => {
  const categories = [...new Set(allFoodItems.map(item => item.category).filter(cat => cat))];
  const iconMap = {
    'indian': '🍛', 'italian': '🍝', 'thai': '🌶️', 'asian': '🍜',
    'japanese': '🍱', 'chinese': '🥢', 'continental': '🍽️', 'french': '🥖',
    'mexican': '🌮', 'seafood': '🐟', 'dessert': '🍰', 'healthy': '🥗',
    'russian': '🥟', 'spanish': '🥘', 'moroccan': '🍲', 'middle-eastern': '🫓'
  };
  return categories
    .filter(category => category !== 'american')
    .map(category => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1),
      icon: iconMap[category] || '🍽️'
    }));
};

const AIFoodShowcase = ({ isAuthenticated, onAuthRequired }) => {
  const [currentDish, setCurrentDish] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [imageLoading, setImageLoading] = useState(true);
  // Initialize with static data to prevent hydration mismatch
  const [foodDishes, setFoodDishes] = useState(allFoodItems);
  const [categories, setCategories] = useState(getStaticCategories());
  const { addToCart, getTotalItems } = useCart();
  const { triggerFlyToCart } = useFlyToCart();

  // Fetch food items and categories on component mount (optional API refresh)
  useEffect(() => {
    const loadData = async () => {
      try {
        const [itemsData, categoriesData] = await Promise.all([
          fetchAllFoodItems(),
          getAllCategories()
        ]);
        // Only update if we got different data from API
        if (itemsData && itemsData.length > 0) {
          setFoodDishes(itemsData);
        }
        if (categoriesData && categoriesData.length > 0) {
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Error loading food data:', error);
        // Keep using static data on error
      }
    };

    loadData();
  }, []);

  // Filter dishes based on selected category
  const filteredDishes = selectedCategory === 'all'
    ? foodDishes
    : foodDishes.filter(dish => dish.category === selectedCategory);

  // Get current dish data
  const currentDishData = filteredDishes[currentDish];

  const nextDish = () => {
    setImageLoading(true);
    setCurrentDish((prev) => (prev + 1) % filteredDishes.length);
  };

  const prevDish = () => {
    setImageLoading(true);
    setCurrentDish((prev) => (prev - 1 + filteredDishes.length) % filteredDishes.length);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentDish(0); // Reset to first dish when category changes
    setImageLoading(true);
  };

  const handleAddToCart = (event) => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }
    if (!currentDishData) return;

    // Trigger fly-to-cart animation
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      triggerFlyToCart(currentDishData.image, {
        x: rect.left + rect.width / 2 - 32,
        y: rect.top - 32
      });
    }

    const success = addToCart(currentDishData);
    if (success) {
      console.log('Item added to cart successfully');
    }
  };

  if (!currentDishData) {
    return (
      <div className="min-h-screen bg-gradient-professional flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading delicious dishes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-black">
      {/* Header Section */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="relative inline-block">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-destructive to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-4 animate-pulse">
              Culinary Showcase
            </h1>
            <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-2 sm:w-4 h-2 sm:h-4 bg-primary rounded-full animate-bounce"></div>
            <div className="absolute -bottom-0.5 sm:-bottom-1 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-primary to-destructive rounded-full"></div>
          </div>
          <p className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
            <span className="font-semibold text-primary">Experience</span> the art of fine dining with our
            <span className="font-semibold text-destructive"> meticulously curated</span> collection of
            <span className="font-semibold text-pink-600"> world-renowned dishes</span>,
            <span className="hidden sm:inline"> bringing authentic global flavors directly to your table.</span>
          </p>
          <div className="flex justify-center items-center mt-3 sm:mt-6 space-x-2">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-primary rounded-full animate-ping"></div>
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-destructive rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-pink-500 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center gap-2 sm:gap-3 md:gap-4 scrollbar-hide">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`group relative flex-shrink-0 flex items-center gap-1.5 sm:gap-2 md:gap-3 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all duration-500 border-2 hover:scale-105 sm:hover:scale-110 hover:shadow-hover overflow-hidden hover-lift ${selectedCategory === 'all'
                ? 'bg-gradient-to-r from-primary via-destructive to-pink-500 text-primary-foreground border-primary shadow-hover scale-105 sm:scale-110'
                : 'bg-card/80 backdrop-blur-sm text-foreground border-border hover:bg-accent hover:border-primary/50 hover:shadow-lg'
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="text-base sm:text-lg md:text-xl animate-pulse group-hover:animate-bounce">🌟</span>
              <span className="relative z-10 tracking-wide whitespace-nowrap">All Dishes</span>
              {selectedCategory === 'all' && (
                <div className="absolute -top-1 -right-1 w-2 sm:w-3 h-2 sm:h-3 bg-primary-foreground rounded-full animate-ping"></div>
              )}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`group relative flex-shrink-0 flex items-center gap-1.5 sm:gap-2 md:gap-3 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-500 border-2 hover:scale-105 sm:hover:scale-110 hover:shadow-hover overflow-hidden hover-lift ${selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-blue-700 shadow-hover scale-105 sm:scale-110'
                  : 'bg-card/80 backdrop-blur-sm text-foreground border-border hover:bg-accent hover:border-blue-300 hover:shadow-lg'
                  }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="text-sm sm:text-base md:text-lg transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">{category.icon}</span>
                <span className="relative z-10 tracking-wide whitespace-nowrap">{category.name}</span>
                {selectedCategory === category.id && (
                  <div className="absolute -top-1 -right-1 w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-full animate-ping"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Dish Showcase */}
        <div className="max-w-6xl mx-auto">
          <div className="card-enhanced overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left: Image and Navigation */}
              <div className="relative">
                <div className="relative h-64 sm:h-80 md:h-96 lg:h-full min-h-[250px] overflow-hidden">
                  {imageLoading && (
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <div className="loading-spinner rounded-full h-8 sm:h-12 w-8 sm:w-12 border-b-2 border-primary"></div>
                    </div>
                  )}
                  <img
                    src={currentDishData.image}
                    alt={currentDishData.name}
                    className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setImageLoading(false)}
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&q=80`;
                      setImageLoading(false);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevDish}
                    className="group absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 bg-card/95 backdrop-blur-md p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl shadow-light hover:shadow-hover transition-all duration-500 hover:scale-110 sm:hover:scale-125 border border-border hover:border-primary/50 hover-lift"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-7 md:w-7 text-foreground group-hover:text-primary transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  <button
                    onClick={nextDish}
                    className="group absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 bg-card/95 backdrop-blur-md p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl shadow-light hover:shadow-hover transition-all duration-500 hover:scale-110 sm:hover:scale-125 border border-border hover:border-primary/50 hover-lift"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-7 md:w-7 text-foreground group-hover:text-primary transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>

              {/* Right: Dish Details */}
              <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  {/* Dish Header */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <span className="text-xl sm:text-2xl animate-bounce">{categories.find(c => c.id === currentDishData.category)?.icon || '🍽️'}</span>
                      <span className="text-xs sm:text-sm font-semibold text-primary-foreground bg-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-light">
                        {currentDishData.meal.charAt(0).toUpperCase() + currentDishData.meal.slice(1)}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-2 sm:mb-3 leading-tight">
                      {currentDishData.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-accent px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{currentDishData.rating}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-accent px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                        <span className="font-semibold">{currentDishData.prepTime} min</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-accent px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                        <span className="font-semibold">{currentDishData.servings} servings</span>
                      </div>
                    </div>
                  </div>

                  {/* Dish Stats */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                    <div className="bg-accent p-3 sm:p-4 rounded-lg sm:rounded-xl border border-border hover:shadow-hover transition-all duration-300 hover-lift">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                        <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        <span className="text-xs sm:text-sm font-medium text-foreground">Difficulty</span>
                      </div>
                      <span className="text-sm sm:text-base md:text-lg font-bold text-foreground">{currentDishData.difficulty}</span>
                    </div>
                    <div className="bg-accent p-3 sm:p-4 rounded-lg sm:rounded-xl border border-border hover:shadow-hover transition-all duration-300 hover-lift">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                        <span className="text-sm sm:text-lg">💰</span>
                        <span className="text-xs sm:text-sm font-medium text-foreground">Price</span>
                      </div>
                      <span className="text-sm sm:text-base md:text-lg font-bold text-foreground">₹{currentDishData.price}</span>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground mb-2 sm:mb-4 flex items-center gap-2">
                      <span className="text-base sm:text-xl">🥘</span>
                      Key Ingredients
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                      {currentDishData.ingredients?.slice(0, 5).map((ingredient, index) => (
                        <span
                          key={index}
                          className="bg-accent text-foreground px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-medium border border-border hover:shadow-md hover-lift transition-all duration-200 cursor-default"
                          style={{ animationDelay: index * 100 + 'ms' }}
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-4 sm:mb-6 hidden sm:block">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {currentDishData.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-muted text-muted-foreground px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 sm:space-y-4">
                  <button
                    onClick={handleAddToCart}
                    className="btn-primary w-full group relative flex items-center justify-center gap-2 sm:gap-4 overflow-hidden py-3 sm:py-4"
                  >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-700 origin-center"></div>

                    {/* Icon with animation */}
                    <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                      <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                      <span className="text-sm sm:text-base md:text-lg font-extrabold tracking-wide">Add to Cart</span>
                    </div>

                    {/* Sparkle effects */}
                    <div className="absolute top-2 right-4 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping hidden sm:block" style={{ animationDelay: '0.1s' }}></div>
                    <div className="absolute top-4 right-6 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping hidden sm:block" style={{ animationDelay: '0.3s' }}></div>
                    <div className="absolute bottom-3 right-8 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping hidden sm:block" style={{ animationDelay: '0.5s' }}></div>

                    {/* Border glow effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105"></div>
                  </button>

                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-muted-foreground bg-muted py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl inline-block border border-border shadow-light">
                      <span className="font-bold text-primary">{currentDish + 1}</span> of <span className="font-bold text-destructive">{filteredDishes.length}</span> exquisite dishes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFoodShowcase;
