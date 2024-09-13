import { $authHost } from "./index";

export const fetchUserFavorites = async () => {
    try {
        const response = await $authHost.get('/api/favorites/fetchUserFavorites');
        return response.data.favorite_items;
    } catch (error) {
        console.error('Error fetching user favorites:', error);
        throw error;
    } 
}

export const addToFavorites = async ( productId ) => {
    try {
        const response = await $authHost.post('/api/favorites/addFavoriteItem',
            {
                productId: productId
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding to favorites:', error);
        throw error;
    }
}
export const removeFromFavorites = async ( productId ) => {
    try {
        const response = await $authHost.delete(`/api/favorites/deleteFavoriteItem`,
            {
                params: {
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

export const removeFavoriteList = async () => {
    try {
        const response = await $authHost.delete(`/api/favorites/removeFavoriteList`);

        return response.data;
    } catch (error) {
        console.error('Error removing from favorites:', error);
        throw error;
    }
}