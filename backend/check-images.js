import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FoodItem from './models/foodItem.js';

dotenv.config();

async function checkImages() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to database');

    const items = await FoodItem.find({}, 'id name image').sort({ id: 1 }).limit(5);

    console.log('🔍 Sample of actual images in database:');
    console.log('='.repeat(60));

    items.forEach(item => {
      console.log(`${item.id}. ${item.name}`);
      console.log(`   Image: ${item.image}`);
      console.log('');
    });

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkImages();