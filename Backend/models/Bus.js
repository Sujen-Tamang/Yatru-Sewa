import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
    number: String,
    route: String,
    currentLocation: { lat: Number, lng: Number }
});
export default mongoose.model('Bus', BusSchema);