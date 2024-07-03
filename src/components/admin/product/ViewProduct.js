import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import $ from 'jquery';
import swal from 'sweetalert2';

function ViewProduct() {
    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        document.title="View Product";


        const fetchProducts = async () => {
            try {
                const res = await axios.get("/api/view-product");
                if (res.status === 200) {
                    setProductList(res.data.products);
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (!loading) {
            $('#myTable').DataTable();
        }
    }, [loading]);

    const deleteProduct = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting ..";

        axios.delete(`/api/delete-product/${id}`).then(res => {
            if (res.data.status === 200) {
                swal.fire("Success", res.data.message, "success");
                thisClicked.closest("tr").remove();
            } else if (res.data.status === 404) {
                swal.fire("Error", res.data.message, "error");
            }
        });
    };

    let viewProduct_HTMLTABLE = "";

    if (loading) {
        return <h4>Loading Products...</h4>;
    } else {
        var ProdStatus = '';
        viewProduct_HTMLTABLE = productList.map((item) => {
            if (item.status == "0")
            {
                ProdStatus = 'Shown';
            }
            else 
            {
                ProdStatus = 'Hidden';
            }
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.selling_price}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} width="70px" alt={item.name} /></td>
                    <td>
                        <Link to={`../admin/edit-product/${item.id}`} className="btn btn-success">Update</Link>
                    </td>
                    <td>
                        {ProdStatus}
                    </td>
                </tr>
            );
        });
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h5 className="card-title">View Products 
                        <Link to="../admin/add-product" className="btn btn-primary float-end btn-sm">Add Product</Link>
                    </h5>
                </div>
                <div className="card-body table-responsive">
                    <table id="myTable" className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Selling Price</th>
                                <th scope="col">Image</th>
                                <th scope="col">Action</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewProduct_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;
