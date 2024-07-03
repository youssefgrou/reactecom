// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import swal from 'sweetalert2';
// import Navbar from '../../layouts/frontend/Navbar';

// function Checkout() {
//     const [checkoutInput, setCheckoutInput] = useState({
//         firstname: '',
//         lastname: '',
//         phone: '',
//         email: '',
//         address: '',
//         city: '',
//         state: '',
//         zipcode: '',
//         payment_mode: 'cod' // Default payment mode, can be updated based on user selection
//     });

//     const [error, setError] = useState({});
//     const [totalCartPrice, setTotalCartPrice] = useState(0);
//     const [cart, setCart] = useState([]);

//     useEffect(() => {
//         fetchCartData();
//     }, []);

//     const fetchCartData = () => {
//         const userId = localStorage.getItem('user_id');
//         const cartId = localStorage.getItem('cart_id');

//         axios.get(`/api/cart/${userId}/${cartId}`)
//             .then(res => {
//                 if (res.data.status === 200) {
//                     setCart(res.data.cart);
//                     calculateTotalPrice(res.data.cart);
//                 } else if (res.data.status === 401) {
//                     swal.fire("Error", res.data.message, "error");
//                 }
//             })
//             .catch(error => {
//                 console.error("Error fetching cart:", error);
//             });
//     };

//     const calculateTotalPrice = (cartItems) => {
//         let totalPrice = 0;
//         cartItems.forEach(item => {
//             totalPrice += item.product.selling_price * item.product_qty;
//         });
//         setTotalCartPrice(totalPrice);
//     };

//     const handleInput = (e) => {
//         const { name, value } = e.target;
//         setCheckoutInput({ ...checkoutInput, [name]: value });
//     };

//     const submitOrder = (e) => {
//         e.preventDefault();
//         axios.post('/api/place-order', checkoutInput)
//             .then(res => {
//                 if (res.data.status === 200) {
//                     swal.fire('Order Placed!', 'Your order has been submitted.', 'success');
//                     clearForm();
//                     fetchCartData(); // Refresh cart data after placing order
//                 } else if (res.data.status === 422) {
//                     setError(res.data.errors);
//                 } else {
//                     swal.fire('Error', res.data.message, 'error');
//                 }
//             })
//             .catch(error => {
//                 console.error('Error placing order:', error);
//                 swal.fire('Error', 'Failed to place order. Please try again later.', 'error');
//             });
//     };

//     const clearForm = () => {
//         setCheckoutInput({
//             firstname: '',
//             lastname: '',
//             phone: '',
//             email: '',
//             address: '',
//             city: '',
//             state: '',
//             zipcode: '',
//             payment_mode: 'cod'
//         });
//         setError({});
//     };

