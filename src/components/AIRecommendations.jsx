"use client";

import { useState } from 'react';
import { Brain, TrendingUp, Clock, Star, ChefHat, Sparkles, Filter, Search, ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import { useFlyToCart } from './FlyToCartAnimation';

const AIRecommendations = ({ isAuthenticated, onAuthRequired }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMeal, setSelectedMeal] = useState('all'); // 'all' | 'breakfast' | 'lunch' | 'dinner'
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const { addToCart } = useCart();
  const { triggerFlyToCart } = useFlyToCart();

  const categories = [
    { id: 'all', name: 'All Dishes', icon: '🍽️' },
    { id: 'italian', name: 'Italian', icon: '🍝' },
    { id: 'indian', name: 'Indian', icon: '🍛' },
    { id: 'asian', name: 'Asian', icon: '🍜' },
    { id: 'thai', name: 'Thai', icon: '🌶️' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'healthy', name: 'Healthy', icon: '🥗' },
    { id: 'quick', name: 'Quick Meals', icon: '⚡' }
  ];

  const recommendations = [
    {
      id: 2,
      name: "Personalized: Grilled Salmon",
      category: "healthy",
      meal: 'dinner',
      rating: 4.8,
      cookTime: "25 min",
      difficulty: "Easy",
      price: "₹599",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      aiReason: "Based on your health goals and love for protein-rich meals. Quick and nutritious!",
      tags: ["Healthy", "Quick", "Protein"]
    },
    {
      id: 3,
      name: "Trending: Chocolate Lava Cake",
      category: "desserts",
      meal: 'dinner',
      rating: 4.7,
      cookTime: "20 min",
      difficulty: "Medium",
      price: "₹349",
      image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop",
      aiReason: "Currently trending among dessert lovers. Perfect for impressing guests with minimal effort.",
      tags: ["Trending", "Romantic", "Decadent"]
    },
    {
      id: 4,
      name: "Seasonal Pick: Thai Green Curry",
      category: "thai",
      meal: 'lunch',
      rating: 4.6,
      cookTime: "35 min",
      difficulty: "Medium",
      price: "₹449",
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
      aiReason: "Perfect for the current season. Warming spices and aromatic flavors that complement cooler weather.",
      tags: ["Seasonal", "Aromatic", "Spicy"]
    },
    {
      id: 11,
      name: "Street Favorite: Pad Thai",
      category: "thai",
      meal: 'lunch',
      rating: 4.7,
      cookTime: "30 min",
      difficulty: "Medium",
      price: "₹399",
      image: "https://www.jocooks.com/wp-content/uploads/2019/07/pad-thai-1.jpg",
      aiReason: "A balanced mix of sweet, sour, and savory flavors with tamarind, fish sauce, and peanuts.",
      tags: ["Noodles", "Popular", "Street Food"]
    },
    {
      id: 1,
      name: "AI's Top Pick: Truffle Mushroom Risotto",
      category: "italian",
      meal: 'dinner',
      rating: 4.9,
      cookTime: "45 min",
      difficulty: "Medium",
      price: "₹499",
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
      aiReason: "Perfect for date nights and special occasions. The AI detected your preference for creamy, comforting dishes.",
      tags: ["Trending", "AI Favorite", "Gourmet"]
    },
    {
      id: 5,
      name: "Quick Fix: Mediterranean Bowl",
      category: "quick",
      meal: 'breakfast',
      rating: 4.5,
      cookTime: "15 min",
      difficulty: "Easy",
      price: "₹299",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      aiReason: "Based on your busy schedule. Healthy, quick, and packed with Mediterranean flavors.",
      tags: ["Quick", "Healthy", "Mediterranean"]
    },
    {
      id: 6,
      name: "Chef's Choice: Beef Wellington",
      category: "all",
      meal: 'dinner',
      rating: 4.9,
      cookTime: "90 min",
      difficulty: "Hard",
      price: "₹899",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop",
      aiReason: "For when you want to challenge yourself. A classic dish that's worth every minute of preparation.",
      tags: ["Chef's Pick", "Classic", "Gourmet"]
    },
    {
      id: 7,
      name: "AI's Indian Pick: Butter Chicken",
      category: "indian",
      meal: 'dinner',
      rating: 4.9,
      cookTime: "40 min",
      difficulty: "Medium",
      price: "₹549",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      aiReason: "Based on your love for creamy, rich flavors. This classic Indian dish is perfect for both beginners and connoisseurs.",
      tags: ["AI Favorite", "Creamy", "Popular"]
    },
    {
      id: 8,
      name: "Trending: Tandoori Chicken",
      category: "indian",
      meal: 'dinner',
      rating: 4.8,
      cookTime: "50 min",
      difficulty: "Medium",
      price: "₹499",
      image: "https://img.freepik.com/free-photo/side-view-baked-chicken-with-cucumber-lemon-seasoning-bread-table_141793-4757.jpg",
      aiReason: "Currently trending for its healthy preparation method and bold flavors. Perfect for those who love authentic Indian cuisine.",
      tags: ["Trending", "Healthy", "Grilled"]
    },
    {
      id: 9,
      name: "Vegetarian Choice: Palak Paneer",
      category: "indian",
      meal: 'lunch',
      rating: 4.6,
      cookTime: "35 min",
      difficulty: "Easy",
      price: "₹349",
      image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=400&h=300&fit=crop",
      aiReason: "Perfect for vegetarians and health-conscious diners. Rich in iron and packed with authentic Indian flavors.",
      tags: ["Vegetarian", "Healthy", "Nutritious"]
    },
    {
      id: 10,
      name: "Regional Special: Rogan Josh",
      category: "indian",
      meal: 'dinner',
      rating: 4.7,
      cookTime: "75 min",
      difficulty: "Hard",
      price: "₹599",
      image: "https://tse4.mm.bing.net/th/id/OIP.8Exik51-ydHvIi7yY7H96wHaDu?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
      aiReason: "A sophisticated Kashmiri dish for special occasions. The AI detected your appreciation for complex, layered flavors.",
      tags: ["Regional", "Sophisticated", "Special Occasion"]
    }
  ];

  const filteredRecommendations = recommendations.filter(dish => {
    const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory;
    const matchesMeal = selectedMeal === 'all' || dish.meal === selectedMeal;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.aiReason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesMeal && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    // Dark-friendly badge colors with subtle borders for contrast
    switch (difficulty) {
      case 'Easy':
        return 'text-green-700 bg-green-100 dark:text-green-100 dark:bg-green-950/60 border border-green-200/80 dark:border-green-800/80';
      case 'Medium':
        return 'text-yellow-700 bg-yellow-100 dark:text-yellow-100 dark:bg-yellow-950/60 border border-yellow-200/80 dark:border-yellow-800/80';
      case 'Hard':
        return 'text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-950/60 border border-red-200/80 dark:border-red-800/80';
      default:
        return 'text-gray-700 bg-gray-100 dark:text-gray-100 dark:bg-gray-900/70 border border-gray-200/80 dark:border-gray-700/70';
    }
  };

  const handleViewDetails = (dish) => {
    setSelectedDish(dish);
    setShowDetailsModal(true);
  };

  const handleAddToCart = (dish, event) => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }

    // Trigger fly-to-cart animation
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      triggerFlyToCart(dish.image, {
        x: rect.left + rect.width / 2 - 32,
        y: rect.top + rect.height / 2 - 32
      });
    }

    const success = addToCart(dish);
    if (success) {
      // Show success message or update UI
      console.log('Item added to cart successfully');
    }
  };

  return (
    <div className="bg-white dark:bg-black py-12 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-8 h-8 text-blue-500" />
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 dark:from-amber-200 dark:via-yellow-400 dark:to-amber-600 tracking-tight drop-shadow-sm">Take It Cheesy Services</h2>
            <Brain className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the art of fine dining with our meticulously curated collection of world-renowned dishes, bringing authentic global flavors directly to your table.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search dishes or AI recommendations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-inner transition-all duration-300"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 font-medium ${selectedCategory === category.id
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-105'
                  : 'bg-gray-100 dark:bg-gray-900/30 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 backdrop-blur-sm'
                  }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Layout: left meal filters + recommendations grid */}
        <div className="flex gap-6">
          {/* Left vertical meal filters */}
          <aside className="hidden lg:block w-56">
            <div className="sticky top-24 space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">Meals</h4>
              {[{ id: 'all', name: 'All Meals', icon: '🧑‍🍳' }, { id: 'breakfast', name: 'Breakfast', icon: '🥐' }, { id: 'lunch', name: 'Lunch', icon: '🍱' }, { id: 'dinner', name: 'Dinner', icon: '🍽️' }].map(meal => (
                <button
                  key={meal.id}
                  onClick={() => setSelectedMeal(meal.id)}
                  className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl text-left transition-all duration-300 font-medium border ${selectedMeal === meal.id ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-transparent shadow-lg shadow-indigo-500/25 scale-[1.02]' : 'bg-gray-50/50 dark:bg-gray-800/30 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700'}`}
                >
                  <span>{meal.icon}</span>
                  <span className="font-medium">{meal.name}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Recommendations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {filteredRecommendations.map((dish) => (
              <div key={dish.id} className="bg-white dark:bg-black backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 overflow-hidden hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300 group">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Rating Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-gray-800">{dish.rating}</span>
                    </div>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-3 right-3 bg-green-500 text-white rounded-lg px-2 py-1 font-bold shadow-sm">
                    {dish.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 bg-transparent rounded-b-2xl">
                  <h3 className="text-2xl font-bold mb-3 line-clamp-2 text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200">{dish.name}</h3>

                  {/* AI Reason */}
                  <div className="bg-gray-50/80 dark:bg-gradient-to-br dark:from-gray-800/50 dark:to-gray-900/50 rounded-lg p-3 mb-4 border border-gray-100 dark:border-white/5 shadow-inner">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{dish.aiReason}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500 dark:text-slate-100" />
                      <span className="text-sm text-gray-600 dark:text-slate-50">{dish.cookTime}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(dish.difficulty)}`}>
                      {dish.difficulty}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {dish.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-black text-gray-600 dark:text-gray-100 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(dish)}
                      className="flex-1 bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500/50"
                    >
                      View Details
                    </button>
                    <button
                      onClick={(e) => handleAddToCart(dish, e)}
                      className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white p-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="mt-12 rounded-2xl p-8 border border-gray-200 dark:border-white/10 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-500 drop-shadow-sm" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white relative z-10">AI Insights</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            <div className="text-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100 dark:border-white/5 hover:border-amber-500/20 transition-all duration-300">
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-500 mb-2">87%</div>
              <p className="text-gray-500 dark:text-gray-400">Match with your preferences</p>
            </div>
            <div className="text-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100 dark:border-white/5 hover:border-amber-500/20 transition-all duration-300">
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-500 mb-2">12</div>
              <p className="text-gray-500 dark:text-gray-400">New dishes discovered this week</p>
            </div>
            <div className="text-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100 dark:border-white/5 hover:border-amber-500/20 transition-all duration-300">
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-500 mb-2">4.8</div>
              <p className="text-gray-500 dark:text-gray-400">Average rating of recommendations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dish Details Modal */}
      {showDetailsModal && selectedDish && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-white dark:bg-gray-950 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-800 shadow-2xl">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedDish.name}</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-3xl transition-colors duration-200"
                >
                  ×
                </button>
              </div>

              {/* Dish Image */}
              <div className="mb-6 relative group">
                <img
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  className="w-full h-72 object-cover rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10"></div>
              </div>

              {/* Dish Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-bold text-gray-900 dark:text-white">{selectedDish.rating}</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="font-bold text-gray-900 dark:text-white">{selectedDish.cookTime}</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-center mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getDifficultyColor(selectedDish.difficulty)}`}>
                      {selectedDish.difficulty}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Level</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="text-lg font-bold text-green-600 dark:text-green-500 mb-1">{selectedDish.price}</div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</p>
                </div>
              </div>

              {/* AI Reason */}
              <div className="mb-6 bg-amber-50/50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-100/50 dark:border-amber-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                  <h3 className="font-bold text-gray-900 dark:text-white">AI Recommendation</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">{selectedDish.aiReason}</p>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDish.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-blue-200 rounded-full text-sm font-semibold transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nutritional Info (Mock Data) */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Nutritional Profile</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-black rounded-lg border border-gray-100 dark:border-gray-800">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">450</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Calories</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-black rounded-lg border border-gray-100 dark:border-gray-800">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">25g</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Protein</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-black rounded-lg border border-gray-100 dark:border-gray-800">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">15g</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Fat</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-black rounded-lg border border-gray-100 dark:border-gray-800">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">45g</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Carbs</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    handleAddToCart(selectedDish);
                    setShowDetailsModal(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart • {selectedDish.price}
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-8 py-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all duration-300 font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations; 