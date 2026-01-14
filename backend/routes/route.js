import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

import { registerUser, login, fetchAllData, checkout } from '../controller/registration.js';
import {
  getAllFoodItems,
  getFoodItemsByMeal,
  getFoodItemsByCategory,
  getFoodItemsByMealAndCategory,
  getFoodItemById,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getCategories
} from '../controller/foodItemController.js';

// Middleware to check database connection
const checkDbConnection = (req, res, next) => {
  req.dbConnected = mongoose.connection.readyState === 1;
  next();
};

// Apply database check middleware to all routes
router.use(checkDbConnection);

// User routes
router.route("/post").post(registerUser);
router.route("/login").post(login);
router.route("/allData").get(fetchAllData);
router.route("/checkout").post(checkout);

// Food item routes
router.route("/food-items").get(getAllFoodItems);
router.route("/food-items/meal/:meal").get(getFoodItemsByMeal);
router.route("/food-items/category/:category").get(getFoodItemsByCategory);
router.route("/food-items/meal/:meal/category/:category").get(getFoodItemsByMealAndCategory);
router.route("/food-items/:id").get(getFoodItemById);
router.route("/food-items").post(createFoodItem);
router.route("/food-items/:id").put(updateFoodItem);
router.route("/food-items/:id").delete(deleteFoodItem);
router.route("/categories").get(getCategories);

// Health endpoint with database check
router.get('/health', async (req, res) => {
    try {
        // Check if MongoDB is connected
        const dbState = mongoose.connection.readyState;
        const isDbConnected = dbState === 1; // 1 = connected

        if (isDbConnected) {
            // Test database with a simple operation
            await mongoose.connection.db.admin().ping();
        }

        res.status(200).json({
            ok: true,
            status: 'healthy',
            database: isDbConnected ? 'connected' : 'disconnected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Health check failed:', error);
        res.status(503).json({
            ok: false,
            status: 'unhealthy',
            database: 'error',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

export default router;