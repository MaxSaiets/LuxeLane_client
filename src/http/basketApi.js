import { $authHost } from "./index";

export const addProductToBasket = async (productId, quantity=1) => {
    try {
        const response = await $authHost.post('api/basket/addItemToBasket',
            {
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

export const fetchBasket = async () => {
    try {
        const response = await $authHost.get(`api/basket/fetchUserBasket`);

        return response.data.basket_items;
    } catch (error) {
        console.error("Error fetching basket products: ", error.message);
        throw error;
    }
}

export const removeProductFromBasket = async (productId) => {
    try {
        const response = await $authHost.delete('api/basket/deleteBasketItem',
            {
                params: {
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

export const updateProductQuantityInBasket = async (productId, quantity) => {
    try {
        const response = await $authHost.put('api/basket/updateQuantityItemInBasket', {
            productId: productId,
            quantity: Number(quantity)
        });

        return response.data;
    } catch (error) {
        console.error("Error updating product quantity in basket: ", error.message);
        throw error;
    }
}