import React, {useState} from 'react';
import { Box, Card, CardContent, Chip, Grid, IconButton, Typography } from '@mui/material';
import LazyLoad from 'react-lazyload';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ProductCard = ({product}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const discountPercentage = product.discount ? ((1 - product.discount / product.price) * 100).toFixed(0) : null;

    const handleMouseEnter = () => {
        setIsHovered(true);
        setImageIndex(1);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setImageIndex(0);
    };
    
    return(
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} sx={{minHeight: "100%", borderRight: "1px solid gray", borderBottom: "1px solid gray", position: "relative", }}>
            
            <Card
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    position: isHovered ? "absolute" : "relative",
                    top: 0,
                    left: 0,

                transform: isHovered ? "scale(1.05)" : "scale(1)",
                transformOrigin: 'center top',
                transition: "transform 0.3s ease-in-out",
                boxShadow: isHovered ? "5px 5px 15px rgba(0,0,0,0.3)" : "none",
                padding: "16px",
                minHeight: "400px",
                zIndex: isHovered ? 100 : 0,
                }}
            >
                <CardContent sx={{padding: 0}}>
                    <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <Box sx={{paddingTop: "5px"}}>
                            {discountPercentage && <Chip label={`-${discountPercentage}%`} variant="filled" color="error" size="small" sx={{fontSize: "12px", fontWeight: "700"}} />}
                        </Box>

                        <Box sx={{justifyContent: "flex-end", display: "flex", flexDirection: "column", gap: "10px"}}>
                            <IconButton aria-label="add to favorites">
                                <FavoriteBorderIcon color="info" />
                            </IconButton>
                        </Box>
                    </Box>
                </CardContent>

                <MuiLink component={RouterLink} underline='none' color="#000000" to={"/"}>
                    <LazyLoad once>
                        <img
                            height="194"
                            src={ product.images[imageIndex] ? product.images[imageIndex].imgSrc : product.images[0].imgSrc }
                            alt={product.title}
                            style={{objectFit: "contain", paddingTop: "10px", margin: "0 auto", display: "block", width: "100%"}}
                        />
                    </LazyLoad>
                </MuiLink>

                <Box sx={{paddingTop: "20px"}}>

                    <MuiLink component={RouterLink} underline='none' color="#000000" to={""} onClick={() => console.log("Sdfsdfhsjdf", product)}>
                        <Typography color="text.main" sx={{fontSize: "14px"}}>
                            {product.title}
                        </Typography>
                    </MuiLink>

                    <Typography color="text.secondary" sx={{fontSize: "14px", textDecoration: "line-through"}}>
                        {product?.discount && `${product.discount}₴`}
                    </Typography>

                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography color="text.secondary" sx={{fontSize: "24px", color: "red"}}>
                            {product.price}₴
                        </Typography>

                        <Box>
                            <IconButton aria-label="add to basket">
                                <AddShoppingCartIcon color="info" />
                            </IconButton>
                        </Box>
                    </Box>

                    {isHovered && (
                        <Typography variant="h6" color="text.secondary">
                            More information about the product...
                            <br />
                            Under development...
                        </Typography>
                    )}

                </Box>
            </Card>
        </Grid>
    )
};

export default ProductCard;