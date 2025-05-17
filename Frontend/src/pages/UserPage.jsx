import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket';
import LiveMap from '../components/Map/LiveMap';

const UserPage = () => {
    const [buses, setBuses] = useState({});
    const [isConnected, setIsConnected] = useState(false);

    // Inline Styles
    const styles = {
        container: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            maxWidth: '1200px',
            margin: '0 auto'
        },
        header: {
            color: '#2c3e50',
            marginBottom: '10px'
        },
        status: {
            color: isConnected ? '#27ae60' : '#e74c3c',
            fontWeight: 'bold',
            marginBottom: '20px'
        },
        mapContainer: {
            height: '60vh',
            width: '100%',
            margin: '20px 0',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        busList: {
            backgroundColor: '#f9f9f9',
            padding: '15px',
            borderRadius: '8px',
            marginTop: '20px'
        },
        busListHeader: {
            marginTop: '0',
            color: '#34495e'
        },
        busListUl: {
            listStyle: 'none',
            padding: '0',
            margin: '0'
        },
        busItem: {
            padding: '8px 0',
            borderBottom: '1px solid #eee',
            display: 'flex',
            alignItems: 'center'
        },
        busIcon: {
            display: 'inline-block',
            width: '12px',
            height: '12px',
            backgroundColor: '#3498db',
            borderRadius: '50%',
            marginRight: '10px'
        }
    };

    useEffect(() => {
        socket.connect();

        socket.on('connect', () => {
            setIsConnected(true);
            socket.emit('request-buses');
        });

        socket.on('bus-location-update', ({ busId, location }) => {
            setBuses(prev => ({ ...prev, [busId]: location }));
        });

        socket.on('active-buses', (data) => {
            setBuses(data);
        });

        return () => {
            socket.off('bus-location-update');
            socket.off('active-buses');
            socket.disconnect();
        };
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Live Bus Tracking</h1>
            <p style={styles.status}>
                Status: {isConnected ? 'Connected' : 'Disconnected'}
            </p>

            <div style={styles.mapContainer}>
                <LiveMap buses={buses} />
            </div>

            <div style={styles.busList}>
                <h3 style={styles.busListHeader}>
                    Active Buses ({Object.keys(buses).length})
                </h3>
                <ul style={styles.busListUl}>
                    {Object.entries(buses).map(([busId]) => (
                        <li key={busId} style={styles.busItem}>
                            <span style={styles.busIcon}></span>
                            Bus {busId}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserPage;