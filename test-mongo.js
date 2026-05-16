const mongoose = require('mongoose');

const uri = "mongodb+srv://arnabsural1890:Group%401234@asconnect.axvuhxc.mongodb.net/food-delivery?retryWrites=true&w=majority";

async function run() {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB!");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Connection failed:", error.message);
    console.error(error);
  }
}

run();
