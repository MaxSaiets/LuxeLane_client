import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { adminRoutes } from "../../routes";
import { MAIN_ROUTE } from "../../utils/consts";
import { RootStoreContext } from "../../store/RootStoreProvider";

import { CircularProgress, Grid } from "@mui/material";

const AdminRouter = () => {
    const { userStore } = useContext(RootStoreContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(userStore.isAuth) {
            setIsLoading(false)
        }
    }, [userStore.isAuth]);

    if (isLoading) {

        return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
            <CircularProgress />
        </Grid>
        );
    }

    return (
        <Routes> 
            
            { userStore.isAuth && userStore.user.role === "ADMIN" && adminRoutes.map(({path, Component}) => 
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