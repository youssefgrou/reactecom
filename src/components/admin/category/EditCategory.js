import React, { useState,useEffect } from 'react';
import { Link , useNavigate ,useParams} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2';


function EditCategory(props) {
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [categoryInput, setCategory] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        axios.get(`/api/edit-category/${id}`).then(res => {
            if (res.data.status === 200) {
                setCategory(res.data.category);
            } else if (res.data.status === 404) {
                swal.fire("Error", res.data.message, "error");
                navigate("../admin/view-category");
            }
            setLoading(false);
        });
    }, [id, navigate]);


    const handleInput = (e)=>{
        e.persist();
        setCategory({...categoryInput , [e.target.name]:e.target.value })
    }
    const updateCategory = (e)=>{
        e.preventDefault();
        axios.put(`/api/update-category/${id}`, categoryInput).then(res => {
            if (res.data.status === 200) 
            {
                swal.fire("Success", res.data.message, "success");
                navigate("../admin/view-category");
                setError([])
            }
            else if (res.data.status === 422)
            {
                swal.fire("All Fields are mandatory", "", "error");
                setError( res.data.message)
            }
            else if (res.data.status === 404)
            {
                swal.fire("Error", res.data.message, "error");
                navigate("../admin/view-category");
            }
                    
        })
    }






    if (loading) {
        return <h4>Loading Update Category ...</h4>;
    }
    
    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Update Categories
                        <Link to="../admin/view-category" className="btn btn-success btn-sm float-end">Back</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateCategory}>
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
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                                    <span className='text-danger'>{error.name}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
                                    <span className='text-danger'>{error.slug}</span>
                               
                                </div>
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>
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
                                    <span className='text-danger'>{error.meta_title}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Keywords</label>
                                    <textarea name="meta_keywords" onChange={handleInput} value={categoryInput.meta_keywords} className="form-control"></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Description</label>
                                    <textarea name="meta_description" onChange={handleInput} value={categoryInput.meta_description} className="form-control"></textarea>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success px-4 float-end mt-2">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditCategory;
