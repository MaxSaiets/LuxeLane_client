import { $authHost } from "./index";

export const fetchUserFavorites = async (userId) => {
    try {
        const response = await $authHost.get(`/api/favorites/fetchUserFavorites/${userId}`);
        return response.data.favorite_items;
    } catch (error) {
        console.error('Error fetching user favorites:', error);
        throw error;
    } 
}

export const addToFavorites = async (userId, productId) => {
    try {
        const response = await $authHost.post('/api/favorites/addFavoriteItem',
            {
                userId: userId,
                productId: productId
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding to favorites:', error);
        throw error;
    }
}
export const removeFromFavorites = async (userId, productId) => {
    try {
        const response = await $authHost.delete(`/api/favorites/deleteFavoriteItem`,
            {
                params: {
                    userId: userId,
                    productId: productId
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error removing from favorites:', error);
        throw error;
    }
}

export const removeFavoriteList = async (userId) => {
    try {
        const response = await $authHost.delete(`/api/favorites/removeFavoriteList`,
            {
                params: {
                    userId: userId,
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error removing from favorites:', error);
        throw error;
    }
}