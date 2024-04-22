import { $host } from "./index";

export const fetchProducts = async ({name, page, selectedBrands, filters}) => {
    console.log("fetchProducts: ", name, page, selectedBrands, filters);
    try {
        const response = await $host.post('api/products/fetchProductsData', {name, page, brandsRequest: selectedBrands, filters});

        return response.data;
    } catch (error) {
        console.error("Error fetching products: ", error);
        throw error;
    }
}