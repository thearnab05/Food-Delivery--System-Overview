import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import connectDB from './db/db.js';
import cors from 'cors';
import route from './routes/route.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
    origin: true, // Allow all origins
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Basic health check (no database required)
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Routes
app.use('/api', route);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Food App Backend Server',
        status: 'running',
        port: PORT,
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

const startServer = async () => {
    try {
        console.log('🚀 Starting Food App Backend Server...');
        console.log(`📡 Port: ${PORT}`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);

        // Connect to database first
        console.log('📊 Connecting to database...');
        const dbConnected = await connectDB();

        if (!dbConnected) {
            console.error('❌ Failed to connect to database. Server will not start.');
            process.exit(1);
        }

        // Start server only after database is connected
        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log('✅ Server started successfully!');
            console.log(`🌐 Server running at: http://localhost:${PORT}`);
            console.log(`🔗 API endpoints available at: http://localhost:${PORT}/api`);
            console.log(`💚 Health check: http://localhost:${PORT}/health`);
            console.log('🎉 Ready to accept connections!');
        });

        // Handle server errors
        server.on('error', (error) => {
            console.error('❌ Server error:', error);
            process.exit(1);
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            console.log('🛑 Received SIGINT, shutting down gracefully...');
            server.close(async () => {
                console.log('✅ Server closed');
                await mongoose.connection.close();
                process.exit(0);
            });
        });

        process.on('SIGTERM', async () => {
            console.log('🛑 Received SIGTERM, shutting down gracefully...');
            server.close(async () => {
                console.log('✅ Server closed');
                await mongoose.connection.close();
                process.exit(0);
            });
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

startServer();  