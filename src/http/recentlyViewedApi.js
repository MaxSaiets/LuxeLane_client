import { $authHost } from "./index";

export const addRecentlyViewedItem = async ({userId, productId}) => {
    try {
        const response = await $authHost.post('api/recentlyViewed/addRecentlyViewedItem', {
            userId: userId,
            productId: productId
        });
        return response.data;
    } catch (error) {
        console.error("Error adding recently viewed product: ", error.message);
        throw error;
    }
}

export const fetchRecentlyViewedProducts = async ({userId, allInformation}) => {
    try {
        const response = await $authHost.get(`api/recentlyViewed/fetchUsersRecentlyViewed/${userId}`, {
            params: { allInformation }
        });

        return response.data.recentlyViewedList;
    } catch (error) {
        console.error("Error fetching recently viewed products: ", error.message);
        throw error;
    }
}

export const removeRecentlyViewedProduct = async ({userId, productId}) => {
    try {
        const response = await $authHost.delete('api/recentlyViewed/deleteRecentlyViewedItem', {
            userId: userId,
            productId: productId
        });
        return response.data;
    } catch (error) {
        console.error("Error removing recently viewed product: ", error.message);
        throw error;
    }
}

export const removeRecentlyViewedList = async ({userId}) => {
    try {
        const response = await $authHost.post(`api/recentlyViewed/deleteRecentlyViewedList/${userId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error removing recently viewed product: ", error.message);
        throw error;
    }
}