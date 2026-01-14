import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  meal: {
    type: String,
    required: true,
    enum: ['breakfast', 'lunch', 'dinner'],
    lowercase: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  ingredients: [{
    type: String,
    trim: true
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  prepTime: {
    type: Number,
    required: true,
    min: 0
  },
  servings: {
    type: Number,
    required: true,
    min: 1
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  cookTime: {
    type: String,
    trim: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
foodItemSchema.index({ meal: 1, category: 1 });
foodItemSchema.index({ category: 1 });
foodItemSchema.index({ name: 'text', description: 'text' });

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

export default FoodItem;