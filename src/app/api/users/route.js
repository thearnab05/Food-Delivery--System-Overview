import connectDB from '@/lib/db';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();

        // Fetch all users from the database, excluding password
        const users = await User.find({}).select('-password').lean();

        console.log('Users fetched from DB:', users.length);

        return NextResponse.json({
            success: true,
            message: 'Users fetched successfully',
            count: users.length,
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
