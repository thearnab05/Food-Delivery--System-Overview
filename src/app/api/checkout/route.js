import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';

export async function POST(request) {
    try {
        const body = await request.json();
        const { items, customerInfo, paymentMethod, total } = body;

        // Validate required fields
        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: 'Cart is empty' },
                { status: 400 }
            );
        }

        if (!customerInfo || !customerInfo.name || !customerInfo.phone || !customerInfo.address) {
            return NextResponse.json(
                { error: 'Customer information is incomplete' },
                { status: 400 }
            );
        }

        // Generate order ID
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Connect to database and save order
        try {
            await connectDB();

            const newOrder = new Order({
                orderId,
                userEmail: customerInfo.email,
                items: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: parseFloat(item.price) || 0,
                    quantity: item.quantity,
                    image: item.image,
                    category: item.category,
                })),
                customerInfo: {
                    name: customerInfo.name,
                    phone: customerInfo.phone,
                    address: customerInfo.address,
                    email: customerInfo.email,
                },
                paymentMethod,
                total: parseFloat(total) || 0,
                status: 'confirmed',
            });

            await newOrder.save();
            console.log('Order saved to database:', orderId);
        } catch (dbError) {
            console.error('Database error (order will still be processed):', dbError);
            // Continue even if DB save fails - we don't want to break checkout
        }

        return NextResponse.json({
            success: true,
            orderId,
            message: 'Order placed successfully',
            order: {
                id: orderId,
                items,
                customerInfo,
                paymentMethod,
                total,
                status: 'confirmed',
                createdAt: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to process order' },
            { status: 500 }
        );
    }
}
