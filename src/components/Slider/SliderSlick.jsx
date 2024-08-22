import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderSlick.css"

import AdFirst from "./AdsImg/1.jpg";
import AdSecond from "./AdsImg/2.jpg";
import AdThird from "./AdsImg/3.jpg";
import AdFourth from "./AdsImg/4.jpg";

import { useMediaQuery, useTheme } from "@mui/material";

const SliderSlick = () => {
    const theme = useTheme();
    const matches800 = useMediaQuery(theme.breakpoints.down('msm'));

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: matches800 ? "none" : "block"}}
            onClick={onClick}
          />
        );
    }
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: matches800 ? "none" : "block"}}
            onClick={onClick}
          />
        );
    }

    var settings = {
        dots: true,
        infinite: true,
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
            breakpoint: 1920,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 1440,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
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