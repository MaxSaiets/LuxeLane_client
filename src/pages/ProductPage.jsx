import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, Grid } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import "../utils/customStyles/reactImagaMagnifyCustomStyles/reactImageMagnifyCustomStyles.css" // requires a loader // original styles -- import "react-responsive-carousel/lib/styles/carousel.min.css";
import { fetchProductData } from "../http/productApi";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import ReactImageMagnify from 'react-image-magnify';

import { RootStoreContext } from "../store/RootStoreProvider";
import { useTheme, useMediaQuery } from '@mui/material';

const ProductPage = () => {
    const { userStore, recentryViewedStore } = useContext(RootStoreContext);

    const theme = useTheme(); 
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));

    const { id } = useParams();
    const [productData, setProductData] = useState(null);
    const [hoveredOnImg, setHoveredOnImg] = useState(false);
    const [hoveredOnArrow, setHoveredOnArrow] = useState(false);

    useEffect(() => {
        // if(userStore.isAuth){
        //     recentryViewedStore.addRecentlyViewedProduct({productId: id, userId: userStore.user.id});
        // }

        fetchProductData(id).then(data => {
            console.log("Product DATA: ", data);
            setProductData(data)
        });
    }, [id]);
    
    if (!productData) {
        return <div>Loading...</div>;
    }

    return (
        <Grid container sx={{paddingBottom: matches600 ? "56px" : undefined}}>
            {/* Product navbar */}
            <Grid item xs={12} sx={{
                position: "sticky",
                top: matches600 ? "56px" : "64px",
                zIndex: "1000",
                borderBottom: "1px solid black",
                padding: "5px 16px",
                backdropFilter: "saturate(180%) blur(20px)",
                backgroundColor: theme => alpha(theme.palette.primary.main, 0.7),
                boxSizing: "border-box"
            }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                    <MuiLink component={RouterLink} underline='none' color="#000000" to={"#product-description"}>
                        <Typography variant="h6" component="div">
                            Усе про товар
                        </Typography>
                    </MuiLink>
                    <MuiLink component={RouterLink} underline='none' color="#000000" to={"/"}>
                        <Typography variant="h6" component="div">
                            Характеристики
                        </Typography>
                    </MuiLink>
                    <MuiLink component={RouterLink} underline='none' color="#000000" to={"/"}>
                        <Typography variant="h6" component="div">
                            Відгуки
                        </Typography>
                    </MuiLink>
                    <MuiLink component={RouterLink} underline='none' color="#000000" to={"/"}>
                        <Typography variant="h6" component="div">
                            Питання
                        </Typography>
                    </MuiLink>
                </Box>
            </Grid>

            <Grid container sx={{ maxWidth: "1570px", margin: "0 auto"}}>
 
                {/* Product images carousel */}
                <Grid 
                    item xs={12} md={6} 
                    sx={{
                        padding: "24px 15px 0 24px", 
                        zIndex: "500"
                    }}
                >   
                    <Box sx={{ position: "sticky", top: "128px" }}>
                        <Box sx={{ height: "auto", marginBottom: "20px", position: "relative"}}>
                            <Box sx={{height: "100%", width: "100%", margin: "0 auto"}}>
                                <Carousel
                                    showThumbs={true}
                                    dynamicHeight={true}
                                    thumbWidth={54} 
                                    showStatus={false}
                                    emulateTouch={true}
                                    infiniteLoop={true}
                                    // centerMode={true}
                                    // centerSlidePercentage={100}
                                    // width={"80%"}
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
                                    {productData.images.map((item, index) => (
                                        <Box 
                                            key={index}
                                            onMouseEnter={() => setHoveredOnImg(true)}
                                            onMouseLeave={() => setHoveredOnImg(false)}
                                            sx={{
                                                maxHeight: "100%",
                                                maxWidth: "100%",
                                            }}
                                        >
                                            <ReactImageMagnify {...{
                                                smallImage: {
                                                    isFluidWidth: true,
                                                    src: item.imgSrc,
                                                    srcSet: `${item.imgSrc} 355w, ${item.imgSrc} 481w, ${item.imgSrc} 584w, ${item.imgSrc} 687w, ${item.imgSrc} 770w, ${item.imgSrc} 861w, ${item.imgSrc} 955w, ${item.imgSrc} 1033w, ${item.imgSrc} 1112w, ${item.imgSrc} 1192w, ${item.imgSrc} 1200w`,
                                                    sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px',
                                                },
                                                largeImage: {
                                                    src: item.imgSrc,
                                                    width: 2000, //1200
                                                    height: 2100 //1800
                                                },
                                                lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                                                // enlargedImagePortalId: 'portal',
                                                enlargedImageContainerDimensions: {
                                                    width: '100%',
                                                    height: '100%'
                                                },
                                            }} /> 
                                        </Box>
                                    ))}
                                </Carousel>
                            </Box> 

                            
                        </Box>
    
                        {/* BOX UNDER PICTURES */}
                        <Box>
                            <Typography variant="h6" component="div" gutterBottom>
                                {productData.title}
                            </Typography>
                            <Typography variant="h6" component="div" gutterBottom>
                                Ціна: {productData.price} грн
                            </Typography>
                            <Typography variant="body1" component="div" gutterBottom>
                        
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor consectetur aliquet. Proin blandit, quam in bibendum luctus, nisl leo ultrices justo, id consectetur lectus ligula vitae metus. Fusce ut sapien hendrerit, scelerisque nisi vel, auctor urna. Nullam congue, purus semper dignissim rutrum, justo tortor semper ligula, ac gravida sapien est sed nisl. Donec pretium magna id arcu interdum, nec sodales mi ornare. Phasellus congue, augue eu tempor tempus, orci erat porta magna, vitae aliquam velit enim bibendum augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras vitae sapien placerat, porta arcu quis, venenatis dolor. Praesent velit lorem, interdum quis dolor vel, pretium ornare leo. In aliquet turpis dui, in mollis odio laoreet vel. Nullam at eros lacinia, ullamcorper velit eu, efficitur lorem. Vivamus sodales augue odio, sodales bibendum quam convallis quis. Praesent et velit nulla. Pellentesque dapibus sem neque, ac facilisis neque tempus non.
                            <br />
                            Donec interdum molestie vehicula. Integer cursus sollicitudin tempus. Etiam vitae accumsan nisi. Etiam nec blandit turpis. Nullam cursus tempus nibh. Ut mollis est eget mauris tristique, sit amet pharetra ligula consectetur. Cras aliquam elementum purus, eget finibus leo accumsan vitae. Donec molestie neque iaculis malesuada elementum. Sed varius fermentum eleifend. Mauris pharetra mauris vel purus ultrices, id congue ipsum efficitur. Sed varius orci eget lacus rutrum vehicula.
                            <br />
                            Quisque eu faucibus dui. Morbi bibendum feugiat ultricies. In egestas facilisis augue, quis ornare felis interdum sit amet. Cras non ultrices felis. Pellentesque a volutpat diam. Praesent rutrum diam porttitor justo efficitur, non pulvinar libero sodales. Curabitur vulputate, nibh eget malesuada tempus, diam quam vulputate leo, vel cursus erat mauris at erat. Etiam elementum nisl sed dolor dignissim, in pretium felis porttitor.
                            </Typography>
                        </Box>

                    </Box>
                </Grid>

                {/* Product main info */}
                <Grid item xs={12} md={6} sx={{ 
                    padding: "24px 24px 0 15px", 
                    position: "relative",
                }}>
                    {/* For big img when user is zooming */}
                    <div
                        id="portal"
                        style={{ position: 'absolute', top: "16px", left: "16px", zIndex: 100 }}
                        className="portal"
                    />  
                    <Typography variant="h5" component="div" gutterBottom>
                        {productData.title}
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        Ціна: {productData.price} грн
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ marginTop: "16px" }}>
                        Додати до кошика
                    </Button>
                    <Box sx={{ marginTop: "16px" }}>
                        <Typography variant="h5" component="div" gutterBottom>
                            Характеристики
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                        
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor consectetur aliquet. Proin blandit, quam in bibendum luctus, nisl leo ultrices justo, id consectetur lectus ligula vitae metus. Fusce ut sapien hendrerit, scelerisque nisi vel, auctor urna. Nullam congue, purus semper dignissim rutrum, justo tortor semper ligula, ac gravida sapien est sed nisl. Donec pretium magna id arcu interdum, nec sodales mi ornare. Phasellus congue, augue eu tempor tempus, orci erat porta magna, vitae aliquam velit enim bibendum augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras vitae sapien placerat, porta arcu quis, venenatis dolor. Praesent velit lorem, interdum quis dolor vel, pretium ornare leo. In aliquet turpis dui, in mollis odio laoreet vel. Nullam at eros lacinia, ullamcorper velit eu, efficitur lorem. Vivamus sodales augue odio, sodales bibendum quam convallis quis. Praesent et velit nulla. Pellentesque dapibus sem neque, ac facilisis neque tempus non.
                            <br />
                            Donec interdum molestie vehicula. Integer cursus sollicitudin tempus. Etiam vitae accumsan nisi. Etiam nec blandit turpis. Nullam cursus tempus nibh. Ut mollis est eget mauris tristique, sit amet pharetra ligula consectetur. Cras aliquam elementum purus, eget finibus leo accumsan vitae. Donec molestie neque iaculis malesuada elementum. Sed varius fermentum eleifend. Mauris pharetra mauris vel purus ultrices, id congue ipsum efficitur. Sed varius orci eget lacus rutrum vehicula.
                            <br />
                            Quisque eu faucibus dui. Morbi bibendum feugiat ultricies. In egestas facilisis augue, quis ornare felis interdum sit amet. Cras non ultrices felis. Pellentesque a volutpat diam. Praesent rutrum diam porttitor justo efficitur, non pulvinar libero sodales. Curabitur vulputate, nibh eget malesuada tempus, diam quam vulputate leo, vel cursus erat mauris at erat. Etiam elementum nisl sed dolor dignissim, in pretium felis porttitor.
                        
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                        
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor consectetur aliquet. Proin blandit, quam in bibendum luctus, nisl leo ultrices justo, id consectetur lectus ligula vitae metus. Fusce ut sapien hendrerit, scelerisque nisi vel, auctor urna. Nullam congue, purus semper dignissim rutrum, justo tortor semper ligula, ac gravida sapien est sed nisl. Donec pretium magna id arcu interdum, nec sodales mi ornare. Phasellus congue, augue eu tempor tempus, orci erat porta magna, vitae aliquam velit enim bibendum augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras vitae sapien placerat, porta arcu quis, venenatis dolor. Praesent velit lorem, interdum quis dolor vel, pretium ornare leo. In aliquet turpis dui, in mollis odio laoreet vel. Nullam at eros lacinia, ullamcorper velit eu, efficitur lorem. Vivamus sodales augue odio, sodales bibendum quam convallis quis. Praesent et velit nulla. Pellentesque dapibus sem neque, ac facilisis neque tempus non.
                            <br />
                            Donec interdum molestie vehicula. Integer cursus sollicitudin tempus. Etiam vitae accumsan nisi. Etiam nec blandit turpis. Nullam cursus tempus nibh. Ut mollis est eget mauris tristique, sit amet pharetra ligula consectetur. Cras aliquam elementum purus, eget finibus leo accumsan vitae. Donec molestie neque iaculis malesuada elementum. Sed varius fermentum eleifend. Mauris pharetra mauris vel purus ultrices, id congue ipsum efficitur. Sed varius orci eget lacus rutrum vehicula.
                            <br />
                            Quisque eu faucibus dui. Morbi bibendum feugiat ultricies. In egestas facilisis augue, quis ornare felis interdum sit amet. Cras non ultrices felis. Pellentesque a volutpat diam. Praesent rutrum diam porttitor justo efficitur, non pulvinar libero sodales. Curabitur vulputate, nibh eget malesuada tempus, diam quam vulputate leo, vel cursus erat mauris at erat. Etiam elementum nisl sed dolor dignissim, in pretium felis porttitor.
                        
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                        
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor consectetur aliquet. Proin blandit, quam in bibendum luctus, nisl leo ultrices justo, id consectetur lectus ligula vitae metus. Fusce ut sapien hendrerit, scelerisque nisi vel, auctor urna. Nullam congue, purus semper dignissim rutrum, justo tortor semper ligula, ac gravida sapien est sed nisl. Donec pretium magna id arcu interdum, nec sodales mi ornare. Phasellus congue, augue eu tempor tempus, orci erat porta magna, vitae aliquam velit enim bibendum augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras vitae sapien placerat, porta arcu quis, venenatis dolor. Praesent velit lorem, interdum quis dolor vel, pretium ornare leo. In aliquet turpis dui, in mollis odio laoreet vel. Nullam at eros lacinia, ullamcorper velit eu, efficitur lorem. Vivamus sodales augue odio, sodales bibendum quam convallis quis. Praesent et velit nulla. Pellentesque dapibus sem neque, ac facilisis neque tempus non.
                            <br />
                            Donec interdum molestie vehicula. Integer cursus sollicitudin tempus. Etiam vitae accumsan nisi. Etiam nec blandit turpis. Nullam cursus tempus nibh. Ut mollis est eget mauris tristique, sit amet pharetra ligula consectetur. Cras aliquam elementum purus, eget finibus leo accumsan vitae. Donec molestie neque iaculis malesuada elementum. Sed varius fermentum eleifend. Mauris pharetra mauris vel purus ultrices, id congue ipsum efficitur. Sed varius orci eget lacus rutrum vehicula.
                            <br />
                            Quisque eu faucibus dui. Morbi bibendum feugiat ultricies. In egestas facilisis augue, quis ornare felis interdum sit amet. Cras non ultrices felis. Pellentesque a volutpat diam. Praesent rutrum diam porttitor justo efficitur, non pulvinar libero sodales. Curabitur vulputate, nibh eget malesuada tempus, diam quam vulputate leo, vel cursus erat mauris at erat. Etiam elementum nisl sed dolor dignissim, in pretium felis porttitor.
                        
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                        
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor consectetur aliquet. Proin blandit, quam in bibendum luctus, nisl leo ultrices justo, id consectetur lectus ligula vitae metus. Fusce ut sapien hendrerit, scelerisque nisi vel, auctor urna. Nullam congue, purus semper dignissim rutrum, justo tortor semper ligula, ac gravida sapien est sed nisl. Donec pretium magna id arcu interdum, nec sodales mi ornare. Phasellus congue, augue eu tempor tempus, orci erat porta magna, vitae aliquam velit enim bibendum augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras vitae sapien placerat, porta arcu quis, venenatis dolor. Praesent velit lorem, interdum quis dolor vel, pretium ornare leo. In aliquet turpis dui, in mollis odio laoreet vel. Nullam at eros lacinia, ullamcorper velit eu, efficitur lorem. Vivamus sodales augue odio, sodales bibendum quam convallis quis. Praesent et velit nulla. Pellentesque dapibus sem neque, ac facilisis neque tempus non.
                            <br />
                            Donec interdum molestie vehicula. Integer cursus sollicitudin tempus. Etiam vitae accumsan nisi. Etiam nec blandit turpis. Nullam cursus tempus nibh. Ut mollis est eget mauris tristique, sit amet pharetra ligula consectetur. Cras aliquam elementum purus, eget finibus leo accumsan vitae. Donec molestie neque iaculis malesuada elementum. Sed varius fermentum eleifend. Mauris pharetra mauris vel purus ultrices, id congue ipsum efficitur. Sed varius orci eget lacus rutrum vehicula.
                            <br />
                            Quisque eu faucibus dui. Morbi bibendum feugiat ultricies. In egestas facilisis augue, quis ornare felis interdum sit amet. Cras non ultrices felis. Pellentesque a volutpat diam. Praesent rutrum diam porttitor justo efficitur, non pulvinar libero sodales. Curabitur vulputate, nibh eget malesuada tempus, diam quam vulputate leo, vel cursus erat mauris at erat. Etiam elementum nisl sed dolor dignissim, in pretium felis porttitor.
                         
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                        
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor consectetur aliquet. Proin blandit, quam in bibendum luctus, nisl leo ultrices justo, id consectetur lectus ligula vitae metus. Fusce ut sapien hendrerit, scelerisque nisi vel, auctor urna. Nullam congue, purus semper dignissim rutrum, justo tortor semper ligula, ac gravida sapien est sed nisl. Donec pretium magna id arcu interdum, nec sodales mi ornare. Phasellus congue, augue eu tempor tempus, orci erat porta magna, vitae aliquam velit enim bibendum augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras vitae sapien placerat, porta arcu quis, venenatis dolor. Praesent velit lorem, interdum quis dolor vel, pretium ornare leo. In aliquet turpis dui, in mollis odio laoreet vel. Nullam at eros lacinia, ullamcorper velit eu, efficitur lorem. Vivamus sodales augue odio, sodales bibendum quam convallis quis. Praesent et velit nulla. Pellentesque dapibus sem neque, ac facilisis neque tempus non.
                            <br />
                            Donec interdum molestie vehicula. Integer cursus sollicitudin tempus. Etiam vitae accumsan nisi. Etiam nec blandit turpis. Nullam cursus tempus nibh. Ut mollis est eget mauris tristique, sit amet pharetra ligula consectetur. Cras aliquam elementum purus, eget finibus leo accumsan vitae. Donec molestie neque iaculis malesuada elementum. Sed varius fermentum eleifend. Mauris pharetra mauris vel purus ultrices, id congue ipsum efficitur. Sed varius orci eget lacus rutrum vehicula.
                            <br />
                            Quisque eu faucibus dui. Morbi bibendum feugiat ultricies. In egestas facilisis augue, quis ornare felis interdum sit amet. Cras non ultrices felis. Pellentesque a volutpat diam. Praesent rutrum diam porttitor justo efficitur, non pulvinar libero sodales. Curabitur vulputate, nibh eget malesuada tempus, diam quam vulputate leo, vel cursus erat mauris at erat. Etiam elementum nisl sed dolor dignissim, in pretium felis porttitor.
                        
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductPage;
