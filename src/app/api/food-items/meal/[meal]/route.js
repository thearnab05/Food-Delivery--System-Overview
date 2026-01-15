import connectDB from '@/lib/db';
import FoodItem from '@/models/foodItem';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    await connectDB();
    const { meal } = await params; // Next.js 15 params are async

    try {
        const validMeals = ['breakfast', 'lunch', 'dinner'];
        if (!validMeals.includes(meal.toLowerCase())) {
            return NextResponse.json({ success: false, error: "Invalid meal type" }, { status: 400 });
        }

        const foodItems = await FoodItem.find({
            meal: meal.toLowerCase(),
            isAvailable: true
        }).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            meal: meal,
            count: foodItems.length,
            data: foodItems
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
