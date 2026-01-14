import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FoodItem from './models/foodItem.js';

dotenv.config();

async function checkAndRemoveDuplicates() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to database');

    const totalItems = await FoodItem.countDocuments();
    console.log('📊 Total food items before cleanup:', totalItems);

    // Find duplicates by id
    const duplicates = await FoodItem.aggregate([
      { $group: { _id: '$id', count: { $sum: 1 }, docs: { $push: '$_id' } } },
      { $match: { count: { $gt: 1 } } }
    ]);

    console.log('🔍 Duplicate groups found:', duplicates.length);

    if (duplicates.length > 0) {
      console.log('📋 Duplicates:');
      let totalDuplicatesRemoved = 0;

      for (const dup of duplicates) {
        console.log(`ID ${dup._id}: ${dup.count} copies`);

        // Keep the first document, remove the rest
        const docsToRemove = dup.docs.slice(1); // Skip the first one
        const result = await FoodItem.deleteMany({ _id: { $in: docsToRemove } });
        totalDuplicatesRemoved += result.deletedCount;

        console.log(`  ✅ Removed ${result.deletedCount} duplicates for ID ${dup._id}`);
      }

      console.log(`\n🧹 Total duplicates removed: ${totalDuplicatesRemoved}`);

      const finalCount = await FoodItem.countDocuments();
      console.log('📊 Final food items count:', finalCount);
    } else {
      console.log('✨ No duplicates found - database is clean!');
    }

    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkAndRemoveDuplicates();