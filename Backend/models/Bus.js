import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
    id: { type: Number, required: true },            // Unique identifier for the bus
    from: { type: String, required: true },          // Starting point of the route
    to: { type: String, required: true },            // Destination of the route
    distance: { type: String, required: true },      // Distance between the two points (e.g., "140 miles")
    duration: { type: String, required: true },      // Duration of the journey (e.g., "3h 00m")
    price: { type: Number, required: true },         // Price of the ticket
    active: { type: Boolean, default: true },        // Whether the bus route is active or not
    currentLocation: {
        lat: { type: Number, required: true },       // Latitude of the current location
        lng: { type: Number, required: true }        // Longitude of the current location
    }
});

// Create and export the Bus model
export default mongoose.model("Bus", BusSchema);
