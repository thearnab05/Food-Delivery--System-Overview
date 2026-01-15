import connectDB from '@/lib/db';
import FoodItem from '@/models/foodItem';
import { NextResponse } from 'next/server';

export async function GET() {
    await connectDB();
    try {
        const foodItems = await FoodItem.find({ isAvailable: true }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, count: foodItems.length, data: foodItems });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    await connectDB();
    try {
        const body = await request.json();
        const foodItem = await FoodItem.create(body);
        return NextResponse.json({ success: true, data: foodItem }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
