import React from 'react';
import { Box, IconButton, Typography, Button, Tooltip, Modal, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Carousel from 'react-responsive-carousel/lib/js/components/Carousel/index';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const FullCarouselImgsModal = ({ isOpen, onClose, images, title, selectedImageIndex, onImageChange }) => {
    if (!isOpen) return null;

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            BackdropComponent={Backdrop}
            BackdropProps={{
                sx: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Темніший фон
                },
            }}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: "20px auto"
            }}
        >
            <Box
                onClick={(e) => e.stopPropagation()} // Зупинка події, щоб не закривати модал при кліку на вміст
                sx={{
                    width: '90%',    
                    height: '100%',
                    maxWidth: '500px',
                    maxHeight: '600px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
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
                                textOverflow: 'ellipsis',
                                zIndex: 10
                            }}
                        >
                            {title}
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
        </Modal>
    );
};

export default FullCarouselImgsModal;