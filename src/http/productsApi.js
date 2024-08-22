import { $host } from "./index";

export const fetchProducts = async ({userId, name, page, selectedBrands, filters}) => {
    try {
        const response = await $host.post('api/products/fetchProductsData', {userId, name, page, brandsRequest: selectedBrands, filters});

        return response.data;
    } catch (error) {
        console.error("Error fetching products: ", error);
        throw error;
    }
}