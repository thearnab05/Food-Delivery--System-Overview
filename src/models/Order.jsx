import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    userEmail: {
        type: String,
        required: true,
        index: true,
    },
    items: [{
        id: Number,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
        category: String,
    }],
    customerInfo: {
        name: String,
        phone: String,
        address: String,
        email: String,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'confirmed',
        enum: ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'],
    },
}, { timestamps: true });

// Index for faster queries by user
OrderSchema.index({ userEmail: 1, createdAt: -1 });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
