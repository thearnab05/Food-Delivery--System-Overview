// import model from '../models/model.js'
import model from '../models/model.js'
import mongoose from 'mongoose';

const registerUser = async(req, res) => {
    try{
        // Check database connection
        if (mongoose.connection.readyState !== 1) {
            console.error('Database not connected during registration');
            return res.status(503).json({ error: "Database connection error. Please try again later." });
        }

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Additional validation
        if (username.trim().length < 2) {
            return res.status(400).json({ error: "Username must be at least 2 characters long" });
        }

        if (!email.includes('@') || !email.includes('.')) {
            return res.status(400).json({ error: "Please enter a valid email address" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        console.log(`Registration attempt for username: ${username}, email: ${email}`);

        const data = {
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password: password
        }

        const saveData = new model(data);
        await saveData.save();

        console.log(`User registered successfully: ${username}`);
        res.status(200).json({ message: "Data Saved", success: true });
    }
    catch (error){
        console.error('Registration error:', error);
        if (error.code === 11000) {
            res.status(400).json({ error: "Username or email already exists" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

const login = async(req, res) => {
    try{
        // Check database connection
        if (mongoose.connection.readyState !== 1) {
            console.error('Database not connected during login');
            return res.status(503).json({ error: "Database connection error. Please try again later." });
        }

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        // Additional validation
        if (username.trim().length < 2) {
            return res.status(400).json({ error: "Please enter a valid username" });
        }

        console.log(`Login attempt for username: ${username}`);

        const findData = await model.findOne({username: username.trim()});
        if(findData){
            if(findData.password === password){
                console.log(`Login successful for username: ${username}`);
                res.status(200).json({
                    message: "Login successful",
                    success: true,
                    user: {
                        username: findData.username,
                        email: findData.email
                    }
                });
            }
            else{
                console.log(`Login failed - wrong password for username: ${username}`);
                res.status(400).json({ error: "Password does not match" });
            }
        } else {
            res.status(400).json({ error: "User does not exist" });
        }
    } catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const fetchAllData = async(req, res) => {
    try {
        // Check database connection
        if (mongoose.connection.readyState !== 1) {
            console.error('Database not connected during fetchAllData');
            return res.status(503).json({ error: "Database connection error. Please try again later." });
        }

        const data = await model.find();
        res.status(200).json(data);
    } catch (error) {
        console.error('fetchAllData error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Basic checkout handler to simulate a payment/checkout flow
// Expects: { items: [{id, name, price, quantity}], customerInfo: {...}, paymentMethod: 'cod'|'card', total: number }
const checkout = async(req, res) => {
    try {
        // Check database connection
        if (mongoose.connection.readyState !== 1) {
            console.error('Database not connected during checkout');
            return res.status(503).json({ success: false, error: "Database connection error. Please try again later." });
        }

        const { items, customerInfo, paymentMethod, total } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, error: "Cart is empty" });
        }
        if (!customerInfo || !customerInfo.name || !customerInfo.phone || !customerInfo.address || !customerInfo.email) {
            return res.status(400).json({ success: false, error: "Customer information is incomplete" });
        }
        if (!paymentMethod || !["cod", "card"].includes(paymentMethod)) {
            return res.status(400).json({ success: false, error: "Invalid payment method" });
        }

        // Simulate basic payment authorization for non-COD
        if (paymentMethod === "card") {
            // Simulate a delay or external call here if needed
        }

        // In a real app, you would persist an order here
        const orderId = `ORD-${Date.now()}`;

        console.log(`Checkout successful for order: ${orderId}, total: ${total}`);
        return res.status(200).json({
            success: true,
            message: paymentMethod === 'cod' ? 'Order placed with Cash on Delivery' : 'Payment authorized and order placed',
            orderId,
            total
        });
    } catch (error) {
        console.error('Checkout error:', error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
}

export { registerUser, login, fetchAllData, checkout };