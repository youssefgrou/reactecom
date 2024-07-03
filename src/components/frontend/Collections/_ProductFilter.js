// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function ProductFilter() {
//     const [category, setCategory] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         axios.get(`/api/getCategory`).then((res) => {
//             if (res.data.status === 200) {
//                 setCategories(res.data.category);
//             }
//         });
//     }, []);

//     useEffect(() => {
//         fetchProducts();
//     }, [category]);

//     const fetchProducts = () => {
//         let url = "/api/view-product";
//         if (category) {
//             url = `/api/products/category/${category}`;
//         }
//         axios.get(url).then((res) => {
//             setProducts(res.data.products);
//         });
//     };

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//     };

//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     const filteredProducts = products.filter((product) =>
//         product.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <div>
//             {/* Category selection */}
//             <select value={category} onChange={handleCategoryChange}>
//                 <option value="">All Categories</option>
//                 {categories.map((cat) => (
//                     <option key={cat.id} value={cat.slug}>
//                         {cat.name}
//                     </option>
//                 ))}
//             </select>

//             {/* Search input */}
//             <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//             />

//             {/* Product list */}
//             {filteredProducts.map((product) => (
//                 <div key={product.id}>
//                     <h3>{product.name}</h3>
//                     <p>{product.description}</p>
//                     <p>Price: ${product.price}</p>
//                     <Link to={`/collections/${product.category}/${product.slug}`}>
//                         View Details
//                     </Link>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default ProductFilter;
