import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../layouts/frontend/Navbar';

const ThankYou = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const fetchedUserName = response.data.username;

                setUserName(fetchedUserName);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
        <Navbar />
        <div className="container">
            <div className="my-4">
                <h2 className="text-center">Hi {userName}, Thank You for Your Order!</h2>
                <p className="text-center">Your order has been successfully placed.</p>
            </div>
        </div>
        </>
    );
}

export default ThankYou;
