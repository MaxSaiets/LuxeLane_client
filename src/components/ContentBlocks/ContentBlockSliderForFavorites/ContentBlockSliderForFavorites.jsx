import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";

import CardsList from "../CardsList/CardsList";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../store/RootStoreProvider";
import { useContext } from "react";

import ContentBlockTitleSimple from "../ContentBlockTitleSimple/ContentBlockTitleSimple";

import { useTheme, useMediaQuery } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ContentBlockSliderForFavorites = observer(({itemsCount, sectionTitle, data, showAllItems}) => {
    const theme = useTheme();
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));

    const { favoritesStore, userStore } = useContext(RootStoreContext);
    
    // для перерендера компонента
    useEffect(() => {}, [favoritesStore.favoriteListCount]);
    

    const ITEM_HEIGHT = 48;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFavoriteRemoveList = () => {
        handleClose();
        favoritesStore.removeUserFavoriteList(userStore.user.id);
    }

    const menu = (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 'auto',
                    },
                }}
            >
                <MenuItem onClick={handleFavoriteRemoveList}>
                    <IconButton
                        size="medium"
                    >
                        <DeleteIcon  />
                    </IconButton>
                    <Typography>Clear the list</Typography> 
                </MenuItem>
            </Menu>
        </div>
    );

    return (
        <Box sx={{ width: "100%", margin: matches600 ? "15px 0" : "20px 0", display: "flex", flexDirection: "column", gap: matches600 ? "10px" : "20px", height: "auto"}}>

            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <ContentBlockTitleSimple sectionTitle={sectionTitle} />

                {menu}
            </Box>

            <Box sx={{width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", position: "relative"}}>
                <CardsList itemsCount={itemsCount} data={data} showAllItems={showAllItems} />
            </Box>
        </Box>
    );
});

export default ContentBlockSliderForFavorites