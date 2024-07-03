import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2';
import Navbar from '../../../layouts/frontend/Navbar';

function ProductDetails() {
    const { category, product } = useParams();
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        axios.get(`/api/products/${category}/${product}`).then((res) => {
            if (res.data.status === 200) {
                setProductDetails(res.data.product);
            } else if (res.data.status === 404) {
                navigate('/home');
                swal.fire("Warning", res.data.message, "error");
            }
        });
    }, [category, product, navigate]);

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevCount => prevCount - 1);
        }
    };

    const handleIncrement = () => {
        if (quantity < 10) {
            setQuantity(prevCount => prevCount + 1);
        }
    };

    const submitAddToCart = (e) => {
        e.preventDefault();

        const data = {
            product_id: productDetails.id,
            product_qty: quantity,
        };

        axios.post(`/api/add-to-cart`, data).then(res => {
            if (res.data.status === 201) {
                swal.fire("Success", res.data.message, "success");
            } else if (res.data.status === 409) {
                //Already added to cart option ..
                swal.fire("Success", res.data.message, "success");
            } else if (res.data.status === 401) {
                swal.fire("Error", res.data.message, "error");
            } else if (res.data.status === 404) {
                swal.fire("Warning", res.data.message, "warning");
            }
        });
    };

    if (!productDetails) {
        return <h4>Loading Product Details...</h4>;
    }

    return (
        <div>
            <Navbar />
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Collections / {productDetails.category.name} / {productDetails.name}</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 border-end animated fadeInLeft">
                            <img
                                src={`http://localhost:8000/${productDetails.image}`}
                                alt={productDetails.name}
                                className="w-100 rounded"
                            />
                        </div>

                        <div className="col-md-8 animated fadeInRight">
                            <h4>
                                {productDetails.name}
                                {/* <span className="float-end badge btn-sm btn-success badge-pil"> {product.brand} </span> */}
                            </h4>
                            <h6 className="text-muted">{productDetails.description}</h6>
                            <h4 className="mb-1">
                                MAD: {productDetails.selling_price}
                                <small className="ms-2 text-muted"><del> MAD: {productDetails.original_price} </del></small>
                            </h4>

                            {productDetails.qty > 0 ? (
                                <div>
                                    <label className="text-success mt-2">In stock</label>
                                    <div className="row">
                                        <div className="col-md-3 mt-3">
                                            <div className="input-group">
                                                <button type="button" onClick={handleDecrement} className="input-group-text">-</button>
                                                <div className="form-control text-center">{quantity}</div>
                                                <button type="button" onClick={handleIncrement} className="input-group-text">+</button>
                                            </div>
                                        </div>
                                        <div className="col-md-3 mt-3">
                                            <button type="button" className="btn btn-primary w-100" onClick={submitAddToCart}>
                                                <i className='fa fa-cart-shopping'></i> Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <label className="text-danger mt-2 px-3">Out of stock</label>
                            )}

                            <button type="button" className="btn btn-danger mt-3">
                                <i className='fa fa-heart'></i> Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default ProductDetails;
