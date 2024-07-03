import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css'; // Import custom CSS

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [bestOrders, setBestOrders] = useState([]);

    useEffect(() => {
        let isMounted = true;
        document.title = "Best Orders by Quantity";

        axios.get('/api/admin/best-orders')
            .then(res => {
                if (isMounted && res.data.status === 200) {
                    setBestOrders(res.data.bestOrders);
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error("There was an error fetching the best orders: ", error);
                setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return <h4>Loading Best Orders...</h4>;
    }

    const data = {
        labels: bestOrders.map(order => order.product_name),
        datasets: [
            {
                label: 'Total Quantity',
                data: bestOrders.map(order => order.total_qty),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Maintain a consistent aspect ratio
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Best Orders by Quantity',
            },
        },
        
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h2>Best Orders</h2>
                </div>
                <div className="card-body">
                    <div className="chart-container-small">
                        <Bar data={data} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
