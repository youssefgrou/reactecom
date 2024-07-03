
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt ,faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from "sweetalert2";
import logo from '../../assets/frontend/img/ymlogo.svg'

function Navbar() {
    const navigate = useNavigate();

    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_name");
                localStorage.removeItem("auth_role");
                swal.fire("Success", res.data.message, "success");
                navigate('/home');
            }
        });
    }

    var AuthButtons = '';
    if (!localStorage.getItem('auth_token')) {
        AuthButtons = (
            <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </ul>
        );
    } else {
        const authRole = localStorage.getItem('auth_role');
        AuthButtons = (
            <ul className="nav navbar-nav navbar-right">
                {authRole === '1' && (
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/admin/dashboard"><FontAwesomeIcon icon={faUser} /> Admin</Link>
                    </li>
                )}
                <li className="nav-item mx-2">
                    <Link className="nav-link btn btn-warning btn-sm" onClick={logoutSubmit} style={{ borderRadius: '0px', padding: '8px 5px ', color: '#555' }}>
                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </Link>
                </li>
            </ul>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top shadow-sm">
            <div className="container">
            <Link to="/home">
              <img src={logo} alt="YM STORE" width="100px" height="px"/>
            </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " aria-current="page" to="/about">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " aria-current="page" to="/contact">Contact Us</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/collections">Collection</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link " aria-current="page" to="/cart">
                                <FontAwesomeIcon icon={faShoppingCart} /> Cart
                            </Link>
                        </li>
                        {AuthButtons}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
