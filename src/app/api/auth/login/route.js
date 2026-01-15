import connectDB from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: 'Please provide email and password' },
                { status: 400 }
            );
        }

        // Mock Find user
        if (!global.mockUsers) global.mockUsers = [];

        const user = global.mockUsers.find(u => u.email === email);

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Mock Verify password
        const isMatch = password === user.password;

        if (!isMatch) {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Return user info (excluding password)
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        return NextResponse.json({
            success: true,
            message: 'Login successful (MOCK)',
            data: userData,
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Login failed' },
            { status: 500 }
        );
    }
}
