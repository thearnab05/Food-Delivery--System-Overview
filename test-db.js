const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Manually parse .env.local
let MONGODB_URI = '';
try {
    const envPath = path.resolve(__dirname, '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/MONGODB_URI=(.*)/);
    if (match && match[1]) {
        MONGODB_URI = match[1].trim();
    }
} catch (e) {
    console.log('Error reading .env.local:', e.message);
}

if (!MONGODB_URI || MONGODB_URI.includes('<password>')) {
    console.log('Valid URI not found in .env.local, trying localhost...');
    MONGODB_URI = 'mongodb://127.0.0.1:27017/food-delivery';
}

console.log('Testing MongoDB connection...');
console.log('URI found:', !!MONGODB_URI);
if (MONGODB_URI) {
    console.log('URI:', MONGODB_URI.replace(/:([^@]+)@/, ':****@'));
} else {
    console.error('ERROR: MONGODB_URI not found in .env.local');
    process.exit(1);
}

mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log('SUCCESS: Connected to MongoDB!');
        process.exit(0);
    })
    .catch(err => {
        console.error('ERROR: Failed to connect to MongoDB');
        console.error(err.message);
        // Print cause if available
        if (err.cause) console.error('Cause:', err.cause);
        process.exit(1);
    });
