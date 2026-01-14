// Quick test script for food items API
import fetch from 'node-fetch';

async function testAPI() {
  try {
    console.log('Testing food items API...');

    // Test all food items
    const response = await fetch('http://localhost:4000/api/food-items');
    const data = await response.json();

    console.log('✅ API Response:', {
      success: data.success,
      count: data.count,
      firstItem: data.data?.[0]?.name
    });

    // Test categories
    const catResponse = await fetch('http://localhost:4000/api/categories');
    const catData = await catResponse.json();

    console.log('✅ Categories Response:', {
      success: catData.success,
      count: catData.count
    });

    // Test breakfast items
    const breakfastResponse = await fetch('http://localhost:4000/api/food-items/meal/breakfast');
    const breakfastData = await breakfastResponse.json();

    console.log('✅ Breakfast Items:', {
      success: breakfastData.success,
      count: breakfastData.count
    });

  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

testAPI();