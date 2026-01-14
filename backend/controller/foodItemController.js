import FoodItem from '../models/foodItem.js';

// Get all food items
const getAllFoodItems = async (req, res) => {
  try {
    // Check database connection
    if (!req.dbConnected) {
      return res.status(503).json({ error: "Database connection error. Please try again later." });
    }

    const foodItems = await FoodItem.find({ isAvailable: true }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: foodItems.length,
      data: foodItems
    });
  } catch (error) {
    console.error('getAllFoodItems error:', error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

// Get food items by meal type
const getFoodItemsByMeal = async (req, res) => {
  try {
    // Check database connection
    if (!req.dbConnected) {
      return res.status(503).json({ error: "Database connection error. Please try again later." });
    }

    const { meal } = req.params;
    const validMeals = ['breakfast', 'lunch', 'dinner'];

    if (!validMeals.includes(meal.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: "Invalid meal type. Must be breakfast, lunch, or dinner"
      });
    }

    const foodItems = await FoodItem.find({
      meal: meal.toLowerCase(),
      isAvailable: true
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      meal: meal,
      count: foodItems.length,
      data: foodItems
    });
  } catch (error) {
    console.error('getFoodItemsByMeal error:', error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

// Get food items by category
const getFoodItemsByCategory = async (req, res) => {
  try {
    // Check database connection
    if (!req.dbConnected) {
      return res.status(503).json({ error: "Database connection error. Please try again later." });
    }

    const { category } = req.params;
    const foodItems = await FoodItem.find({
      category: category.toLowerCase(),
      isAvailable: true
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      category: category,
      count: foodItems.length,
      data: foodItems
    });
  } catch (error) {
    console.error('getFoodItemsByCategory error:', error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

// Get food items by meal and category
const getFoodItemsByMealAndCategory = async (req, res) => {
  try {
    // Check database connection
    if (!req.dbConnected) {
      return res.status(503).json({ error: "Database connection error. Please try again later." });
    }

    const { meal, category } = req.params;
    const validMeals = ['breakfast', 'lunch', 'dinner'];

    if (!validMeals.includes(meal.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: "Invalid meal type. Must be breakfast, lunch, or dinner"
      });
    }

    let query = {
      meal: meal.toLowerCase(),
      isAvailable: true
    };

    if (category.toLowerCase() !== 'all') {
      query.category = category.toLowerCase();
    }

    const foodItems = await FoodItem.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      meal: meal,
      category: category,
      count: foodItems.length,
      data: foodItems
    });
  } catch (error) {
    console.error('getFoodItemsByMealAndCategory error:', error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

// Get single food item by ID
const getFoodItemById = async (req, res) => {
  try {
    // Check database connection
    if (!req.dbConnected) {
      return res.status(503).json({ error: "Database connection error. Please try again later." });
    }

    const { id } = req.params;
    const foodItem = await FoodItem.findOne({ id: parseInt(id), isAvailable: true });

    if (!foodItem) {
      return res.status(404).json({
        success: false,
        error: "Food item not found"
      });
    }

    res.status(200).json({
      success: true,
      data: foodItem
    });
  } catch (error) {
    console.error('getFoodItemById error:', error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

// Create new food item (admin function)
const createFoodItem = async (req, res) => {
  try {
    // Check database connection
    if (!req.dbConnected) {
      return res.status(503).json({ error: "Database connection error. Please try again later." });
    }

    const foodItemData = req.body;

    // Validate required fields
    const requiredFields = ['id', 'name', 'category', 'meal', 'price', 'image', 'description', 'prepTime', 'servings'];
    for (const field of requiredFields) {
      if (!foodItemData[field]) {
        return res.status(400).json({
          success: false,
          error: `Missing required field: ${field}`
        });
      }
    }

    // Check if ID already exists
    const existingItem = await FoodItem.findOne({ id: foodItemData.id });
    if (existingItem) {
      return res.status(400).json({
        success: false,
        error: "Food item with this ID already exists"
      });
    }

    const foodItem = new FoodItem(foodItemData);
    await foodItem.save();

    console.log(`Food item created: ${foodItem.name} (ID: ${foodItem.id})`);
    res.status(201).json({
      success: true,
      message: "Food item created successfully",
      data: foodItem
    });
  } catch (error) {
    console.error('createFoodItem error:', error);
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        error: "Food item with this ID already exists"
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Internal server error"
      });
    }
  }
};

// Update food item (admin function)
const updateFoodItem = async (req, res) => {
  try {
    // Check database connection
    if (!req.dbConnected) {
      return res.status(503).json({ error: "Database connection error. Please try again later." });
    }

    const { id } = req.params;
    const updateData = req.body;

    // Remove id from update data to prevent changing the ID
    delete updateData.id;

    const foodItem = await FoodItem.findOneAndUpdate(
      { id: parseInt(id) },
      updateData,
      { new: true, runValidators: true }
    );

    if (!foodItem) {
      return res.status(404).json({
        success: false,
        error: "Food item not found"
      });
    }

    console.log(`Food item updated: ${foodItem.name} (ID: ${foodItem.id})`);
    res.status(200).json({
      success: true,
      message: "Food item updated successfully",
      data: foodItem
    });
  } catch (error) {
    console.error('updateFoodItem error:', error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

// Delete food item (admin function)
const deleteFoodItem = async (req, res) => {
  try {
    // Check database connection
    if (!req.dbConnected) {
      return res.status(503).json({ error: "Database connection error. Please try again later." });
    }

    const { id } = req.params;
    const foodItem = await FoodItem.findOneAndUpdate(
      { id: parseInt(id) },
      { isAvailable: false },
      { new: true }
    );

    if (!foodItem) {
      return res.status(404).json({
        success: false,
        error: "Food item not found"
      });
    }

    console.log(`Food item deleted (soft): ${foodItem.name} (ID: ${foodItem.id})`);
    res.status(200).json({
      success: true,
      message: "Food item deleted successfully",
      data: foodItem
    });
  } catch (error) {
    console.error('deleteFoodItem error:', error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

// Get unique categories
const getCategories = async (req, res) => {
  try {
    // Check database connection
    if (!req.dbConnected) {
      return res.status(503).json({ error: "Database connection error. Please try again later." });
    }

    const categories = await FoodItem.distinct('category', { isAvailable: true });
    const filteredCategories = categories.filter(category => category !== 'american'); // Remove american category
    const categoryData = filteredCategories.map(category => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1)
    }));

    res.status(200).json({
      success: true,
      count: filteredCategories.length,
      data: categoryData
    });
  } catch (error) {
    console.error('getCategories error:', error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

export {
  getAllFoodItems,
  getFoodItemsByMeal,
  getFoodItemsByCategory,
  getFoodItemsByMealAndCategory,
  getFoodItemById,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getCategories
};