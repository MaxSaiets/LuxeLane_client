import React, { useState } from "react";

import AdminRouter from "../components/Routers/AdminRouter";

import AdminSideBar from "../components/AdminContent/AdminSideBar/AdminSideBar";

import { Box } from "@mui/material";
import { useMediaQuery, useTheme } from '@mui/material';

const AdminPanel = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const theme = useTheme();
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));
    
    const sideBarWidth = isCollapsed ? 80 : 250;

    return (
        <div className="app">
            <main className="content">
                <Box sx={{display: "flex", flexDirection: "row", maxWidth: "100vw"}}>
                    <Box sx={{flex: "0 0 auto", width: `${sideBarWidth}px`}}>
                        <AdminSideBar 
                            isCollapsed={isCollapsed} 
                            setIsCollapsed={setIsCollapsed} 
                        />
                    </Box>

                    <Box 
                        sx={{
                            flexGrow: 1, 
                            padding: matches600 ? '10px' : '20px', 
                            maxWidth: `calc(100vw - ${sideBarWidth}px)`, 
                            boxSizing: "border-box",
                            marginBottom: matches600 ? "56px" : "0px",
                            overflowY: "auto"
                        }}
                    >
                        <AdminRouter />
                    </Box>              
                </Box>
            </main>
        </div>
    );
};

export default AdminPanel;
