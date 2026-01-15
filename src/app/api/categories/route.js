import connectDB from '@/lib/db';
import FoodItem from '@/models/foodItem';
import { NextResponse } from 'next/server';

export async function GET() {
    await connectDB();
    try {
        const categories = await FoodItem.distinct('category', { isAvailable: true });
        // Filter out 'american' as per original backend logic
        const filteredCategories = categories.filter(category => category !== 'american');

        const categoryData = filteredCategories.map(category => ({
            id: category,
            name: category.charAt(0).toUpperCase() + category.slice(1)
        }));

        return NextResponse.json({ success: true, count: filteredCategories.length, data: categoryData });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
