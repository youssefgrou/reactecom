import React ,{useEffect , useRef} from "react";
import Navbar from "../../layouts/frontend/Navbar";
import Productfilter from "./contents/Productfilter";
import Footer from "./contents/Footer";
import HCarousel from "./contents/HCarousel";
import img1 from '../../assets/img/hero-img-1.png'
import nike from '../../assets/frontend/img/nike.png'
import adidas from '../../assets/frontend/img/adidas.png'
import louisvuitton from '../../assets/frontend/img/louis-vuitton.png'
import puma from '../../assets/frontend/img/puma.png'
import zara from '../../assets/frontend/img/zara.png'
import levis from '../../assets/frontend/img/leviss.png'
import Feature from './Feature/Feature'
import './home.css' 

function Home() {
  const brandLogosRef = useRef(null);

  useEffect(() => {
    const brandLogos = brandLogosRef.current;
    const brandLogosWidth = brandLogos.scrollWidth;
    brandLogos.style.width = `${brandLogosWidth}px`;
  }, []);

  return (
    <div>
      
      <Navbar />
      <HCarousel />

      {/* header section */}
      {/* <section id="hero" class="hero section">
        <div class="container">
          <div class="row gy-4">
            <div class="movee col-lg-7 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1>Discover Limitless Possibilities at YM FASHION</h1>
              <p>
                Where Style Meets Substance - Explore Our Collection of Exquisite Fashion Pieces.
              </p>
              <div class="d-flex flex-column flex-md-row">
                <a href="#product" class="btn btn-primary">Get Started <i class="bi bi-arrow-right"></i></a>
              </div>
            </div>
            <div class="col-lg-5 order-1 order-lg-2 hero-img">
              <img className="img-fluid animated" src={img1} alt="hero header" />
            </div>
          </div>
        </div>
      </section> */}

       {/* brands section */}
      <section id="brands" className="brands section">
        <div className="container mt-3">
          <div className="col-12 text-center values-section">
            <button className="values-button">Our Brands</button>
          </div>
          <div className="brand-logo-container">
            <div className="brand-logos" ref={brandLogosRef}>
              <div className="brand-logo">
                <img src={nike} alt="Nike" className="img-fluid"/>
              </div>
              <div className="brand-logo">
                <img src={adidas} alt="ADIDAS" className="img-fluid"/>
              </div>
              <div className="brand-logo">
                <img src={louisvuitton} alt="Louis Vuitton" className="img-fluid"/>
              </div>
              <div className="brand-logo">
                <img src={puma} alt="Puma" className="img-fluid"/>
              </div>
              <div className="brand-logo">
                <img src={zara} alt="Zara" className="img-fluid"/>
              </div>
              <div className="brand-logo">
                <img src={levis} alt="levis" className="img-fluid"/>
              </div>
              
              {/* Repeat the logos to ensure smooth continuous scrolling */}
              <div className="brand-logo">
                <img src={nike} alt="Nike" className="img-fluid"/>
              </div>
              <div className="brand-logo">
                <img src={adidas} alt="ADIDAS" className="img-fluid"/>
              </div>
              <div className="brand-logo">
                <img src={louisvuitton} alt="Louis Vuitton" className="img-fluid"/>
              </div>
              <div className="brand-logo">
                <img src={puma} alt="Puma" className="img-fluid"/>
              </div>
              <div className="brand-logo">
                <img src={zara} alt="Zara" className="img-fluid"/>
              </div>
              <div className="brand-logo">
                <img src={levis} alt="levis" className="img-fluid"/>
              </div>
              
            </div>
          </div>
        </div>
      </section>
      
      <Feature />

      <Productfilter />
      
      <Footer />
    </div>

  );
}

export default Home;
