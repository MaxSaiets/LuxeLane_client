import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "../../routes";
import { MAIN_ROUTE } from "../../utils/consts";
import { UserStoreContext } from "../..";

const AppRouter = () => {
    const user = useContext(UserStoreContext)

    return (
        // вказуєм кількі маршрутів і якщо жоден з їх не відробив то відпрацює самий останій, який вказоний в цьому Switch
        <Routes> 
            {user.isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component />} exact/> // exact - означає що путь повинен точно співпадати
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component />} exact/> // exact - означає що путь повинен точно співпадати
            )}

            <Route
                path="*"
                element={<Navigate to={MAIN_ROUTE} replace />}
            />
        </Routes>
    );
};

export default AppRouter;