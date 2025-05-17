import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../utils/socket';

const DriverPage = () => {
    const { busId } = useParams();
    const [isSharing, setIsSharing] = useState(false);
    const [error, setError] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);
    const [watchId, setWatchId] = useState(null);

    // Styles
    const styles = {
        app: {
            fontFamily: 'Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px'
        },
        header: {
            textAlign: 'center',
            marginBottom: '30px'
        },
        title: {
            color: '#2c3e50'
        },
        toggleButton: {
            padding: '8px 16px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        },
        driverContainer: {
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        input: {
            padding: '10px',
            margin: '10px 0',
            width: '100%',
            boxSizing: 'border-box'
        },
        button: {
            padding: '12px 24px',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            margin: '10px 0'
        },
        error: {
            color: 'red',
            marginTop: '10px'
        },
        locationInfo: {
            marginTop: '20px',
            backgroundColor: '#f5f5f5',
            padding: '10px',
            borderRadius: '4px'
        }
    };

    // Connect socket when component mounts
    useEffect(() => {
        socket.connect();
        return () => {
            socket.disconnect();
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, [watchId]);

    const toggleSharing = () => {
        if (!isSharing) {
            startSharing();
        } else {
            stopSharing();
        }
    };

    const startSharing = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        const id = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ lat: latitude, lng: longitude });

                socket.emit('driver-location-update', {
                    busId,
                    location: { lat: latitude, lng: longitude }
                });
            },
            (err) => setError(err.message),
            { enableHighAccuracy: true, maximumAge: 10000 }
        );

        setWatchId(id);
        setIsSharing(true);
    };

    const stopSharing = () => {
        if (watchId) {
            navigator.geolocation.clearWatch(watchId);
            setWatchId(null);
        }
        setIsSharing(false);
        setCurrentLocation(null);
    };

    return (
        <div style={styles.app}>
            <div style={styles.header}>
                <h1 style={styles.title}>Bus Driver Dashboard</h1>
                <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Bus ID: {busId}</p>
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <button
                onClick={toggleSharing}
                style={{
                    ...styles.button,
                    backgroundColor: isSharing ? '#ff4444' : '#4CAF50'
                }}
            >
                {isSharing ? 'Stop Sharing' : 'Start Sharing Location'}
            </button>

            {currentLocation && (
                <div style={styles.locationInfo}>
                    <p>Latitude: {currentLocation.lat.toFixed(6)}</p>
                    <p>Longitude: {currentLocation.lng.toFixed(6)}</p>
                </div>
            )}
        </div>
    );
};

export default DriverPage;