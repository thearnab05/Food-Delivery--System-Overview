import connectDB from '@/lib/db';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { name, email, password, role } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                { success: false, error: 'Please provide all required fields' },
                { status: 400 }
            );
        }

        // Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'User already exists' },
                { status: 400 }
            );
        }

        // Create user
        const newUser = await User.create({
            name,
            email,
            password, // Note: In production, password should be hashed
            role: role || 'user',
        });

        console.log('DB: User registered:', newUser._id);

        return NextResponse.json({
            success: true,
            message: 'User registered successfully',
            data: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Registration failed' },
            { status: 500 }
        );
    }
}
