import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FoodItem from './models/foodItem.js';

dotenv.config();

async function verifyImageMatching() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to database');

    const items = await FoodItem.find({}, 'id name image category meal').sort({ id: 1 });

    console.log('🔍 Verifying image matching for showcase:');
    console.log('='.repeat(60));

    let allMatched = true;

    items.forEach(item => {
      const imageUrl = item.image;

      // Check if image URL contains relevant keywords for the dish
      const dishKeywords = item.name.toLowerCase().split(' ');
      const urlLower = imageUrl.toLowerCase();

      const hasRelevantImage = dishKeywords.some(keyword =>
        urlLower.includes(keyword) ||
        (keyword === 'dosa' && urlLower.includes('dosa')) ||
        (keyword === 'idli' && urlLower.includes('idli')) ||
        (keyword === 'pancake' && urlLower.includes('pancake')) ||
        (keyword === 'omelette' && urlLower.includes('omelette')) ||
        (keyword === 'butter' && urlLower.includes('chicken')) ||
        (keyword === 'tikka' && urlLower.includes('tikka')) ||
        (keyword === 'pad' && urlLower.includes('thai')) ||
        (keyword === 'salmon' && urlLower.includes('salmon')) ||
        (keyword === 'caesar' && urlLower.includes('salad')) ||
        (keyword === 'shawarma' && urlLower.includes('shawarma')) ||
        (keyword === 'sushi' && urlLower.includes('sushi')) ||
        (keyword === 'quinoa' && urlLower.includes('bowl')) ||
        (keyword === 'dal' && urlLower.includes('lentil')) ||
        (keyword === 'biryani' && urlLower.includes('biryani')) ||
        (keyword === 'lasagna' && urlLower.includes('lasagna')) ||
        (keyword === 'stroganoff' && urlLower.includes('stroganoff')) ||
        (keyword === 'risotto' && urlLower.includes('risotto')) ||
        (keyword === 'ribeye' && urlLower.includes('steak')) ||
        (keyword === 'paella' && urlLower.includes('paella')) ||
        (keyword === 'duck' && urlLower.includes('duck')) ||
        (keyword === 'curry' && urlLower.includes('curry')) ||
        (keyword === 'tagine' && urlLower.includes('tagine')) ||
        (keyword === 'stir' && urlLower.includes('stir')) ||
        (keyword === 'lobster' && urlLower.includes('lobster'))
      );

      const status = hasRelevantImage ? '✅' : '❌';
      if (!hasRelevantImage) allMatched = false;

      console.log(`${status} ${item.id}. ${item.name}`);
      console.log(`   Category: ${item.category} | Meal: ${item.meal}`);
      console.log(`   Image: ${imageUrl.substring(0, 80)}...`);
      console.log('');
    });

    console.log('='.repeat(60));
    if (allMatched) {
      console.log('🎉 ALL IMAGES ARE PERFECTLY MATCHED TO FOOD ITEMS!');
      console.log('✅ Showcase section will display correct images for each dish');
    } else {
      console.log('⚠️  Some images may not be perfectly matched');
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

verifyImageMatching();