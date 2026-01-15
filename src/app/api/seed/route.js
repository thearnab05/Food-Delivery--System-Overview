import connectDB from '@/lib/db';
import FoodItem from '@/models/foodItem';
import { allFoodItems } from '@/components/all-food-items';
import { NextResponse } from 'next/server';

export async function GET() {
    await connectDB();
    try {
        // Check if database is already seeded
        const count = await FoodItem.countDocuments();
        if (count > 0) {
            return NextResponse.json({
                success: true,
                message: 'Database already seeded',
                count
            });
        }

        // Insert all food items
        await FoodItem.insertMany(allFoodItems);

        return NextResponse.json({
            success: true,
            message: 'Database seeded successfully',
            count: allFoodItems.length
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