//     let checkout_HTML;
//     if (!cart || cart.length === 0) {
//         checkout_HTML = (
//             <div className="card card-body py-5 text-center shadow-sm">
//                 <h4>Your Shopping Cart is Empty. You are in Checkout Page.</h4>
//             </div>
//         );
//     } else {
//         checkout_HTML = (
//             <div className="row">
//                 <div className="col-md-7">
//                     <div className="card">
//                         <div className="card-header">
//                             <h4>Basic Information</h4>
//                         </div>
//                         <div className="card-body">
//                             <form onSubmit={submitOrder}>
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <div className="form-group mb-3">
//                                             <label>First Name</label>
//                                             <input
//                                                 type="text"
//                                                 name="firstname"
//                                                 onChange={handleInput}
//                                                 value={checkoutInput.firstname}
//                                                 className="form-control"
//                                             />
//                                             <small className="text-danger">{error.firstname}</small>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="form-group mb-3">
//                                             <label>Last Name</label>
//                                             <input
//                                                 type="text"
//                                                 name="lastname"
//                                                 onChange={handleInput}
//                                                 value={checkoutInput.lastname}
//                                                 className="form-control"
//                                             />
//                                             <small className="text-danger">{error.lastname}</small>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="form-group mb-3">
//                                             <label>Phone Number</label>
//                                             <input
//                                                 type="text"
//                                                 name="phone"
//                                                 onChange={handleInput}
//                                                 value={checkoutInput.phone}
//                                                 className="form-control"
//                                             />
//                                             <small className="text-danger">{error.phone}</small>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="form-group mb-3">
//                                             <label>Email Address</label>
//                                             <input
//                                                 type="email"
//                                                 name="email"
//                                                 onChange={handleInput}
//                                                 value={checkoutInput.email}
//                                                 className="form-control"
//                                             />
//                                             <small className="text-danger">{error.email}</small>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-12">
//                                         <div className="form-group mb-3">
//                                             <label>Full Address</label>
//                                             <textarea
//                                                 rows="3"
//                                                 name="address"
//                                                 onChange={handleInput}
//                                                 value={checkoutInput.address}
//                                                 className="form-control"
//                                             ></textarea>
//                                             <small className="text-danger">{error.address}</small>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="form-group mb-3">
//                                             <label>City</label>
//                                             <input
//                                                 type="text"
//                                                 name="city"
//                                                 onChange={handleInput}
//                                                 value={checkoutInput.city}
//                                                 className="form-control"
//                                             />
//                                             <small className="text-danger">{error.city}</small>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="form-group mb-3">
//                                             <label>State</label>
//                                             <input
//                                                 type="text"
//                                                 name="state"
//                                                 onChange={handleInput}
//                                                 value={checkoutInput.state}
//                                                 className="form-control"
//                                             />
//                                             <small className="text-danger">{error.state}</small>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="form-group mb-3">
//                                             <label>Zip Code</label>
//                                             <input
//                                                 type="text"
//                                                 name="zipcode"
//                                                 onChange={handleInput}
//                                                 value={checkoutInput.zipcode}
//                                                 className="form-control"
//                                             />
//                                             <small className="text-danger">{error.zipcode}</small>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-12">
//                                         <div className="form-group text-end">
//                                             <button
//                                                 type="submit"
//                                                 className="btn btn-primary mx-1"
//                                             >
//                                                 Place Order
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-md-5">
//                     <table className="table table-bordered">
//                         <thead>
//                             <tr>
//                                 <th width="50%">Product</th>
//                                 <th>Price</th>
//                                 <th>Qty</th>
//                                 <th>Total</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {cart.map((item, idx) => (
//                                 <tr key={idx}>
//                                     <td>{item.product.name}</td>
//                                     <td>{item.product.selling_price}</td>
//                                     <td>{item.product_qty}</td>
//                                     <td>{item.product.selling_price * item.product_qty}</td>
//                                 </tr>
//                             ))}
//                             <tr>
//                                 <td colSpan="2" className="text-end fw-bold">Grand Total</td>
//                                 <td colSpan="2" className="text-end fw-bold">{totalCartPrice}</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <Navbar />
//             <div className="py-3 bg-warning">
//                 <div className="container">
//                     <h6>Home / Checkout</h6>
//                 </div>
//             </div>

//             <div className="py-4">
//                 <div className="container">
//                     {checkout_HTML}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Checkout;
// working code ----------------------------

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import Navbar from '../../layouts/frontend/Navbar';
import PayPalProvider from '../../paypalConfig';
import { PayPalButtons } from "@paypal/react-paypal-js";
import {  useNavigate } from 'react-router-dom';

