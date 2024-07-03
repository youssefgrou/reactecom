import React from "react";
import { Link, NavLink } from "react-router-dom";
//import css
// import '../../app.css'

const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Core</div>
                    <NavLink className="nav-link" to="../admin/dashboard">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </NavLink>
                    <NavLink className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseCategories" aria-expanded="false" aria-controls="collapseCategories">
                        <div className="sb-nav-link-icon"><i className="fa-solid fa-tag"></i></div>
                        Categories
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </NavLink>
                    <div className="collapse" id="collapseCategories" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <NavLink className="nav-link" to="../admin/add-category">Add Category</NavLink>
                            <NavLink className="nav-link" to="../admin/view-category">View Category</NavLink>
                        </nav>
                    </div>

                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseProduct">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Products
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <NavLink className="nav-link" to="../admin/add-product">Add Product</NavLink>
                            <NavLink className="nav-link" to="../admin/view-product">View Product</NavLink>
                        </nav>
                    </div>

                    <NavLink className="nav-link" to="../admin/profile">
                        <div className="sb-nav-link-icon"><i className="fas fa-user"></i></div>
                        Profile
                    </NavLink>

                    <NavLink className="nav-link" to="../admin/orders">
                        <div className="sb-nav-link-icon"><i className="fas fa-user"></i></div>
                        Orders
                    </NavLink>

                    {/* --- */}
                    <div className="sb-sidenav-menu-heading">Interface</div>
                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Layouts
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    {/* <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <NavLink className="nav-link" to=""></NavLink>
                            <NavLink className="nav-link" to=""></NavLink>
                        </nav>
                    </div> */}

                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                        <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                        Pages
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                Authentication
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/login">Login</Link>
                                    <Link className="nav-link" to="/register">Register</Link>
                                    <Link className="nav-link" to="/forgot-password">Forgot Password</Link>
                                </nav>
                            </div>
                        </nav>
                    </div>
                    
                </div>
            </div>
            <div className="sb-sidenav-footer">
                YM STORE
            </div>
        </nav>
    );
};

export default Sidebar;
