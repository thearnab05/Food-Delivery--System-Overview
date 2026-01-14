import mongoose from 'mongoose';

const connectDB = async () => {
    console.log("Attempting to connect to MongoDB...");
    console.log("MONGO_URI:", process.env.MONGO_URI ? "Set" : "Not set");

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);

        // Test the connection
        await mongoose.connection.db.admin().ping();
        console.log('✅ Database ping successful');

        return true;
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        console.error('❌ Full error:', error);
        return false;
    }
}

export default connectDB;  