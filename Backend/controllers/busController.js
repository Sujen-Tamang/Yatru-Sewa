// controllers/busController.js
import Bus from '../models/Bus.js';

// Get all buses
export const getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching buses', error });
    }
};

// Get bus by ID
export const getBusById = async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        res.json(bus);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bus', error });
    }
};

// Create a new bus
export const createBus = async (req, res) => {
    try {
        const { number, route, currentLocation } = req.body;
        const newBus = new Bus({ number, route, currentLocation });
        await newBus.save();
        res.status(201).json({ message: 'Bus created successfully', bus: newBus });
    } catch (error) {
        res.status(500).json({ message: 'Error creating bus', error });
    }
};

// Update bus location
export const updateBusLocation = async (req, res) => {
    try {
        const { lat, lng } = req.body;
        const bus = await Bus.findById(req.params.id);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        bus.currentLocation = { lat, lng };
        await bus.save();
        res.json({ message: 'Bus location updated', bus });
    } catch (error) {
        res.status(500).json({ message: 'Error updating bus location', error });
    }
};
