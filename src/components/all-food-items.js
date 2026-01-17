import { breakfastItems } from './breakfast-items';
import { lunchItems } from './lunch-items';
import { dinnerItems } from './dinner-items';

// API base URL
const API_BASE_URL = '/api';

// Cache for API responses
let foodItemsCache = null;
let categoriesCache = null;

// Fetch all food items from API with timeout
export const fetchAllFoodItems = async () => {
  try {
    if (foodItemsCache) {
      return foodItemsCache;
    }

    // Create an AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(`${API_BASE_URL}/food-items`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.success && data.data && data.data.length > 0) {
      foodItemsCache = data.data;
      return foodItemsCache;
    } else {
      // If no data from API, use static data
      console.warn('No data from API, using static data');
      return getStaticFoodItems();
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn('API request timed out, using static data');
    } else {
      console.error('Error fetching food items:', error);
    }
    // Fallback to static data if API fails
    return getStaticFoodItems();
  }
};

// Fetch food items by meal type from API
export const fetchFoodItemsByMeal = async (mealType) => {
  try {
    const response = await fetch(`${API_BASE_URL}/food-items/meal/${mealType}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.error || 'Failed to fetch food items');
    }
  } catch (error) {
    console.error(`Error fetching ${mealType} items:`, error);
    // Fallback to static data
    return getStaticFoodItemsByMeal(mealType);
  }
};

// Fetch categories from API with timeout
export const fetchCategories = async () => {
  try {
    if (categoriesCache) {
      return categoriesCache;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${API_BASE_URL}/categories`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.success && data.data && data.data.length > 0) {
      categoriesCache = data.data.filter(category => category.id !== 'american');
      return categoriesCache;
    } else {
      return getStaticCategories();
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn('Categories API timed out, using static data');
    } else {
      console.error('Error fetching categories:', error);
    }
    return getStaticCategories();
  }
};

