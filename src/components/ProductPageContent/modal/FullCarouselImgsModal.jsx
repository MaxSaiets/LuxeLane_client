import React from 'react';
import { Box, IconButton, Typography, Button, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Carousel from 'react-responsive-carousel/lib/js/components/Carousel/index';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const FullCarouselImgsModal = ({ isOpen, onClose, images, title, selectedImageIndex, onImageChange }) => {
    if (!isOpen) return null;

    return (
        <Box
            onClick={onClose} // Закриття при кліку на фон
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                maxHeight: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'center',
                zIndex: 1000,
                padding: 2,
                paddingTop: "40%"
            }}
        >
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)'
                    }
                }}
            >
                <CloseIcon />
            </IconButton>

            <Box
                onClick={(e) => e.stopPropagation()} // Зупинка події, щоб не закривати модал при кліку на вміст
                sx={{
                    width: '90%',    
                    height: '80%',
                    maxWidth: '500px',
                    maxHeight: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Carousel
                    selectedItem={selectedImageIndex}
                    onChange={onImageChange}
                    showThumbs={false}
                    dynamicHeight={true}
                    showStatus={false}
                    swipeable={true}
                    emulateTouch={true}
                    infiniteLoop={true}
                    showArrows={true}
                    sx={{ width: '100%', height: '100%' }}
                    renderArrowPrev={(onClickHandler, hasPrev, label) => hasPrev && (
                        <IconButton
                            onClick={onClickHandler}
                            title={label}
                            sx={{ position: 'absolute', left: 15, top: 'calc(50% - 15px)', zIndex: 2, color: 'white' }}
                        >
                            <ArrowBackIosNewIcon />
                        </IconButton>
                    )}
                    renderArrowNext={(onClickHandler, hasNext, label) => hasNext && (
                        <IconButton
                            onClick={onClickHandler}
                            title={label}
                            sx={{ position: 'absolute', right: 15, top: 'calc(50% - 15px)', zIndex: 2, color: 'white' }}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    )}
                >
                    {images.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Box
                                component="img"
                                sx={{
                                    maxWidth: '500px',
                                    maxHeight: '500px',
                                    objectFit: 'contain'
                                }}
                                alt={`Product image ${index + 1}`}
                                src={item.imgSrc}
                            />
                        </Box>
                    ))}
                </Carousel>

                <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
                    <Tooltip title={title} arrow>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                color: 'white',
                                marginTop: 2,
                                maxWidth: '100%',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {/* {title} */}
                            Ноутбук Acer Aspire 7 A715-76G-56U7 (NH.QN4EU.001) Charcoal Black / Intel Core i5-12450H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 2050, 4 ГБ / Підсвітка клавіатури
                        </Typography>
                    </Tooltip>
                    
                    <Box sx={{textAlign: "center"}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => window.open(images[selectedImageIndex].imgBigSrc, '_blank')}
                            sx={{
                                marginTop: 2,
                                width: "auto"
                            }}
                        >
                            Відкрити повне фото
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default FullCarouselImgsModal;