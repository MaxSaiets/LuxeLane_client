import React from "react";
import { Box } from "@mui/material";
import CardWrapperSimpleForSlide from "../CardWrapperSimpleForSlide/CardWrapperSimpleForSlide";

import Slider from "react-slick";
import "./SliderSlickForSlide.css"

const CardsListForSlide = ({carouserSettings, data}) => {
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

    const settings = {
        ...carouserSettings,
        dots: false,
        speed: 500,
        infinite: data.length > 1,
        swipeToSlide: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        arrows: data.length > 1,
        customPaging: function (i) {
            return <div className="dot"></div>;
        },
        dotsClass: "slick-dots slick-thumb",
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 7,
                }
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    swipeToSlide: true,
                }
            },{
                breakpoint: 700,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    swipeToSlide: true,
                }
            },{
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    swipeToSlide: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    swipeToSlide: true,
                }
            }
          ],
      };

    if (!data || data.length === 0) return null;

    if (data.length === 1) {
        return (
            <Box sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
            }}>
                <Box sx={{ maxWidth: 300, width: "100%" }}>
                    <CardWrapperSimpleForSlide product={data[0]} />
                </Box>
            </Box>
        );
    }
    return (
        <Slider {...settings}>
            {data && data.map((item, index) => (
                <CardWrapperSimpleForSlide key={index} product={item} />
            ))}
        </Slider>
    );
};

export default CardsListForSlide