// Legacy support - combine all food items (for backward compatibility)
export const allFoodItems = [
  {
    id: 1,
    name: "Masala Dosa",
    category: "indian",
    meal: "breakfast",
    price: 120,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop&q=80",
    description: "Crispy fermented crepe filled with spiced potato filling",
    ingredients: ["Rice", "Urad Dal", "Potatoes", "Onions", "Green Chilies", "Spices"],
    rating: 4.5,
    prepTime: 15,
    servings: 1,
    difficulty: "Medium",
    cookTime: "15 min"
  },
  {
    id: 2,
    name: "Idli Sambar",
    category: "indian",
    meal: "breakfast",
    price: 80,
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop&q=80",
    description: "Steamed rice cakes served with lentil soup and chutney",
    ingredients: ["Rice", "Urad Dal", "Toor Dal", "Vegetables", "Tamarind", "Spices"],
    rating: 4.3,
    prepTime: 10,
    servings: 2,
    difficulty: "Easy",
    cookTime: "10 min"
  },
  {
    id: 3,
    name: "Pancakes",
    category: "continental",
    meal: "breakfast",
    price: 150,
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop&q=80",
    description: "Fluffy pancakes with maple syrup and fresh berries",
    ingredients: ["Flour", "Milk", "Eggs", "Butter", "Maple Syrup", "Berries"],
    rating: 4.7,
    prepTime: 20,
    servings: 2,
    difficulty: "Easy",
    cookTime: "20 min"
  },
  {
    id: 4,
    name: "Omelette",
    category: "continental",
    meal: "breakfast",
    price: 100,
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop&q=80",
    description: "Three egg omelette with vegetables and cheese",
    ingredients: ["Eggs", "Vegetables", "Cheese", "Milk", "Butter", "Herbs"],
    rating: 4.4,
    prepTime: 10,
    servings: 1,
    difficulty: "Easy",
    cookTime: "10 min"
  },
  {
    id: 5,
    name: "Butter Chicken",
    category: "indian",
    meal: "lunch",
    price: 250,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae391?w=400&h=300&fit=crop&q=80",
    description: "Creamy tomato-based curry with tender chicken pieces",
    ingredients: ["Chicken", "Butter", "Cream", "Tomatoes", "Spices", "Ginger", "Garlic"],
    rating: 4.8,
    prepTime: 45,
    servings: 2
  },
  {
    id: 6,
    name: "Paneer Tikka Masala",
    category: "indian",
    meal: "lunch",
    price: 220,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80",
    description: "Grilled paneer cubes in rich spicy tomato gravy",
    rating: 4.6,
    prepTime: 40,
    servings: 2
  },
  {
    id: 7,
    name: "Pad Thai",
    category: "thai",
    meal: "lunch",
    price: 200,
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop&q=80",
    description: "Stir-fried rice noodles with shrimp, tofu, and peanuts",
    ingredients: ["Rice Noodles", "Shrimp", "Tofu", "Peanuts", "Bean Sprouts", "Lime"],
    rating: 4.5,
    prepTime: 25,
    servings: 2,
    difficulty: "Medium",
    cookTime: "15 min"
  },
  {
    id: 8,
    name: "Grilled Salmon",
    category: "continental",
    meal: "lunch",
    price: 350,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&q=80",
    description: "Fresh Atlantic salmon fillet grilled with herbs and lemon",
    ingredients: ["Salmon", "Lemon", "Herbs", "Olive Oil", "Garlic", "Sea Salt"],
    rating: 4.7,
    prepTime: 15,
    servings: 1,
    difficulty: "Easy",
    cookTime: "12 min"
  },
  {
    id: 9,
    name: "Caesar Salad",
    category: "continental",
    meal: "lunch",
    price: 180,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop&q=80",
    description: "Crisp romaine lettuce with parmesan, croutons, and Caesar dressing",
    ingredients: ["Romaine Lettuce", "Parmesan", "Croutons", "Caesar Dressing", "Anchovies"],
    rating: 4.3,
    prepTime: 10,
    servings: 1,
    difficulty: "Easy",
    cookTime: "5 min"
  },
  {
    id: 10,
    name: "Chicken Shawarma",
    category: "middle-eastern",
    meal: "lunch",
    price: 190,
    image: "https://images.unsplash.com/photo-1529003926-51e9d9c8b3a8?w=400&h=300&fit=crop&q=80",
    description: "Marinated chicken wrapped in pita with garlic sauce and vegetables",
    ingredients: ["Chicken", "Pita Bread", "Garlic Sauce", "Vegetables", "Spices"],
    rating: 4.6,
    prepTime: 30,
    servings: 1,
    difficulty: "Medium",
    cookTime: "20 min"
  },
  {
    id: 11,
    name: "Sushi Platter",
    category: "japanese",
    meal: "lunch",
    price: 400,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop&q=80",
    description: "Assortment of fresh sushi rolls and nigiri with wasabi and soy sauce",
    ingredients: ["Sushi Rice", "Nori", "Fish", "Vegetables", "Wasabi", "Soy Sauce"],
    rating: 4.8,
    prepTime: 45,
    servings: 2,
    difficulty: "Hard",
    cookTime: "30 min"
  },
  {
    id: 12,
    name: "Mediterranean Quinoa Bowl",
    category: "healthy",
    meal: "lunch",
    price: 220,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80",
    description: "Nutritious quinoa bowl with roasted vegetables, feta, and olive oil dressing",
    ingredients: ["Quinoa", "Roasted Vegetables", "Feta Cheese", "Olive Oil", "Herbs"],
    rating: 4.4,
    prepTime: 20,
    servings: 1,
    difficulty: "Easy",
    cookTime: "15 min"
  },
  {
    id: 17,
    name: "Dal Makhani",
    category: "indian",
    meal: "dinner",
    price: 180,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&q=80",
    description: "Slow-cooked black lentils in creamy tomato sauce",
    rating: 4.6,
    prepTime: 60,
    servings: 2
  },
  {
    id: 18,
    name: "Chicken Biryani",
    category: "indian",
    meal: "dinner",
    price: 260,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&q=80",
    description: "Fragrant rice dish with spiced chicken and saffron",
    rating: 4.8,
    prepTime: 50,
    servings: 2
  },
  {
    id: 19,
    name: "Lasagna",
    category: "italian",
    meal: "dinner",
    price: 300,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&q=80",
    description: "Layered pasta with meat sauce and cheese",
    rating: 4.7,
    prepTime: 60,
    servings: 3,
    difficulty: "Medium",
    cookTime: "45 min"
  },
  {
    id: 20,
    name: "Beef Stroganoff",
    category: "russian",
    meal: "dinner",
    price: 320,
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&q=80",
    description: "Tender beef strips in creamy mushroom sauce served with rice",
    ingredients: ["Beef", "Mushrooms", "Cream", "Onions", "Rice", "Herbs"],
    rating: 4.5,
    prepTime: 35,
    servings: 2,
    difficulty: "Medium",
    cookTime: "25 min"
  },
  {
    id: 21,
    name: "Truffle Mushroom Risotto",
    category: "italian",
    meal: "dinner",
    price: 450,
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop&q=80",
    description: "Creamy Arborio rice with truffle oil and wild mushrooms",
    ingredients: ["Arborio Rice", "Wild Mushrooms", "Truffle Oil", "Parmesan", "White Wine", "Vegetable Stock"],
    rating: 4.9,
    prepTime: 40,
    servings: 2,
    difficulty: "Hard",
    cookTime: "30 min"
  },
  {
    id: 22,
    name: "Grilled Ribeye Steak",
    category: "american",
    meal: "dinner",
    price: 550,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop&q=80",
    description: "Premium ribeye steak grilled to perfection with garlic butter",
    ingredients: ["Ribeye Steak", "Garlic Butter", "Herbs", "Sea Salt", "Black Pepper"],
    rating: 4.8,
    prepTime: 15,
    servings: 1,
    difficulty: "Medium",
    cookTime: "12 min"
  },
  {
    id: 23,
    name: "Seafood Paella",
    category: "spanish",
    meal: "dinner",
    price: 380,
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&h=300&fit=crop&q=80",
    description: "Traditional Spanish rice dish with mixed seafood and saffron",
    ingredients: ["Rice", "Mixed Seafood", "Saffron", "Bell Peppers", "Peas", "Garlic"],
    rating: 4.7,
    prepTime: 45,
    servings: 3,
    difficulty: "Medium",
    cookTime: "35 min"
  },
  {
    id: 24,
    name: "Duck Confit",
    category: "french",
    meal: "dinner",
    price: 480,
    image: "https://images.unsplash.com/photo-1544378730-6f3c834d9b2d?w=400&h=300&fit=crop&q=80",
    description: "Slow-cooked duck leg in its own fat with herb crust",
    ingredients: ["Duck Leg", "Duck Fat", "Garlic", "Thyme", "Bay Leaves"],
    rating: 4.6,
    prepTime: 120,
    servings: 1,
    difficulty: "Hard",
    cookTime: "2 hours"
  },
  {
    id: 25,
    name: "Thai Green Curry",
    category: "thai",
    meal: "dinner",
    price: 240,
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop&q=80",
    description: "Aromatic green curry with coconut milk and fresh vegetables",
    ingredients: ["Green Curry Paste", "Coconut Milk", "Chicken", "Thai Eggplant", "Basil", "Lime"],
    rating: 4.5,
    prepTime: 25,
    servings: 2,
    difficulty: "Medium",
    cookTime: "20 min"
  },
  {
    id: 26,
    name: "Lamb Tagine",
    category: "moroccan",
    meal: "dinner",
    price: 360,
    image: "https://images.unsplash.com/photo-1541599468348-e96984315621?w=400&h=300&fit=crop&q=80",
    description: "Slow-cooked lamb with apricots, almonds, and Moroccan spices",
    ingredients: ["Lamb", "Apricots", "Almonds", "Moroccan Spices", "Onions", "Cinnamon"],
    rating: 4.7,
    prepTime: 90,
    servings: 3,
    difficulty: "Medium",
    cookTime: "75 min"
  },
  {
    id: 27,
    name: "Vegetable Stir Fry",
    category: "chinese",
    meal: "dinner",
    price: 160,
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop&q=80",
    description: "Colorful mixed vegetables stir-fried with ginger and garlic",
    ingredients: ["Mixed Vegetables", "Ginger", "Garlic", "Soy Sauce", "Sesame Oil"],
    rating: 4.2,
    prepTime: 15,
    servings: 2,
    difficulty: "Easy",
    cookTime: "10 min"
  },
  {
    id: 28,
    name: "Lobster Thermidor",
    category: "french",
    meal: "dinner",
    price: 650,
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop&q=80",
    description: "Luxurious lobster in a rich brandy cream sauce",
    ingredients: ["Lobster", "Brandy", "Cream", "Mustard", "Cheese", "Herbs"],
    rating: 4.9,
    prepTime: 50,
    servings: 1,
    difficulty: "Hard",
    cookTime: "25 min"
  }
];

