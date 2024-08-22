import { $authHost } from "./index";

export const addProductToBasket = async (userId, productId, quantity=1) => {
    try {
        const response = await $authHost.post('api/basket/addItemToBasket',
            {
                userId: userId,
                productId: productId,
                quantity: Number(quantity),
            }
        ); 
        return response.data;
    } catch (error) {
        console.error("Error adding product to basket: ", error.message);
        throw error;
    }
}

export const fetchBasket = async (userId) => {
    try {
        const response = await $authHost.get(`api/basket/fetchUserBasket/${userId}`);

        return response.data.basket_items;
    } catch (error) {
        console.error("Error fetching basket products: ", error.message);
        throw error;
    }
}

export const removeProductFromBasket = async (userId, productId) => {
    try {
        const response = await $authHost.delete('api/basket/deleteBasketItem',
            {
                params: {
                    userId: userId,
                    productId: productId,
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error removing product from basket: ", error.message);
        throw error;
    }
}

export const updateProductQuantityInBasket = async (userId, productId, quantity) => {
    try {
        const response = await $authHost.put('api/basket/updateQuantityItemInBasket', {
            userId: userId,
            productId: productId,
            quantity: Number(quantity)
        });

        return response.data;
    } catch (error) {
        console.error("Error updating product quantity in basket: ", error.message);
        throw error;
    }
}