import React, { useState } from "react";

import AdminRouter from "../components/Routers/AdminRouter";

import AdminSideBar from "../components/AdminContent/AdminSideBar/AdminSideBar";

import { Box } from "@mui/material";

const AdminPanel = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

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
                            padding: "0 20px", 
                            maxWidth: `calc(100vw - ${sideBarWidth}px)`, 
                            boxSizing: "border-box"
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
