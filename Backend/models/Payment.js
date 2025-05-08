import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({ user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    pidx: { // Khalti's unique payment identifier
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['initiated', 'completed', 'failed'],
        default: 'initiated'
    },
    payment_method: {
        type: String,
        enum: ['khalti', 'COA'],
        required: true
    },
    transaction_id: String, // Khalti transaction ID
    refunded: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Payment = mongoose.model('Payment', paymentSchema);
