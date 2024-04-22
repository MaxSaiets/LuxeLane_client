import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { adminRoutes } from "../../routes";
import { MAIN_ROUTE } from "../../utils/consts";
import { UserStoreContext } from "../..";

import { CircularProgress, Grid } from "@mui/material";

const AdminRouter = () => {
    const user = useContext(UserStoreContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(user.isAuth) {
            setIsLoading(false)
        }
    }, [user.isAuth]);

    if (isLoading) {

        return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
            <CircularProgress />
        </Grid>
        );
    }

    return (
        <Routes> 
            
            { user.isAuth && user.user.role === "ADMIN" && adminRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component />} exact/> // exact - означає що путь повинен точно співпадати
            )}
            
            <Route
                path="*"
                element={<Navigate to={MAIN_ROUTE} replace />}
            />
        </Routes>
    );

};

export default AdminRouter;