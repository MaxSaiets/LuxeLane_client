// всі маршрути до конктретних сторінок на сайті

import Basket from "./pages/Basket"
import UserFavorites from "./pages/UserFavorites"
import Main from "./pages/Main"
import Auth from "./pages/Auth"
import DevicePage from "./pages/UserFavorites"
import UserProfile from "./pages/UserProfile"

import AdminPanel from "./pages/AdminPanel"
import AdminMainContent from "./components/AdminContent/AdminContent"

import AllUsersInfo from "./components/AdminContent/AllUsersInfo/AllUsersInfo"
import CatagoriesInfo from "./components/AdminContent/CategoriesInfo/CategoriesInfo"

import ProductsInfo from "./components/AdminContent/ProductsInfo/ProductsInfo"
import BrandsInfo from "./components/AdminContent/BrandsInfo/BrandsInfo"
import TypesInfo from "./components/AdminContent/TypesInfo/TypesInfo"

import CategoryExplorer from "./pages/CategoryExplorer"
import ProductsListPage from "./pages/ProductsListPage"

import ProductPage from "./pages/ProductPage"

import Page404 from "./pages/Page404"


import { 
    ADMIN_ROUTE,
    ADMIN_MAIN_ROUTE,
    ADMIN_ALLUSERS_ROUTE,
    BASKET_ROUTE,
    USERFAVORITES_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    MAIN_ROUTE,
    USERPROFILE_ROUTE,
    ADMIN_CATEGORIES_ROUTE,
    ADMIN_BRANDS_ROUTE,
    ADMIN_TYPES_ROUTE,
    ADMIN_PRODUCTS_ROUTE,
    CATEGORYEXPLORER_ROUTE,
    PAGE404_ROUTE,
    PRODUCTSLISTPAGE_ROUTE,
    PRODUCT_ROUTE,
} from "./utils/consts"

export const authRoutes = [ // маршрути до яких має доступ авторизований користувач
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: USERFAVORITES_ROUTE,
        Component: UserFavorites
    },
    {
        path: USERPROFILE_ROUTE,
        Component: UserProfile
    }
]
export const publicRoutes = [ // бублічні маршрути
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,  
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: CATEGORYEXPLORER_ROUTE(':categoryName'),
        Component: CategoryExplorer
    },
    {
        path: PRODUCTSLISTPAGE_ROUTE(':name'),
        Component: ProductsListPage
    },
    {
        path: PRODUCT_ROUTE(':id'),
        Component: ProductPage
    },
    {
        path: PAGE404_ROUTE,
        Component: Page404
    },
]
export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPanel
    },
    {
        path: ADMIN_MAIN_ROUTE,  
        Component: AdminMainContent
    },
    {
        path: ADMIN_ALLUSERS_ROUTE,  
        Component: AllUsersInfo
    },
    {
        path: ADMIN_CATEGORIES_ROUTE,  
        Component: CatagoriesInfo
    },
    {
        path: ADMIN_BRANDS_ROUTE,  
        Component: BrandsInfo
    },
    {
        path: ADMIN_TYPES_ROUTE,  
        Component: TypesInfo
    },
    {
        path: ADMIN_PRODUCTS_ROUTE,  
        Component: ProductsInfo
    },
]
