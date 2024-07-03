import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import $ from 'jquery';
import swal from 'sweetalert2'

function ViewCategory() {
    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("/api/view-category");
                console.log('test');
                if (res.status === 200) {
                    setCategorylist(res.data.category);
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (!loading) {
            $('#myTable').DataTable();
        }
    }, [loading]);

    const deleteCategory = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting ..";

        axios.delete(`/api/delete-category/${id}`).then(res => {
            if (res.data.status === 200)
            {
                swal.fire("Success", res.data.message, "success")
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal.fire("Error", res.data.message, "error")
            }

        })
    }

    var ViewCategory_HTMLTABLE= "";

    if (loading) {
        return <h4>Loading Category ...</h4>;
    }
    else
    {
        ViewCategory_HTMLTABLE = categorylist.map((item)=>{
            return (
                <tr key={item.id}> 
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link to={`../admin/edit-category/${item.id}`} className="btn btn-success">Update</Link>
                        <button type="button" onClick={(e) => { deleteCategory(e, item.id)}}  className="btn btn-danger mx-2">Delete</button>
                    </td>
                </tr>
            )
        }) 
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h5 className="card-title">View Category
                        <Link to="../admin/add-category" className="btn btn-success float-end btn-sm">Add Category</Link>
                    </h5>
                </div>
                <div className="card-body table-responsive">
                    <table id="myTable" className="table table-striped">
                        <thead className="table-dark">
                            <tr >
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Slug</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ViewCategory_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewCategory;

