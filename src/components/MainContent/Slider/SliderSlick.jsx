import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderSlick.css"

import AdFirst from ".././AdsImg/1.jpg";
import AdSecond from ".././AdsImg/2.jpg";
import AdThird from ".././AdsImg/3.jpg";
import AdFourth from ".././AdsImg/4.jpg";
import { Box } from "@mui/system";

const SliderSlick = () => {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block"}}
            onClick={onClick}
          />
        );
    }
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block"}}
            onClick={onClick}
          />
        );
    }

    var settings = {
        dots: true,
        height: 200,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        customPaging: function (i) {
            return <div className="dot"></div>;
          },
          dotsClass: "slick-dots slick-thumb",
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ],
        
      };
    
    const images = [
        AdFirst,
        AdSecond,
        AdThird,
        AdFourth,
    ];

    return (
        <Slider {...settings} style={{width: "100%", height: "100%"}}>
          {images.map((image, index) => (
            <div key={index} className="slider_img__wrapper">
                <img src={image} alt={`slide-${index}`} style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
            </div>  
          ))}
        </Slider>
    );
};

export default SliderSlick;