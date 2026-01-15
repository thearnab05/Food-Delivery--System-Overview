import connectDB from '@/lib/db';
import FoodItem from '@/models/foodItem';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    await connectDB();
    const { meal, category } = await params;

    try {
        const validMeals = ['breakfast', 'lunch', 'dinner'];
        if (!validMeals.includes(meal.toLowerCase())) {
            return NextResponse.json({ success: false, error: "Invalid meal type" }, { status: 400 });
        }

        let query = {
            meal: meal.toLowerCase(),
            isAvailable: true
        };

        if (category.toLowerCase() !== 'all') {
            query.category = category.toLowerCase();
        }

        const foodItems = await FoodItem.find(query).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            meal: meal,
            category: category,
            count: foodItems.length,
            data: foodItems
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
