import React, { useEffect, useState } from 'react';
import './App.css'; // Ensure this imports your CSS

const PackageTracker = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [placeholder, setPlaceholder] = useState('Enter tracking number or user name...');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('https://my.api.mockaroo.com/orders.json?key=e49e6840');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data); // Log the fetched data for debugging
                setOrders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 750) {
                setPlaceholder('Tracking number/username');
            } else {
                setPlaceholder('Enter tracking number or user name...');
            }
        };

        // Set the initial placeholder based on the current window size
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
        
        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const generateContent = () => {
        if (searchTerm.trim() === '') {
            return []; // Return empty array if no search term
        }

        const filteredOrders = orders.filter(order => {
            const isParcelIdSearch = !isNaN(searchTerm) && searchTerm.trim() !== '';

            if (isParcelIdSearch) {
                return order.parcel_id.toString() === searchTerm.trim(); // Ensure it compares as string
            } else {
                return order.user_name.toLowerCase().includes(searchTerm.toLowerCase());
            }
        });

        return filteredOrders.map(order => (
            <div key={order.id}>
                <h3>Order ID: {order.id}</h3>
                <p>Status: {order.status}</p>
                <p>Parcel ID: {order.parcel_id}</p>
                <p>Tracking Number: {order.tracking_number}</p>
                <p>Carrier: {order.carrier}</p>
                <p>User Name: {order.user_name}</p>
            </div>
        ));
    };

    if (loading) return <div className="loading text-center">Loading...</div>;
    if (error) return <div className='text-center'>Error: {error}</div>;

    return (
        <div className='content text-center'>            
            <input
                type="text"
                placeholder={placeholder} // Use dynamic placeholder
                value={searchTerm}
                onChange={handleSearchChange}
                className='inputField'
            />
            <ul>
                {generateContent()} {/* Only shows results if searchTerm is not empty */}
            </ul>
        </div>
    );
};

export default PackageTracker;
