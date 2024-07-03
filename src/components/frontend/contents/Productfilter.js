// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function ProductFilter() {
//     const [category, setCategory] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [showAll, setShowAll] = useState(false);

//     const PRODUCTS_TO_SHOW = 8; // Number of products to show

//     useEffect(() => {
//         axios.get(`/api/getCategory`).then((res) => {
//             if (res.data.status === 200) {
//                 setCategories(res.data.category);
//             }
//         });
//     }, []);

//     useEffect(() => {
//         if (category) {
//             axios.get(`/api/products/category/${category}`).then((res) => {
//                 setProducts(res.data.products);
//             });
//         } else {
//             axios.get(`/api/view-product`).then((res) => {
//                 setProducts(res.data.products);
//             });
//         }
//     }, [category]);

//     const handleCategoryChange = (e) => {
//         const selectedCategory = e.target.value;
//         setCategory(selectedCategory);
//         setShowAll(false); 
//     };

//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//         setShowAll(false); 
//     };

//     const filteredProducts = products.filter((product) => {
//         return (
//             searchQuery === "" ||
//             product.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//     });

//     const productsToShow = showAll ? filteredProducts : filteredProducts.slice(0, PRODUCTS_TO_SHOW);

//     return (
//         <div>
//             <div className="values-section" id="product">
//                 <button className="values-button">OUR Product</button>
//                 <h2 className="values-heading">Our Product Values</h2>
//             </div>

//             <section id="search-filter" className="section">
//                 <div className="container">
//                     <div className="row">
//                         {/* category bar */}
//                         <div className="col-lg-4">
//                             <select className="form-select" value={category} onChange={handleCategoryChange} >
//                                 <option value="">All Categories</option>
//                                 {categories.map((cat) => (
//                                     <option key={cat.id} value={cat.slug}>
//                                         {cat.name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* search bar */}
//                         <div className="search col-lg-8">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Search products..."
//                                 value={searchQuery}
//                                 onChange={handleSearchChange}
//                             />
//                         </div>
//                     </div>

//                     <div className="row mt-4 productCard">
//                         {productsToShow.length > 0 ? (
//                             productsToShow.map((product) => (
//                                 <div key={product.id} className="col-lg-3 mt-2 transition">
//                                     <div className="card">
//                                         <Link to={`/collections/${product.category.slug}/${product.slug}`}>
//                                             <img src={`http://127.0.0.1:8000/${product.image}`} className="card-img-top" alt={product.name} />
//                                         </Link>
//                                         <div className="card-body">
//                                             <h5 className="card-title">
//                                                 {product.name}
//                                                 <span className="card-text float-end fs-6 py-1">${product.selling_price}</span>
//                                             </h5>
//                                             <Link to={`/collections/${product.category.slug}/${product.slug}`} className="btn btn-primary">View Details</Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="col-12 text-center alert alert-secondary rounded-0">
//                                 <p>No product to display</p>
//                             </div>
//                         )}
//                     </div>


//                     {!showAll && filteredProducts.length > PRODUCTS_TO_SHOW && (
//                         <div className="row mt-4">
//                             <div className="col-12 text-center">
//                                 <button className="btn btn-dark px-4 rounded-0" onClick={() => setShowAll(true)}>View All</button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default ProductFilter;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductFilter() {
    const [category, setCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const PRODUCTS_TO_SHOW = 8; // Number of products to show

    useEffect(() => {
        axios.get(`/api/getCategory`).then((res) => {
            if (res.data.status === 200) {
                setCategories(res.data.category);
            }
        });
    }, []);

    useEffect(() => {
        if (category) {
            axios.get(`/api/products/category/${category}`).then((res) => {
                setProducts(res.data.products);
            });
        } else {
            axios.get(`/api/view-product`).then((res) => {
                setProducts(res.data.products);
            });
        }
    }, [category]);

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        setShowAll(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setShowAll(false);
    };

    const filteredProducts = products.filter((product) => {
        return (
            product.status === 0 && (
                searchQuery === "" ||
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    });

    const productsToShow = showAll ? filteredProducts : filteredProducts.slice(0, PRODUCTS_TO_SHOW);

    return (
        <div>
            <div className="values-section" id="product">
                <button className="values-button">OUR Product</button>
            </div>

            <section id="search-filter" className="section">
                <div className="container">
                    <div className="row">
                        {/* category bar */}
                        <div className="col-lg-4">
                            <select className="form-select" value={category} onChange={handleCategoryChange} >
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.slug}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* search bar */}
                        <div className="search col-lg-8">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>

                    <div className="row mt-4 productCard">
                        {productsToShow.length > 0 ? (
                            productsToShow.map((product) => (
                                <div key={product.id} className="col-lg-3 mt-2 transition">
                                    <div className="card h-100">
                                        <Link to={`/collections/${product.category.slug}/${product.slug}`}>
                                            <img src={`http://127.0.0.1:8000/${product.image}`} className="card-img-top " alt={product.name} />
                                        </Link>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {product.name}
                                                <span className="card-text float-end fs-6 py-1">${product.selling_price}</span>
                                            </h5>
                                            <Link to={`/collections/${product.category.slug}/${product.slug}`} className="btn btn-primary">View Details</Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center alert alert-secondary rounded-0">
                                <p>No product to display</p>
                            </div>
                        )}
                    </div>

                    {!showAll && filteredProducts.length > PRODUCTS_TO_SHOW && (
                        <div className="row mt-4">
                            <div className="col-12 text-center">
                                <button className="btn btn-dark px-4 rounded-0" onClick={() => setShowAll(true)}>View All</button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default ProductFilter;
