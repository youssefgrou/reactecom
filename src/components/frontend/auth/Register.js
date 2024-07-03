import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from 'axios';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState({});

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password
        };

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_name", res.data.username);
                    swal.fire("Success", res.data.message, "success");
                    navigate('/home');
                } else {
                    setError(res.data.validation_errors);
                }
            });
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="card">
                            <div className="card-header">
                                <h4>Register</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={registerSubmit}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="name">Full Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={registerInput.name} className="form-control" />
                                        <span className="text-danger">{error.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={registerInput.email} className="form-control" />
                                        <span className="text-danger">{error.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control" />
                                        <span className="text-danger">{error.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-success">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
