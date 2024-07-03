import React from "react";
import Navbar from "../../layouts/frontend/Navbar";
import { Link } from "react-router-dom";
import "./home.css"; // Update the filename to match the component
import Footer from './contents/Footer'
function About() {
  return (
    <div className="about-container">
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12 text-center animate__animated animate__fadeIn">
            <h2 className="display-4 font-weight-bold">About Us</h2>
            <p className="lead mt-3">We are YM STORE, a fashion website dedicated to bringing you the latest trends and styles.</p>
            <p>Our mission is to provide high-quality, fashionable clothing at affordable prices.</p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 animate__animated animate__fadeInLeft">
            <h3 className="font-weight-bold">Our Values</h3>
            <ul className="list-group list-group-flush mt-3">
              <li className="list-group-item">Quality: We ensure that all our products meet the highest standards of quality.</li>
              <li className="list-group-item">Style: We stay up-to-date with the latest fashion trends to offer you the best styles.</li>
              <li className="list-group-item">Affordability: We believe that everyone should have access to fashionable clothing without breaking the bank.</li>
              <li className="list-group-item">Customer Service: We are committed to providing excellent customer service to ensure a pleasant shopping experience.</li>
            </ul>
          </div>
          <div className="col-md-6 animate__animated animate__fadeInRight">
            <h3 className="font-weight-bold">Why Choose Us?</h3>
            <p className="mt-3">At our fashion website, you can find:</p>
            <ul className="list-group list-group-flush mt-3">
              <li className="list-group-item">A wide range of stylish clothing for all occasions.</li>
              <li className="list-group-item">Exclusive collections and limited-time offers.</li>
              <li className="list-group-item">Easy and secure online shopping experience.</li>
              <li className="list-group-item">Fast and reliable shipping.</li>
            </ul>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12 text-center animate__animated animate__fadeInUp">
            <p>Thank you for choosing us as your go-to fashion destination. We hope you enjoy shopping with us!</p>
            <Link to="/home" className="btn btn-primary btn-sm mt-3">Back to Home</Link>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default About;