// Fallback functions using static data
const getStaticFoodItems = () => {
  return allFoodItems;
};

const getStaticFoodItemsByMeal = (mealType) => {
  switch (mealType) {
    case 'breakfast':
      return breakfastItems;
    case 'lunch':
      return lunchItems;
    case 'dinner':
      return dinnerItems;
    default:
      return allFoodItems;
  }
};

const getStaticCategories = () => {
  const categories = [...new Set(allFoodItems.map(item => item.category).filter(cat => cat))];
  return categories
    .filter(category => category !== 'american') // Remove american category
    .map(category => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1),
      icon: getCategoryIcon(category)
    }));
};

// Export individual meal arrays for specific use cases
export { breakfastItems, lunchItems, dinnerItems };

// Helper function to get items by meal type (API-first, fallback to static)
export const getItemsByMeal = async (mealType) => {
  try {
    return await fetchFoodItemsByMeal(mealType);
  } catch (error) {
    console.warn(`API failed, using static data for ${mealType}`);
    return getStaticFoodItemsByMeal(mealType);
  }
};

// Helper function to get items by category (API-first, fallback to static)
export const getItemsByCategory = async (category) => {
  try {
    const allItems = await fetchAllFoodItems();
    return allItems.filter(item => item.category === category);
  } catch (error) {
    console.warn(`API failed, using static data for category ${category}`);
    return allFoodItems.filter(item => item.category === category);
  }
};

