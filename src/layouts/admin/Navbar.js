import React from "react";
import { Link } from "react-router-dom";
import '../../app.css'

const Navbar = () => {
    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <Link to="/" className="navbar-brand ps-3">YM STORE</Link>
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle">
                <i className="fas fa-bars"></i>
            </button>

            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                {/* <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button">
                        <i className="fas fa-search"></i>
                    </button>
                </div> */}
            </form>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4 ">
                <li className="nav-item dropdown">
                    <Link to={'#'} className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-user fa-fw"></i>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><Link to={"#"} className="dropdown-item">Settings</Link></li>
                        <li><Link to={"#"} className="dropdown-item">Activity Log</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link to={"#"} className="dropdown-item">Logout</Link></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
