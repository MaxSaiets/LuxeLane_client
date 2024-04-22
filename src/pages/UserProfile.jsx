import React, {useContext, useState} from "react";
import { UserStoreContext } from "../index";

import { Link } from "react-router-dom";
import { ADMIN_ROUTE, MAIN_ROUTE } from "../utils/consts";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Box, Divider, IconButton, Typography } from "@mui/material";
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Item = ({ title, to, icon, selected, setSelected, buttonLog = false, handleButtonLog }) => {

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
    const userStore = useContext(UserStoreContext);
    const navigate = useNavigate();

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("");
  
    const handleLogout = async () => {
        try {
            await userStore.logout();

            navigate(MAIN_ROUTE);
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
      <Box>
        <Sidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h5">
                    User Profile
                  </Typography>
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
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {userStore.user.name}
                  </Typography>
                  <Typography variant="h5">
                    {userStore.user.email}
                  </Typography>
                </Box>
              </Box>
            )}
  
            <Box >
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
                    to="/contacts"
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
    );
  };

export default UserProfile;