import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';

function AddProduct()
{
    // const [categorylist, setCategorylist] = useState([]);
    // const [productInput, setProduct] = useState({
    //     category_id: '',
    //     slug: '',
    //     name: '',
    //     description: '',

    //     meta_title: '',
    //     meta_keyword: '',
    //     meta_descrip: '',

    //     selling_price: '',
    //     original_price: '',
    //     qty: '',
    //     brand: '',
    //     featured: '',
    //     popular: '',
    //     status: '',
    // });
    // const [image, setImage] = useState();
    // const [errorlist, setError] = useState([]);
    
    // const handleInput = (e) => {
    //     e.persist();
    //     setProduct({...productInput, [e.target.name]:e.target.value });
    // }

    
    // const handleImage = (e) => {
    //     setImage(e.target.files[0]);    
    // }
    
    // useEffect( () => {
    //     let isMounted = true;
        
    //     axios.get(`/api/all-category`).then(res=>{
    //         if(isMounted)
    //         {
    //             if(res.data.status === 200)
    //             {
    //                 setCategorylist(res.data.category);
    //             }
    //         }
    //     });

    //     return () => {
    //         isMounted = false
    //     };

    // }, []);

    // const submitProduct = (e) => {
    //     e.preventDefault();
        
    //     const formData = new FormData();
    //     formData.append('image', image); 
    //     formData.append('category_id', productInput.category_id);
    //     formData.append('slug', productInput.slug);
    //     formData.append('name', productInput.name);
    //     formData.append('description', productInput.description);
    
    //     formData.append('meta_title', productInput.meta_title);
    //     formData.append('meta_keyword', productInput.meta_keyword);
    //     formData.append('meta_descrip', productInput.meta_descrip);
    
    //     formData.append('selling_price', productInput.selling_price);
    //     formData.append('original_price', productInput.original_price);
    //     formData.append('qty', productInput.qty);
    //     formData.append('brand', productInput.brand);
    //     formData.append('featured', productInput.featured);
    //     formData.append('popular', productInput.popular);
    //     formData.append('status', productInput.status);
    
    //     axios.post(`/api/store-product`, formData).then(res=>{
    //         if(res.data.status === 200)
    //         {
    //             swal.fire("Success",res.data.message,"success");
    //             setProduct({...productInput, 
    //                 category_id: '',
    //                 slug: '',
    //                 name: '',
    //                 description: '',
    //                 meta_title: '',
    //                 meta_keyword: '',
    //                 meta_descrip: '',
    //                 selling_price: '',
    //                 original_price: '',
    //                 qty: '',    
    //                 // image: '',
    //                 brand: '',
    //                 featured: '',
    //                 popular: '',
    //                 status: '',
    //             });
    //             setImage();
    //             setError([]);
    //         }
    //         else if(res.data.status === 422)
    //         {
    //             swal.fire("All Fields are mandetory","","error");
    //             setError(res.data.errors);
    //         }
    //     });
    
    // }

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
        featured: false,
        popular: false,
        status: false,
        image: null,
    });
    const [errorlist, setErrorlist] = useState({});

    const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
        setProductInput({
            ...productInput,[name]: type === 'checkbox' ? checked : value
        });
    };

    const handleImage = (e) => {
        setProductInput({ ...productInput, image: e.target.files[0] });
    };
    useEffect( () => {
            let isMounted = true;
            
            axios.get(`/api/all-category`).then(res=>{
                if(isMounted)
                {
                    if(res.data.status === 200)
                    {
                        setCategorylist(res.data.category);
                    }
                }
            });
    
            return () => {
                isMounted = false
            };
    
        }, []);

    const submitProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(productInput).forEach(key => {
            formData.append(key, productInput[key]);
        });

        try {
            const res = await axios.post('/api/store-product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.data.message) {
                console.log(res.data.message);
                swal.fire("Success" ,res.data.message, "success")
            }
        } catch (error) {
            if (error.response) {
                setErrorlist(error.response.data.errors);
            }
        }
    };

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add Product
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
                                            categorylist.map( (item) => {
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
                                    <textarea name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword}  className="form-control"></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Description</label>
                                    <textarea name="meta_descrip" onChange={handleInput} value={productInput.meta_descrip}  className="form-control"></textarea>
                                </div> */}
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea name="description"  onChange={handleInput} value={productInput.description} className="form-control"></textarea>
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
                                        <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price}  className="form-control" />
                                        <small className="text-danger">{errorlist.original_price}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Quantity</label>
                                        <input type="text" name="qty" onChange={handleInput} value={productInput.qty}  className="form-control" />
                                        <small className="text-danger">{errorlist.qty}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Brand</label>
                                        <input type="text" name="brand" onChange={handleInput} value={productInput.brand}  className="form-control" />
                                        <small className="text-danger">{errorlist.brand}</small>
                                    </div>
                                    <div className="col-md-8 form-group mb-3">
                                        <label>Image</label>
                                        <input type="file" name="image" onChange={handleImage} className="form-control" />
                                        <small className="text-danger">{errorlist.image}</small>
                                    </div>
                                   
                                    {/* <div className="col-md-4 form-group mb-3">
                                        <label>Featured (checked=shown)</label>
                                        <input type="checkbox" name="featured" onChange={handleInput} value={productInput.featured}  className="w-50 h-50" />
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Popular (checked=shown)</label>
                                        <input type="checkbox" name="popular" onChange={handleInput} value={productInput.popular}  className="w-50 h-50" />
                                    </div> */}
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Status (checked=Hidden)</label>
                                        <input type="checkbox" name="status" onChange={handleInput} value={productInput.status}  className="w-50 h-50" />
                                    </div>

                                </div>

                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 mt-2">Submit</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;