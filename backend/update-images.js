import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FoodItem from './models/foodItem.js';

dotenv.config();

async function checkAndUpdateImages() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to database');

    const items = await FoodItem.find({}, 'id name image').sort({ id: 1 });

    console.log('📸 Current food item images:');
    console.log('=====================================');

    // Define better image URLs based on food names
    const imageMap = {
      // Breakfast
      1: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop&q=80", // Masala Dosa
      2: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop&q=80", // Idli Sambar
      3: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop&q=80", // Pancakes
      4: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop&q=80", // Omelette

      // Lunch
      5: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae391?w=400&h=300&fit=crop&q=80", // Butter Chicken
      6: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80", // Paneer Tikka Masala
      7: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop&q=80", // Pad Thai
      8: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&q=80", // Grilled Salmon
      9: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop&q=80", // Caesar Salad
      10: "https://images.unsplash.com/photo-1529003926-51e9d9c8b3a8?w=400&h=300&fit=crop&q=80", // Chicken Shawarma
      11: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop&q=80", // Sushi Platter
      12: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80", // Mediterranean Quinoa Bowl

      // Dinner
      17: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&q=80", // Dal Makhani
      18: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&q=80", // Chicken Biryani
      19: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&q=80", // Lasagna
      20: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&q=80", // Beef Stroganoff
      21: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop&q=80", // Truffle Mushroom Risotto
      22: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&q=80", // Grilled Ribeye Steak
      23: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&h=300&fit=crop&q=80", // Seafood Paella
      24: "https://images.unsplash.com/photo-1544378730-6f3c834d9b2d?w=400&h=300&fit=crop&q=80", // Duck Confit
      25: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop&q=80", // Thai Green Curry
      26: "https://images.unsplash.com/photo-1541599468348-e96984315621?w=400&h=300&fit=crop&q=80", // Lamb Tagine
      27: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop&q=80", // Vegetable Stir Fry
      28: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop&q=80"  // Lobster Thermidor
    };

    let updatedCount = 0;

    for (const item of items) {
      const currentImage = item.image;
      const newImage = imageMap[item.id];

      console.log(`${item.id}. ${item.name}`);
      console.log(`   Current: ${currentImage}`);

      if (newImage && currentImage !== newImage) {
        await FoodItem.updateOne({ id: item.id }, { image: newImage });
        console.log(`   ✅ Updated to: ${newImage}`);
        updatedCount++;
      } else {
        console.log(`   ✓ Already correct`);
      }
      console.log('');
    }

    console.log(`🎯 Image update summary:`);
    console.log(`   Total items checked: ${items.length}`);
    console.log(`   Items updated: ${updatedCount}`);
    console.log(`   Items already correct: ${items.length - updatedCount}`);

    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkAndUpdateImages();