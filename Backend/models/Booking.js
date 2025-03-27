import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    busId: mongoose.Schema.Types.ObjectId,
    seatNumber: Number,
    timestamp: { type: Date, default: Date.now }
});
export default mongoose.model('Booking', BookingSchema);
