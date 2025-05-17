import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import routes from './routes/index.js';
import Bus from './models/Bus.js';

// Initialize Express and environment variables
export const app = express();
dotenv.config();

// Create HTTP server and Socket.IO instance
export const server = createServer(app);
export const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    },
    path: '/socket.io',
});

// Database connection
connectDB().catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
});

// Middlewares
app.use(
    cors({
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', routes);

// Socket.IO Logic for Bus Tracking
io.on('connection', (socket) => {
    console.log('Socket.IO client connected:', socket.id);

    // Driver location update
    socket.on('driver-location-update', async ({ busId, location }) => {
        if (!mongoose.Types.ObjectId.isValid(busId) || !location?.lat || !location?.lng) {
            socket.emit('error', { message: 'Invalid bus ID or location data' });
            return;
        }

        try {
            const updatedBus = await Bus.findByIdAndUpdate(
                busId,
                {
                    $set: {
                        currentLocation: { lat: location.lat, lng: location.lng, updatedAt: new Date() },
                    },
                },
                { new: true }
            ).select('busNumber yatayatName route currentLocation');

            if (!updatedBus) {
                socket.emit('error', { message: 'Bus not found' });
                return;
            }

            // Broadcast to clients tracking this bus
            io.to(busId).emit('bus-location-update', {
                busId,
                location: updatedBus.currentLocation,
            });
        } catch (err) {
            socket.emit('error', { message: 'Failed to update location' });
        }
    });

    // User joins a bus tracking room
    socket.on('trackBus', (busId) => {
        if (mongoose.Types.ObjectId.isValid(busId)) {
            socket.join(busId);
            console.log(`Client ${socket.id} joined bus room: ${busId}`);
        } else {
            socket.emit('error', { message: 'Invalid bus ID' });
        }
    });

    // User requests all active buses
    socket.on('request-buses', async () => {
        try {
            const buses = await Bus.find({ active: true })
                .select('busNumber yatayatName route currentLocation')
                .lean();
            const busLocations = buses.reduce((acc, bus) => {
                if (bus.currentLocation?.lat && bus.currentLocation?.lng) {
                    acc[bus._id] = bus.currentLocation;
                }
                return acc;
            }, {});
            socket.emit('active-buses', busLocations);
        } catch (err) {
            socket.emit('error', { message: 'Failed to fetch active buses' });
        }
    });

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('Socket.IO client disconnected:', socket.id);
    });
});

// Error middleware
app.use(errorMiddleware);