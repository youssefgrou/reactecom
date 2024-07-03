import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../layouts/frontend/Navbar';

function Cart() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [totalCartPrice, setTotalCartPrice] = useState(0); 
    const userId = localStorage.getItem('user_id'); 
    const cartId = localStorage.getItem('cart_id'); 

    useEffect(() => {
        let isMounted = true;
        // if (!userId || !cartId) {
        //     Navigate('/');
        //     swal.fire("Warning", "Login to goto Cart Page", "error");
        //     return;
        // }

        axios.get(`/api/cart/${userId}/${cartId}`)
            .then(res => {
                if (isMounted) {
                    if (res.data.status === 200) {
                        setCart(res.data.cart);
                        calculateTotalPrice(res.data.cart); 
                        setLoading(false);
                    } else if (res.data.status === 401) {
                        Navigate('/');
                        swal.fire("Warning", res.data.message, "error");
                    }
                }
            })
            .catch(error => {
                // Handle other errors (e.g., 404) if needed
                console.error("Error fetching cart:", error);
                // setLoading(false); // Uncomment if loading spinner should be hidden on error
            });

        return () => {
            isMounted = false;
        };
    }, [Navigate, userId, cartId]);

    const calculateTotalPrice = (cartItems) => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.product.selling_price * item.product_qty;
        });
        setTotalCartPrice(totalPrice);
    };

    const handleDecrement = (cart_id) => {
        setCart(cart =>
            cart.map((item) =>
                cart_id === item.id ? { ...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0) } : item
            )
        );
        updateCartQuantity(cart_id, "dec");
    };

    const handleIncrement = (cart_id) => {
        setCart(cart =>
            cart.map((item) =>
                cart_id === item.id ? { ...item, product_qty: item.product_qty + (item.product_qty < 10 ? 1 : 0) } : item
            )
        );
        updateCartQuantity(cart_id, "inc");
    };

    const updateCartQuantity = (cart_id, scope) => {
        axios.put(`/api/cart-updatequantity/${cart_id}/${scope}`)
            .then(res => {
                if (res.data.status === 200) {
                    // swal.fire("Success", res.data.message, "success");
                }
            })
            .catch(error => {
                console.error("Error updating cart quantity:", error);
            });
    };

    const deleteCartItem = (e, cart_id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Removing";

        axios.delete(`/api/delete-cartitem/${cart_id}`)
            .then(res => {
                if (res.data.status === 200) {
                    swal.fire("Success", res.data.message, "success");
                    setCart(cart.filter(item => item.id !== cart_id)); // Update local cart state after successful deletion
                    calculateTotalPrice(cart.filter(item => item.id !== cart_id)); // Recalculate total price after deletion
                } else if (res.data.status === 404) {
                    swal.fire("Error", res.data.message, "error");
                    thisClicked.innerText = "Remove";
                }
            })
            .catch(error => {
                console.error("Error deleting cart item:", error);
                thisClicked.innerText = "Remove"; 
            });
    };

    if (loading) {
        return <h4>Loading Product Detail...</h4>;
    }

    let cart_HTML = '';
    if (cart.length > 0) {
        cart_HTML = (
            <div>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Total Price</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, idx) => (
                                <tr key={idx}>
                                    <td width="10%">
                                        <img src={`http://localhost:8000/${item.product.image}`} alt={item.product.name} width="50px" height="50px" />
                                    </td>
                                    <td>{item.product.name}</td>
                                    <td width="15%" className="text-center">{item.product.selling_price}</td>
                                    <td width="15%">
                                        <div className="input-group">
                                            <button type="button" onClick={() => handleDecrement(item.id)} className="input-group-text">-</button>
                                            <div className="form-control text-center">{item.product_qty}</div>
                                            <button type="button" onClick={() => handleIncrement(item.id)} className="input-group-text">+</button>
                                        </div>
                                    </td>
                                    <td width="15%" className="text-center">{item.product.selling_price * item.product_qty}</td>
                                    <td width="10%">
                                        <button type="button" onClick={(e) => deleteCartItem(e, item.id)} className="btn btn-danger btn-sm">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col-md-8"></div>
                    <div className="col-md-4">
                        <div className="card card-body mt-3">
                            <h4>Sub Total:
                                <span className="float-end">{totalCartPrice}</span>
                            </h4>
                            <h4>Grand Total:
                                <span className="float-end">{totalCartPrice}</span>
                            </h4>
                            <hr />
                            <Link to="/checkout" className="btn btn-primary"> Checkout </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        cart_HTML = (
            <div>
                <div className="card card-body py-5 text-center shadow-sm">
                    <h4>Your Shopping Cart is Empty</h4>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar/>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Cart</h6>
                </div>
            </div>

            <div className="py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {cart_HTML}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;

