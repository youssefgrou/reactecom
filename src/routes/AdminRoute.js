// src/routes/AdminRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import swal from 'sweetalert2';

const AdminRoute = () => {
    const authRole = localStorage.getItem('auth_role');
    if (authRole !== '1') {
        swal.fire("Error", "You are not an admin!", "error");
        return <Navigate to="/home" />;
    }
    return <Outlet />;
}

export default AdminRoute;
