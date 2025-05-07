import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true
    },
    seats: [{
        type: String,
        required: true
    }],
    travelDate: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Confirmed', 'Cancelled', 'Completed'],
        default: 'Confirmed'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    cancelledAt: {
        type: Date
    }
});


export const Booking = mongoose.model('Booking', bookingSchema);
