// import React, { useState } from "react";
// import Navbar from "../../../layouts/frontend/Navbar";
// import axios from 'axios';
// import swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//     const navigate = useNavigate();

//     const [loginInput, setLogin] = useState({
//         email: '',
//         password: '',
//         error_list: {},
//     });

//     const [loading, setLoading] = useState(false);

//     const handleInput = (e) => {
//         e.persist();
//         setLogin({ ...loginInput, [e.target.name]: e.target.value });
//     }

//     const loginSubmit = (e) => {
//         e.preventDefault();
//         setLoading(true);

//         const data = {
//             email: loginInput.email,
//             password: loginInput.password
//         };

//         axios.get('/sanctum/csrf-cookie').then(response => {
//             axios.post(`/api/login`, data).then(res => {
//                 if (res.data.status === 200) {
//                     localStorage.setItem("auth_token", res.data.token);
//                     localStorage.setItem("auth_name", res.data.username);
//                     swal.fire("Success", res.data.message, "success");
//                     navigate('/home');
//                 } else if (res.data.status === 401) {
//                     swal.fire("Warning", res.data.message, "warning");
//                 } else {
//                     setLogin({ ...loginInput, error_list: res.data.validation_errors });
//                 }
//             }).finally(() => {
//                 setLoading(false);
//             });
//         }).catch(error => {
//             console.error("Error:", error);
//             swal.fire("Error", "An error occurred while processing your request.", "error");
//             setLoading(false);
//         });
//     }

//     return (
//         <div>
//             <Navbar />
//             <div className="container py-5">
//                 <div className="row">
//                     <div className="col-md-6 mx-auto">
//                         <div className="card">
//                             <div className="card-header">
//                                 <h4>Login</h4>
//                             </div>
//                             <div className="card-body">
//                                 <form onSubmit={loginSubmit}>
//                                     <div className="form-group mb-3">
//                                         <label htmlFor="email">Email</label>
//                                         <input
//                                             type="text"
//                                             name="email"
//                                             onChange={handleInput}
//                                             value={loginInput.email}
//                                             className="form-control"
//                                         />
//                                         <span className="text-danger">{loginInput.error_list.email}</span>
//                                     </div>
//                                     <div className="form-group mb-3">
//                                         <label htmlFor="password">Password</label>
//                                         <input
//                                             type="password"
//                                             name="password"
//                                             onChange={handleInput}
//                                             value={loginInput.password}
//                                             className="form-control"
//                                         />
//                                         <span className="text-danger">{loginInput.error_list.password}</span>
//                                     </div>
//                                     <div className="form-group mb-3">
//                                         <button type="submit" className="btn btn-success" disabled={loading}>
//                                             {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Login'}
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Login;
import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from 'axios';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: {},
    });

    const [loading, setLoading] = useState(false);

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            email: loginInput.email,
            password: loginInput.password
        };

        axios.get('/sanctum/csrf-cookie').then(res => {
            axios.post(`/api/login`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_name", res.data.username);
                    localStorage.setItem("auth_role", res.data.role); 
                    swal.fire("Success", res.data.message, "success");
                    
                    if(res.data.roles === 'admin'){
                        navigate('/home');
                    }
                    else{
                        navigate('/home');
                    }

                } else if (res.data.status === 401) {
                    swal.fire("Warning", res.data.message, "warning");
                } else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors });
                }
            }).finally(() => {
                setLoading(false);
            });
        }).catch(error => {
            console.error("Error:", error);
            swal.fire("Error", "An error occurred while processing your request.", "error");
            setLoading(false);
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
                                <h4>Login</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={loginSubmit}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            onChange={handleInput}
                                            value={loginInput.email}
                                            className="form-control"
                                        />
                                        <span className="text-danger">{loginInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={handleInput}
                                            value={loginInput.password}
                                            className="form-control"
                                        />
                                        <span className="text-danger">{loginInput.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-success" disabled={loading}>
                                            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Login'}
                                        </button>
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

export default Login;
