import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        uppercase: true
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookingDate: {
        type: Date
    }
}, { _id: false });

const busSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    route: {
        from: { type: String, required: true },
        to: { type: String, required: true },
        stops: [{ type: String }],
        distance: { type: Number, required: true }, // km
        duration: { type: Number, required: true } // hours
    },
    schedule: {
        departure: { type: String, required: true }, // "HH:MM"
        arrival: { type: String, required: true },   // "HH:MM"
        frequency: {
            type: String,
            enum: ['daily', 'weekly', 'monthly'],
            default: 'daily'
        }
    },
    seats: [seatSchema],
    totalSeats: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Generate seats before saving
busSchema.pre('save', function(next) {
    if (this.isNew) {
        const rows = Math.ceil(this.totalSeats / 4);
        this.seats = [];

        for (let row = 1; row <= rows; row++) {
            for (let col = 1; col <= 4; col++) {
                if (this.seats.length < this.totalSeats) {
                    this.seats.push({
                        number: `${row}${String.fromCharCode(64 + col)}`,
                        isBooked: false
                    });
                }
            }
        }
    }
    next();
});

export default mongoose.model('Bus', busSchema);