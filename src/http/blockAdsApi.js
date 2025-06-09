import { $host } from "./index";

export const fetchProductsForAdsBlock = async ({itemsCount}) => {
    try {
        const response = await $host.get('api/productsAds/fetchProductsForAdsBlock', {
            params: {
                itemsCount
            }
        });
        return response.data.products;
    } catch (error) {
        console.error("Error fetching fetchProductsForAdsBlock products: ", error.message);
        throw error;
    }
}