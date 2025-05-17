// src/components/Map/LiveMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LiveMap = ({ buses }) => {
    const defaultCenter = [27.7172, 85.3240]; // kathmandu as fallback
    // Calculate center based on active buses
    const getMapCenter = () => {
        const busLocations = Object.values(buses);
        if (busLocations.length === 0) return defaultCenter;

        const avgLat = busLocations.reduce((sum, loc) => sum + loc.lat, 0) / busLocations.length;
        const avgLng = busLocations.reduce((sum, loc) => sum + loc.lng, 0) / busLocations.length;
        return [avgLat, avgLng];
    };

    return (
        <MapContainer
            center={getMapCenter()}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {Object.entries(buses).map(([busId, location]) => (
                <Marker key={busId} position={[location.lat, location.lng]}>
                    <Popup>Bus {busId}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default LiveMap;