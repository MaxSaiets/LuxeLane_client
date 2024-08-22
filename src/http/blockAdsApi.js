import { $host } from "./index";

export const fetchProductsForAdsBlock = async ({userId, itemsCount}) => {
    try {
        const response = await $host.get('api/productsAds/fetchProductsForAdsBlock', {
            params: {
                userId,
                itemsCount
            }
        });
        return response.data.products;
    } catch (error) {
        console.error("Error fetching basket products: ", error.message);
        throw error;
    }
}