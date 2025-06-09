import React, { useState, useContext } from "react";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';

import { RootStoreContext } from "../../../store/RootStoreProvider";

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

import { ADMIN_ALLUSERS_ROUTE, ADMIN_CATEGORIES_ROUTE, ADMIN_BRANDS_ROUTE, ADMIN_TYPES_ROUTE, ADMIN_PRODUCTS_ROUTE, USERPROFILE_ROUTE } from "../../../utils/consts";

const Item = ({ title, to, icon, selected, setSelected, isExternal }) => {
  if (isExternal) {
    return (
      <MuiLink href={to} underline="none" color="#000000" target="_blank" rel="noopener noreferrer">
        <MenuItem
          active={selected === title}
          onClick={() => setSelected(title)}
          icon={icon}
        >
          <Typography>{title}</Typography>
        </MenuItem>
      </MuiLink>
    );
  }

  return (
    <MuiLink component={RouterLink} underline="none" color="#000000" to={to}>
      <MenuItem
        active={selected === title}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </MuiLink>
  );
};

const AdminSideBar = ({ isCollapsed, setIsCollapsed }) => {
  const {userStore} = useContext(RootStoreContext);

  const [selected, setSelected] = useState("Dashboard");

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
                  ADMIN PANEL
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
                  alt="profile-user"
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
            <Item
              title="Dashboard"
              to={USERPROFILE_ROUTE}
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Divider />

            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
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

            <Typography
              variant="h6"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Users
            </Typography>
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="All Users"
              to={ADMIN_ALLUSERS_ROUTE}
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Divider />
            <Typography
              variant="h6"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Products
            </Typography>
            <Item
              title="Products"
              to={ADMIN_PRODUCTS_ROUTE}
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Divider />
            <Typography
              variant="h6"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Categories
            </Typography>
            <Item
              title="Categories"
              to={ADMIN_CATEGORIES_ROUTE}
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Divider />
            <Typography
              variant="h6"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Brands
            </Typography>
            <Item
              title="Brands"
              to={ADMIN_BRANDS_ROUTE}
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Divider />
            <Typography
              variant="h6"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Types
            </Typography>
            <Item
              title="Types"
              to={ADMIN_TYPES_ROUTE}
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider />

            <Typography
              variant="h6"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default AdminSideBar;