import React, { useContext, useState } from "react";
import { RootStoreContext } from "../store/RootStoreProvider";
import { ADMIN_ROUTE, MAIN_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { Box, Divider, IconButton, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { useMediaQuery, useTheme } from '@mui/material';

const Item = ({ title, to, icon, selected, isExternal, setSelected, buttonLog = false, handleButtonLog }) => {
  if (isExternal) {
    return (
      <MuiLink href={to} underline="none" color="#000000" target="_blank" rel="noopener noreferrer">
        <MenuItem
          active={selected === title}
          onClick={buttonLog ? handleButtonLog : () => setSelected(title)}
          icon={icon}
        >
          <Typography>{title}</Typography>
        </MenuItem>
      </MuiLink>
    );
  }
  return (
    <MuiLink component={RouterLink} underline='none' color="#000000" to={to}>
      <MenuItem
        active={selected === title}
        onClick={buttonLog ? handleButtonLog : () => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </MuiLink>
  );
};

const UserProfile = () => { 
    const { userStore } = useContext(RootStoreContext);
    const navigate = useNavigate();

    const [isCollapsed, setIsCollapsed] = useState(false);
    const sideBarWidth = isCollapsed ? 80 : 250;
    const [selected, setSelected] = useState("");

    const theme = useTheme();
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));
    
    const handleLogout = async () => {
        try {
            await userStore.logout();
            navigate(MAIN_ROUTE);
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <Box sx={{display: "flex", flexDirection: "row", maxWidth: "100vw", paddingBottom: matches600 ? "56px" : "0px"}}>

            <Box sx={{flex: "0 0 auto", width: `${sideBarWidth}px`}}>
                <Sidebar collapsed={isCollapsed}>
                    <Menu iconShape="square">
                        {/* LOGO AND MENU ICON */}
                        <MenuItem
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                            style={{ margin: "10px 0 20px 0" }}
                        >
                            {!isCollapsed && (
                                <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                    <Typography variant="h5">User Profile</Typography>
                                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                        <MenuOutlinedIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </MenuItem>

                        {!isCollapsed && (
                            <Box mb="25px">
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <img
                                        alt="User Icon"
                                        width="100px"
                                        height="100px"
                                        src={userStore.user.photoURL}
                                        style={{ cursor: "pointer", borderRadius: "50%" }}
                                    />
                                </Box>
                                <Box textAlign="center">
                                    <Typography variant="h5" fontWeight="bold" sx={{ m: "10px 0 0 0" }}>
                                        {userStore.user.name}
                                    </Typography>
                                    <Typography variant="h6">
                                        {userStore.user.email}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        <Box>
                            {userStore.user.role === "ADMIN" &&
                                <Item
                                    title="Admin panel"
                                    to={ADMIN_ROUTE}
                                    icon={<HomeOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            }

                            <Divider />

                            <Item
                                title="Manage Team"
                                to="/team"
                                icon={<PeopleOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="All Users"
                                to="/team"
                                icon={<PeopleOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Contacts Information"
                                to="https://maxsaiets.github.io/Portfolio/"
                                isExternal={true}
                                icon={<ContactsOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Invoices Balances"
                                to="/invoices"
                                icon={<ReceiptOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <Divider />
                            <Item
                                title="Logout"
                                icon={<HomeOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                                buttonLog={true}
                                handleButtonLog={handleLogout}
                            />
                        </Box>
                    </Menu>
                </Sidebar>
            </Box>


            <Box sx={{ flexGrow: 1, padding: matches600 ? '10px' : '20px', maxWidth: `calc(100vw - ${sideBarWidth}px)`, 
 }}>
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>User Profile</Typography>

                {/* Profile Details */}
                <Card sx={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h6">Profile Details</Typography>
                        <Divider sx={{ marginY: '10px' }} />
                        <Typography variant="body1"><strong>Name:</strong> {userStore.user.name}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {userStore.user.email}</Typography>
                        <Typography variant="body1"><strong>Role:</strong> {userStore.user.role}</Typography>
                    </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card sx={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h6">Recent Activities</Typography>
                        <Divider sx={{ marginY: '10px' }} />
                        <Typography variant="body1">You have 3 recent activities, including profile updates and new messages.</Typography>
                        {/* This could be replaced with a dynamic list of activities */}
                    </CardContent>
                </Card>

                {/* Profile Settings */}
                <Card sx={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h6">Profile Settings</Typography>
                        <Divider sx={{ marginY: '10px' }} />
                        <Button variant="contained" color="primary" sx={{ marginRight: '10px' }}>Edit Profile</Button>
                        <Button variant="contained" color="secondary">Change Password</Button>
                    </CardContent>
                </Card>

                {/* Additional Information */}
                <Card>
                    <CardContent>
                        <Typography variant="h6">Additional Information</Typography>
                        <Divider sx={{ marginY: '10px' }} />
                        <Typography variant="body1">Here you can find additional information related to your account, such as subscription details, billing information, etc.</Typography>
                        {/* Add more details as necessary */}
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default UserProfile;
