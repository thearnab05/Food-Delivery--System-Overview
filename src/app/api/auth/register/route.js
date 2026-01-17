import connectDB from '@/lib/db';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        console.log('Registration attempt started...');

        await connectDB();
        console.log('DB connected successfully');

        const body = await req.json();
        console.log('Registration data received:', { name: body.name, email: body.email, hasPassword: !!body.password });

        const { name, email, password, role } = body;

        if (!name || !email || !password) {
            console.log('Missing required fields');
            return NextResponse.json(
                { success: false, error: 'Please provide all required fields' },
                { status: 400 }
            );
        }

        // Check existing user
        const existingUser = await User.findOne({ email });
        console.log('Existing user check:', existingUser ? 'User exists' : 'No existing user');

        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'User already exists with this email' },
                { status: 400 }
            );
        }

        // Create user
        console.log('Creating new user...');
        const newUser = await User.create({
            name,
            email,
            password, // Note: In production, password should be hashed
            role: role || 'user',
        });

        console.log('DB: User registered successfully:', newUser._id, newUser.email);

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
        console.error('Error details:', error.message, error.stack);
        return NextResponse.json(
            { success: false, error: error.message || 'Registration failed' },
            { status: 500 }
        );
    }
}
