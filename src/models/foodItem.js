import mongoose from 'mongoose';

const FoodItemSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        lowercase: true,
    },
    meal: {
        type: String,
        required: true,
        enum: ['breakfast', 'lunch', 'dinner'],
        lowercase: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    ingredients: {
        type: [String],
        default: [],
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    prepTime: {
        type: Number, // in minutes
    },
    servings: {
        type: Number,
    },
    difficulty: {
        type: String,
        trim: true,
    },
    cookTime: {
        type: String,
    },
    tags: {
        type: [String],
        default: [],
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

// Prevent model recompilation error in Next.js development
export default mongoose.models.FoodItem || mongoose.model('FoodItem', FoodItemSchema);
