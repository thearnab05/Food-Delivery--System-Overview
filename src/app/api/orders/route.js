import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';

// GET /api/orders?email=user@example.com
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { error: 'Email parameter is required' },
                { status: 400 }
            );
        }

        await connectDB();

        // Fetch orders for this user, sorted by newest first
        const orders = await Order.find({ userEmail: email })
            .sort({ createdAt: -1 })
            .lean();

        // Transform orders to match frontend format
        const formattedOrders = orders.map(order => ({
            id: order.orderId,
            items: order.items,
            customerInfo: order.customerInfo,
            paymentMethod: order.paymentMethod,
            total: order.total,
            status: order.status,
            date: order.createdAt,
        }));

        return NextResponse.json({
            success: true,
            orders: formattedOrders,
        });

    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}
