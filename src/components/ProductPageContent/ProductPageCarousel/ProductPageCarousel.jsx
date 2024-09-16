import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import ReactImageMagnify from 'react-image-magnify';
import { useTheme, useMediaQuery } from '@mui/material';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

const ProductPageCarousel = ({data, openModalFullImgs}) => {
    const theme = useTheme(); 
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));
    const matches900 = useMediaQuery(theme.breakpoints.down('md'));

    const [hoveredOnImg, setHoveredOnImg] = useState(false);
    const [hoveredOnArrow, setHoveredOnArrow] = useState(false);

    return (

        <Box sx={{ height: "auto", marginBottom: "20px", position: "relative"}}>
            <Box sx={{height: "100%", width: "100%", margin: "0 auto"}}>
                <Carousel
                    showThumbs={true}
                    dynamicHeight={true}
                    thumbWidth={54}
                    showStatus={false}
                    swipeable={true}
                    emulateTouch={true}
                    swipeScrollTolerance={50} // 20px for swipe (default 5px)
                    infiniteLoop={true}
                    showArrows={matches600 ? false : true}
                    renderArrowPrev={(onClickHandler, hasPrev, label) => 
                        hasPrev && (
                            <IconButton 
                                onClick={onClickHandler} 
                                title={label}
                                onMouseEnter={() => setHoveredOnArrow(true)}
                                onMouseLeave={() => setHoveredOnArrow(false)}
                                sx={{ 
                                    position: 'absolute', 
                                    left: 15, 
                                    top: 'calc(50% - 15px)',
                                    zIndex: 2, 
                                    borderRadius: "50%",
                                    color: hoveredOnImg || hoveredOnArrow ? "black" : "transparent",
                                    backgroundColor: hoveredOnArrow || hoveredOnImg ? "rgba(255, 255, 255, 0.6)" : "transparent",
                                    '&:hover': {
                                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                                        color: "black"
                                    },
                                }}>
                                <ArrowBackIosNewIcon />
                            </IconButton>
                        )
                    }
                    renderArrowNext={(onClickHandler, hasNext, label) => 
                        hasNext && (
                            <IconButton 
                                onClick={onClickHandler} 
                                title={label}
                                onMouseEnter={() => setHoveredOnArrow(true)}
                                onMouseLeave={() => setHoveredOnArrow(false)} 
                                sx={{ 
                                    position: 'absolute', 
                                    right: 15, 
                                    top: 'calc(50% - 15px)', 
                                    zIndex: 2, 
                                    borderRadius: "50%",
                                    color: hoveredOnImg || hoveredOnArrow ? "black" : "transparent",
                                    backgroundColor: hoveredOnArrow || hoveredOnImg ? "rgba(255, 255, 255, 0.6)" : "transparent",
                                    '&:hover': {
                                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                                        color: "black"
                                    }
                                }}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        )
                    }
                    renderThumbs={(children) =>
                        children.map((child, index) => (
                            <div key={index}>
                                {child}
                            </div>
                        ))
                    }
                >
                    {data.map((item, index) => (
                        <Box 
                            key={index}
                            onMouseEnter={() => setHoveredOnImg(true)}
                            onMouseLeave={() => setHoveredOnImg(false)}
                            onClick={matches900 ? () => openModalFullImgs(index) : undefined}
                            sx={{
                                width: "100%",
                                height: "auto",
                                overflow: "hidden",
                                margin: "0 auto",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                            }}
                        >
                            {matches900 ? 
                                <Box
                                    component="img"
                                    sx={{
                                        height: "auto",
                                        width: "auto",
                                        maxWidth: "460px",
                                        maxHeight: "460px",
                                        objectFit: "contain",
                                    }}
                                    alt="img from carousel"
                                    src={item.imgSrc}
                                />
                            :
                                <ReactImageMagnify {...{
                                    smallImage: {
                                        isFluidWidth: true,
                                        src: item.imgSrc,
                                        width: 500,
                                        height: 500,
                                        // srcSet: `${item.imgSrc} 355w, ${item.imgSrc} 481w, ${item.imgSrc} 584w, ${item.imgSrc} 687w, ${item.imgSrc} 770w, ${item.imgSrc} 861w, ${item.imgSrc} 955w, ${item.imgSrc} 1033w, ${item.imgSrc} 1112w, ${item.imgSrc} 1192w, ${item.imgSrc} 1200w`,
                                        // sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px',
                                    },
                                    largeImage: {
                                        src: item.imgBigSrc,
                                        width: 2000, //1200 2000
                                        height: 2100, //1800 2100
                                    },
                                    lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                                    enlargedImagePortalId: 'portal',
                                    enlargedImageContainerDimensions: {
                                        width: '150%',
                                        height: '100%',
                                    },
                                }}/> 
                            }
                        </Box>
                    ))}
                </Carousel>
            </Box> 

            {/* For big img when user is zooming */}
            <div
                id="portal"
                style={{ 
                    position: 'absolute', 
                    width: "100%", 
                    height: "auto", 
                    display: "flex",
                    backdropFilter: "saturate(180%) blur(30px)", 
                    justifyContent: "center",
                    alignItems: "top",
                    top: "0px", 
                    left: "calc(100% + 30px)", 
                    zIndex: 100 
                }}
                className="portal"
            />
        </Box>
    );
};

export default ProductPageCarousel;