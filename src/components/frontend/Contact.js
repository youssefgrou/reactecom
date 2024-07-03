import React from "react";
import Navbar from "../../layouts/frontend/Navbar";
import "./home.css"; // Update the filename to match the component
import Footer from "./contents/Footer";

function Contact() {
  return (
    <div className="contact-container">
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12 text-center animate__animated animate__fadeIn">
            <h2 className="display-4 font-weight-bold">Contact Us</h2>
            <p className="lead mt-3">We'd love to hear from you! Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.</p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 animate__animated animate__fadeInLeft">
            <h3 className="font-weight-bold">Get in Touch</h3>
            <form className="mt-3">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" id="message" rows="5" placeholder="Enter your message"></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
          </div>
          <div className="col-md-6 animate__animated animate__fadeInRight">
            <h3 className="font-weight-bold">Contact Information</h3>
            <p className="mt-3">Feel free to reach out to us through any of the following methods:</p>
            <ul className="list-group list-group-flush mt-3">
              <li className="list-group-item"><strong>Email:</strong> ym_store@gmail.com</li>
              <li className="list-group-item"><strong>Phone:</strong> +212 678 420419 | +212 6799 78330</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Contact;
