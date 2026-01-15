import connectDB from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();

        if (!global.mockUsers) global.mockUsers = [];

        // Exclude password from mock data
        const users = global.mockUsers.map(({ password, ...user }) => user);

        return NextResponse.json({
            success: true,
            message: 'Users fetched successfully (MOCK)',
            data: users,
        });
    } catch (error) {
        console.error('Fetch users error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch users' },
            { status: 500 }
        );
    }
}