function Checkout() {
    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        payment_mode: 'cod'
    });

    const [error, setError] = useState({});
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [cart, setCart] = useState([]);

    const Navigate= useNavigate();

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = () => {
        const userId = localStorage.getItem('user_id');
        const cartId = localStorage.getItem('cart_id');

        axios.get(`/api/cart/${userId}/${cartId}`)
            .then(res => {
                if (res.data.status === 200) {
                    setCart(res.data.cart);
                    calculateTotalPrice(res.data.cart);
                } else if (res.data.status === 401) {
                    swal.fire("Error", res.data.message, "error");
                }
            })
            .catch(error => {
                console.error("Error fetching cart:", error);
            });
    };

    const calculateTotalPrice = (cartItems) => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.product.selling_price * item.product_qty;
        });
        setTotalCartPrice(totalPrice);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCheckoutInput({ ...checkoutInput, [name]: value });
    };

    const handlePaymentModeChange = (e) => {
        setCheckoutInput({ ...checkoutInput, payment_mode: e.target.value });
    };

    const submitOrder = (e) => {
        e.preventDefault();

        if (checkoutInput.payment_mode === 'paypal') {
            // PayPal order submission will be handled by the PayPal buttons
            return;
        }

        axios.post('/api/place-order', checkoutInput)
            .then(res => {
                if (res.data.status === 200) {
                    swal.fire('Order Placed!', 'Your order has been submitted.', 'success');
                    clearForm();
                    fetchCartData();
                    Navigate('/thank-you')
                } else if (res.data.status === 422) {
                    setError(res.data.errors);
                } else {
                    swal.fire('Error', res.data.message, 'error');
                }
            })
            .catch(error => {
                console.error('Error placing order:', error);
                swal.fire('Error', 'Failed to place order. Please try again later.', 'error');
            });
    };

    const clearForm = () => {
        setCheckoutInput({
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            payment_mode: 'cod'
        });
        setError({});
    };

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    // value: totalCartPrice.toFixed(2),
                    value:"0.10" 
                },
            }],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            const paymentData = {
                ...checkoutInput,
                payment_mode: 'Paypal',
                payment_id: details.id
            };

            axios.post('/api/place-order', paymentData)
                .then(res => {
                    if (res.data.status === 200) {
                        swal.fire('Order Placed!', 'Your order has been submitted.', 'success');
                        clearForm();
                        fetchCartData();
                        Navigate('/thank-you')
                    } else if (res.data.status === 422) {
                        setError(res.data.errors);
                    } else {
                        swal.fire('Error', res.data.message, 'error');
                    }
                })
                .catch(error => {
                    console.error('Error placing order:', error);
                    swal.fire('Error', 'Failed to place order. Please try again later.', 'error');
                });
        });
    };

    let checkout_HTML;
    if (!cart || cart.length === 0) {
        checkout_HTML = (
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Your Shopping Cart is Empty. You are in Checkout Page.</h4>
            </div>
        );
    } else {
        checkout_HTML = (
            <div className="row">
                <div className="col-md-7">
                    <div className="card">
                        <div className="card-header">
                            <h4>Basic Information</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitOrder}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                name="firstname"
                                                onChange={handleInput}
                                                value={checkoutInput.firstname}
                                                className="form-control"
                                            />
                                            <small className="text-danger">{error.firstname}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                name="lastname"
                                                onChange={handleInput}
                                                value={checkoutInput.lastname}
                                                className="form-control"
                                            />
                                            <small className="text-danger">{error.lastname}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Phone Number</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                onChange={handleInput}
                                                value={checkoutInput.phone}
                                                className="form-control"
                                            />
                                            <small className="text-danger">{error.phone}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                onChange={handleInput}
                                                value={checkoutInput.email}
                                                className="form-control"
                                            />
                                            <small className="text-danger">{error.email}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-3">
                                            <label>Full Address</label>
                                            <textarea
                                                rows="3"
                                                name="address"
                                                onChange={handleInput}
                                                value={checkoutInput.address}
                                                className="form-control"
                                            ></textarea>
                                            <small className="text-danger">{error.address}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label>City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                onChange={handleInput}
                                                value={checkoutInput.city}
                                                className="form-control"
                                            />
                                            <small className="text-danger">{error.city}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label>State</label>
                                            <input
                                                type="text"
                                                name="state"
                                                onChange={handleInput}
                                                value={checkoutInput.state}
                                                className="form-control"
                                            />
                                            <small className="text-danger">{error.state}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label>Zip Code</label>
                                            <input
                                                type="text"
                                                name="zipcode"
                                                onChange={handleInput}
                                                value={checkoutInput.zipcode}
                                                className="form-control"
                                            />
                                            <small className="text-danger">{error.zipcode}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label>Select Payment Mode</label>
                                            <select
                                                name="payment_mode"
                                                onChange={handlePaymentModeChange}
                                                value={checkoutInput.payment_mode}
                                                className="form-control"
                                            >
                                                <option value="cod">Cash on Delivery</option>
                                                <option value="paypal">PayPal</option>
                                            </select>
                                        </div>
                                    </div>
                                    {checkoutInput.payment_mode === 'paypal' && (
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <PayPalButtons
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="col-md-12">
                                        <div className="form-group text-end">
                                            <button type="submit" className="btn btn-primary">Place Order</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th width="50%">Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.product.name}</td>
                                    <td>{item.product.selling_price}</td>
                                    <td>{item.product_qty}</td>
                                    <td>{item.product.selling_price * item.product_qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h6>Total: {totalCartPrice}</h6>
                </div>
            </div>
        );
    }

    return (
        <PayPalProvider>
            <div>
                <Navbar />
                <div className="py-3 bg-warning">
                    <div className="container">
                        <h6>Home / Checkout</h6>
                    </div>
                </div>
                <div className="py-4">
                    <div className="container">
                        {checkout_HTML}
                    </div>
                </div>
            </div>
        </PayPalProvider>
    );
}

export default Checkout;
