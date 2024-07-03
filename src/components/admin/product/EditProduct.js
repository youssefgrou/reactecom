import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);

    const [productInput, setProductInput] = useState({
        category_id: '',
        slug: '',
        name: '',
        description: '',
        meta_title: '',
        meta_keyword: '',
        meta_descrip: '',
        selling_price: '',
        original_price: '',
        qty: '',
        brand: '',
        image: null,
    });

    const [checkboxes, setCheckboxes] = useState({
        featured: false,
        popular: false,
        status: false,
    });

    const [errorlist, setErrorlist] = useState({});

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setCheckboxes({
                ...checkboxes, [name]: checked
            });
        } else {
            setProductInput({
                ...productInput, [name]: value
            });
        }
    };

    const handleImage = (e) => {
        setProductInput({ ...productInput, image: e.target.files[0] });
    };

    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/all-category`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setCategorylist(res.data.category);
                }
            }
        });

        axios.get(`/api/edit-product/${id}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    const productData = res.data.product;
                    setProductInput({
                        ...productData,
                    });
                    setCheckboxes({
                        featured: productData.featured === 1,
                        popular: productData.popular === 1,
                        status: productData.status === 1,
                    });
                    setLoading(false);
                } else if (res.data.status === 404) {
                    swal.fire("Error", res.data.message, "error");
                    navigate('../admin/view-product');
                }
            }
        });

        return () => {
            isMounted = false;
        };

    }, [id, navigate]);

    const submitProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(productInput).forEach(key => {
            formData.append(key, productInput[key]);
        });
        Object.keys(checkboxes).forEach(key => {
            formData.append(key, checkboxes[key] ? 1 : 0);
        });

        try {
            const res = await axios.post(`/api/update-product/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.data.status === 200) {
                swal.fire("Success", res.data.message, "success");
                navigate('../admin/view-product');
            }
        } catch (error) {
            if (error.response) {
                setErrorlist(error.response.data.errors);
            }
        }
    };

    if (loading) {
        return <h4>Edit Product Data Loading...</h4>;
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Product
                        <Link to="../admin/view-product" className="btn btn-primary btn-sm float-end">View Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submitProduct} encType="multipart/form-data">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags" type="button" role="tab" aria-controls="seotags" aria-selected="false">SEO Tags</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Other Details</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb-3">
                                    <label>Select Category</label>
                                    <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control">
                                        <option>Select Category</option>
                                        {
                                            categorylist.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <small className="text-danger">{errorlist.category_id}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className="form-control" />
                                    <small className="text-danger">{errorlist.slug}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" />
                                    <small className="text-danger">{errorlist.name}</small>
                                </div>
                                
                            </div>
                            <div className="tab-pane card-body border fade" id="seotags" role="tabpanel" aria-labelledby="seotags-tab">
                                <div className="form-group mb-3">
                                    <label>Meta Title</label>
                                    <input type="text" name="meta_title" onChange={handleInput} value={productInput.meta_title} className="form-control" />
                                    <small className="text-danger">{errorlist.meta_title}</small>
                                </div>
                                {/* <div className="form-group mb-3">
                                    <label>Meta Keyword</label>
                                    <textarea name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword} className="form-control"></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Description</label>
                                    <textarea name="meta_descrip" onChange={handleInput} value={productInput.meta_descrip} className="form-control"></textarea>
                                </div> */}
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea name="description" onChange={handleInput} value={productInput.description} className="form-control"></textarea>
                                </div>

                            </div>
                            <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                                <div className="row">
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Selling Price</label>
                                        <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className="form-control" />
                                        <small className="text-danger">{errorlist.selling_price}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Original Price</label>
                                        <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price} className="form-control" />
                                        <small className="text-danger">{errorlist.original_price}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Quantity</label>
                                        <input type="text" name="qty" onChange={handleInput} value={productInput.qty} className="form-control" />
                                        <small className="text-danger">{errorlist.qty}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Brand</label>
                                        <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className="form-control" />
                                        <small className="text-danger">{errorlist.brand}</small>
                                    </div>
                                    <div className="col-md-8 form-group mb-3">
                                        <label>Image</label>
                                        <input type="file" name="image" onChange={handleImage} className="form-control" />
                                        <img src={`http://127.0.0.1:8000/${productInput.image}`} alt={productInput.name} width='50px' />
                                        <small className="text-danger">{errorlist.image}</small>
                                    </div>
                                    {/* <div className="col-md-4 form-group mb-3">
                                        <label>Featured (checked=shown)</label>
                                        <input type="checkbox" name="featured" onChange={handleInput} checked={checkboxes.featured} className="w-50 h-50" />
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Popular (checked=shown)</label>
                                        <input type="checkbox" name="popular" onChange={handleInput} checked={checkboxes.popular} className="w-50 h-50" />
                                    </div> */}
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Status (checked=Hidden)</label>
                                        <input type="checkbox" name="status" onChange={handleInput} checked={checkboxes.status} className="w-50 h-50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 mt-2">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;

