import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import bannerImgOne from "../../../assets/frontend/img/7.jpg"; 
import bannerImgTwo from "../../../assets/frontend/img/5.jpg"; 
import bannerImgThree from "../../../assets/frontend/img/switch2.jpg"; 
import "../home.css";

function HCarousel() {
    return (
        React.createElement("div", null,
            React.createElement(Carousel, { interval: 3000, fade: true, pause: false },
                React.createElement(Carousel.Item, null,
                    React.createElement("img", {
                        className: "d-block w-100",
                        src: bannerImgOne,
                        alt: "Slide 1"
                    }),
                    React.createElement(Carousel.Caption, { className: "text-left" },
                        React.createElement("h3", { className: "text-dark" }, "Welcome to YM STORE"),
                        React.createElement("p", { className: "text-dark" }, "Your one-stop shop for the best fashion products at the best prices.")
                    )
                ),
                React.createElement(Carousel.Item, null,
                    React.createElement("img", {
                        className: "d-block w-100",
                        src: bannerImgTwo,
                        alt: "Slide 2"
                    }),
                    React.createElement(Carousel.Caption, { className: "text-left" },
                        React.createElement("h3", { className: "text-dark" }, "Quality and Comfort"),
                        React.createElement("p", { className: "text-dark" }, "Experience the best in quality and comfort with our products.")
                    )
                ),
                React.createElement(Carousel.Item, null,
                    React.createElement("img", {
                        className: "d-block w-100",
                        src: bannerImgThree,
                        alt: "Slide 3"
                    })
                )
            )
        )
    );
}

export default HCarousel;
