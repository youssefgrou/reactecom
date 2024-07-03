import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2';

function Category() {
    const [categoryInput, setCategory] = useState({
        slug: '',
        name: '',
        description: '',
        status: false,
        meta_title: '',
        meta_keywords: '',
        meta_description: '',
        error_list: [],
    });

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        setCategory({
            ...categoryInput,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const submitCategory = async (e) => {
        e.preventDefault();

        const data = {
            slug: categoryInput.slug,
            name: categoryInput.name,
            description: categoryInput.description,
            status: categoryInput.status,
            meta_title: categoryInput.meta_title,
            meta_keywords: categoryInput.meta_keywords,
            meta_description: categoryInput.meta_description,
        };
        try {
            const res = await axios.post('/api/categories', data);
            if (res.data.status === 200) {
                setCategory({
                    slug: '',
                    name: '',
                    description: '',
                    status: false,
                    meta_title: '',
                    meta_keywords: '',
                    meta_description: '',
                    error_list: [],
                });
                swal.fire('Success', res.data.message, 'success');
            } else if (res.data.status === 422) {
                setCategory({ ...categoryInput, error_list: res.data.errors });
            }
        } catch (error) {
            console.error('Error:', error);
            swal.fire('Error', 'An error', 'error');
        }
    };

    const display_errors = categoryInput.error_list ? Object.values(categoryInput.error_list).flat() : [];

    return (
        <div className="container-fluid px-4">
            {display_errors.length > 0 && (
                <div>
                    {display_errors.map((item, index) => (
                        <p className="text-danger mb-1" key={index}>
                            {item}
                        </p>
                    ))}
                </div>
            )}

            <div className="card mt-4">
                <div className="card-header">
                    <h4>Create Categories
                        <Link to="../admin/view-category" className="btn btn-success btn-sm float-end">View Category</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submitCategory} id="CATEGORY_FORM">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
                                    <span className="text-danger">{categoryInput.error_list.slug}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                                    <span className="text-danger">{categoryInput.error_list.name}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>
                                    <span className="text-danger">{categoryInput.error_list.description}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Status</label>
                                    <input type="checkbox" name="status" onChange={handleInput} checked={categoryInput.status} /> Status 0=shown/1=hidden
                                </div>
                            </div>
                            <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                                <div className="form-group mb-3">
                                    <label>Meta Title</label>
                                    <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className="form-control" />
                                    <span className="text-danger">{categoryInput.error_list.meta_title}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Keywords</label>
                                    <textarea name="meta_keywords" onChange={handleInput} value={categoryInput.meta_keywords} className="form-control"></textarea>
                                    <span className="text-danger">{categoryInput.error_list.meta_keywords}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Description</label>
                                    <textarea name="meta_description" onChange={handleInput} value={categoryInput.meta_description} className="form-control"></textarea>
                                    <span className="text-danger">{categoryInput.error_list.meta_description}</span>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success px-4 float-end mt-2">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Category;
