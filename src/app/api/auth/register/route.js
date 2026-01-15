import connectDB from '@/lib/db';
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

        // Mock Check existing user
        if (!global.mockUsers) global.mockUsers = [];

        const existingUser = global.mockUsers.find(u => u.email === email);
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'User already exists' },
                { status: 400 }
            );
        }

        // Mock Create user
        const newUser = {
            _id: Date.now().toString(),
            name,
            email,
            password, // Storing plain text for mock
            role: role || 'user',
            createdAt: new Date()
        };

        global.mockUsers.push(newUser);
        console.log('MOCK DB: User registered:', newUser);

        return NextResponse.json({
            success: true,
            message: 'User registered successfully (MOCK)',
            data: newUser,
        });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Registration failed' },
            { status: 500 }
        );
    }
}