// Helper function to get items by both meal and category (API-first, fallback to static)
export const getItemsByMealAndCategory = async (mealType, category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/food-items/meal/${mealType}/category/${category}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.error || 'Failed to fetch food items');
    }
  } catch (error) {
    console.warn(`API failed, using static data for ${mealType}/${category}`);
    const mealItems = getStaticFoodItemsByMeal(mealType);
    if (category === 'all') return mealItems;
    return mealItems.filter(item => item.category === category);
  }
};

// Get unique categories (API-first, fallback to static)
export const getAllCategories = async () => {
  try {
    return await fetchCategories();
  } catch (error) {
    console.warn('API failed, using static categories');
    return getStaticCategories();
  }
};

// Get category icon
const getCategoryIcon = (category) => {
  const iconMap = {
    'indian': '🍛',
    'italian': '🍝',
    'thai': '🌶️',
    'asian': '🍜',
    'japanese': '🍱',
    'chinese': '🥢',
    'korean': '🍚',
    'vietnamese': '🍜',
    'mediterranean': '🥗',
    'continental': '🍽️',
    'french': '🥖',
    'british': '☕',
    'mexican': '🌮',
    'seafood': '🐟',
    'dessert': '🍰',
    'gourmet': '👨‍🍳',
    'healthy': '🥗',
    'indian-chinese': '🥢',
    'quick': '⚡',
    'american': '🍔',
    'russian': '🥟',
    'spanish': '🥘',
    'moroccan': '🍲',
    'middle-eastern': '🫓'
  };
  return iconMap[category] || '🍽️';
};

// Get meal statistics
export const getMealStats = () => {
  const stats = {
    breakfast: {
      total: breakfastItems.length,
      indian: breakfastItems.filter(item => item.category === 'indian').length,
      continental: breakfastItems.filter(item => item.category === 'continental').length
    },
    lunch: {
      total: lunchItems.length,
      indian: lunchItems.filter(item => item.category === 'indian').length,
      thai: lunchItems.filter(item => item.category === 'thai').length,
      mediterranean: lunchItems.filter(item => item.category === 'mediterranean').length,
      italian: lunchItems.filter(item => item.category === 'italian').length,
      continental: lunchItems.filter(item => item.category === 'continental').length,
      asian: lunchItems.filter(item => item.category === 'asian').length
    },
    dinner: {
      total: dinnerItems.length,
      indian: dinnerItems.filter(item => item.category === 'indian').length,
      italian: dinnerItems.filter(item => item.category === 'italian').length,
      continental: dinnerItems.filter(item => item.category === 'continental').length,
      french: dinnerItems.filter(item => item.category === 'french').length,
      thai: dinnerItems.filter(item => item.category === 'thai').length,
      asian: dinnerItems.filter(item => item.category === 'asian').length,
      japanese: dinnerItems.filter(item => item.category === 'japanese').length,
      'indian-chinese': dinnerItems.filter(item => item.category === 'indian-chinese').length,
      seafood: dinnerItems.filter(item => item.category === 'seafood').length,
      gourmet: dinnerItems.filter(item => item.category === 'gourmet').length,
      dessert: dinnerItems.filter(item => item.category === 'dessert').length
    }
  };

  stats.total = allFoodItems.length;
  return stats;
};
