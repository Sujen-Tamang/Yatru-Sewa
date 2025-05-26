import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import io from 'socket.io-client';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const socket = io('http://localhost:4000', {
    path: '/socket.io',
    withCredentials: true,
});

const BusTracking = () => {
    const { busId } = useParams();
    const [bus, setBus] = useState(null);
    const [position, setPosition] = useState([27.7172, 85.3240]); // Default: Kathmandu
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch initial bus details
        const fetchBus = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/buses/${busId}/seats`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                if (response.data.success) {
                    setBus(response.data.data);
                    if (response.data.data.currentLocation?.lat && response.data.data.currentLocation?.lng) {
                        setPosition([response.data.data.currentLocation.lat, response.data.data.currentLocation.lng]);
                    }
                } else {
                    setError(response.data.message || 'Failed to fetch bus details');
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching bus details');
            }
        };

        fetchBus();

        // Join bus tracking room
        socket.emit('trackBus', busId);

        // Listen for location updates
        socket.on('busLocationUpdate', (data) => {
            if (data.busId === busId) {
                setBus((prev) => ({ ...prev, ...data }));
                setPosition([data.currentLocation.lat, data.currentLocation.lng]);
            }
        });

        // Handle Socket.IO errors
        socket.on('error', ({ message }) => {
            setError(message);
        });

        // Cleanup on unmount
        return () => {
            socket.off('busLocationUpdate');
            socket.off('error');
        };
    }, [busId]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Live Bus Tracking</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {bus ? (
                <div>
                    <p>
                        <strong>Bus:</strong> {bus.yatayatName} ({bus.busNumber})
                    </p>
                    <p>
                        <strong>Route:</strong> {bus.route.from} to {bus.route.to}
                    </p>
                    <p>
                        <strong>Available Seats:</strong> {bus.availableSeats}
                    </p>
                    <p>
                        <strong>Last Updated:</strong>{' '}
                        {bus.currentLocation?.updatedAt
                            ? new Date(bus.currentLocation.updatedAt).toLocaleString()
                            : 'N/A'}
                    </p>
                </div>
            ) : (
                <p>Loading bus information...</p>
            )}
            <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {bus?.currentLocation?.lat && bus?.currentLocation?.lng && (
                    <Marker position={position}>
                        <Popup>
                            {bus.yatayatName} ({bus.busNumber})<br />
                            {bus.route.from} to {bus.route.to}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default BusTracking;