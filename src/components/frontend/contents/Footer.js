import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import logo from '../../../assets/frontend/img/ymlogo.svg';
import '../home.css'
const Footer = () => {
  return (
    <footer className="py-1 bg-light mt-3 footer">
      <div className="container">
        <div className="row align-items-center text-center text-lg-start py-2">
          <div className="col-lg-3 mb-4 mb-lg-0">
            <Link to="/home">
              <img src={logo} alt="YM STORE" width="150px" />
            </Link>
          </div>
          <div className="col-lg-6 mb-4 mb-lg-0">
            <ul className="text-secondary list-unstyled d-flex flex-column flex-md-row justify-content-center mb-0">
              <li className="mx-3 my-2">
                <Link to="/home" className="text-decoration-none text-dark font-weight-semibold">Home</Link>
              </li>
              <li className="mx-3 my-2">
                <Link to="/about" className="text-decoration-none font-weight-semibold">About Us</Link>
              </li>
              <li className="mx-3 my-2">
                <Link to="/contact" className="text-decoration-none font-weight-semibold">Contact Us</Link>
              </li>
              <li className="mx-3 my-2">
                <Link id="#product" className="text-decoration-none font-weight-semibold">Product</Link>
              </li>
              <li className="mx-3 my-2">
                <Link to="#" className="text-decoration-none font-weight-semibold">Link Five</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3">
            <div className="d-flex justify-content-center justify-content-lg-start">
              <Link to="#" className="icones text-decoration-none mx-2">
                <FaFacebook size="24" />
              </Link>
              <Link to="#" className="icones text-decoration-none mx-2">
                <FaInstagram size="24" />
              </Link>
              <Link to="#" className="icones text-decoration-none mx-2">
                <FaTwitter size="24" />
              </Link>
              <Link to="#" className="icones text-decoration-none mx-2">
                <FaLinkedin size="24" />
              </Link>
              <Link to="#" className="icones text-decoration-none mx-2">
                <FaYoutube size="24" />
              </Link>
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex flex-column flex-md-row justify-content-between text-center text-md-left">
          <p className="fs-6  mb-md-0">© 2024 YM STORE. All rights reserved.</p>
          <ul className="fs-6 list-unstyled d-flex flex-column flex-md-row justify-content-center mb-0">
            <li className="mx-3 my-2">
              <Link to="#" className="text-decoration-none">Privacy Policy</Link>
            </li>
            <li className="mx-3 my-2">
              <Link to="#" className="text-decoration-none">Terms of Service</Link>
            </li>
            <li className="mx-3 my-2">
              <Link to="#" className="text-decoration-none">Cookies Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
