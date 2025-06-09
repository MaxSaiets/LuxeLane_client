import { $authHost } from "./index";

export const addRecentlyViewedItem = async ({productId}) => {
    try {
        const response = await $authHost.post('api/recentlyViewed/addRecentlyViewedItem', {
            productId: productId
        });

        return response.data;
    } catch (error) {
        console.error("Error adding recently viewed product: ", error.message);
        throw error;
    }
}

export const fetchRecentlyViewedProducts = async ({ productDataCount = 20, fetchAllProducts = false }) => {
    try {
        const response = await $authHost.get(`api/recentlyViewed/fetchUsersRecentlyViewed`, {
            params: { productDataCount, fetchAllProducts }
        });

        return response.data.recentlyViewedList;
    } catch (error) {
        console.error("Error fetching recently viewed products: ", error.message);
        throw error;
    }
};

export const removeRecentlyViewedProduct = async ({productId}) => {
    try {
        const response = await $authHost.delete('api/recentlyViewed/deleteRecentlyViewedItem', {
            productId: productId
        });
        
        return response.data;
    } catch (error) {
        console.error("Error removing recently viewed product: ", error.message);
        throw error;
    }
}

export const removeRecentlyViewedList = async () => {
    try {
        const response = await $authHost.post(`api/recentlyViewed/deleteRecentlyViewedList`);
        return response.data;
    } catch (error) {
        console.error("Error removing recently viewed product: ", error.message);
        throw error;
    }
}