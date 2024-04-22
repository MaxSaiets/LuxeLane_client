import { $adminHost, $host } from "./index";

export const fetchBrands = async () => {
    try {
        const response = await $host.get('api/brand/fetchBrands');

        return response.data;
    } catch (error) {
        console.error("Error fetching brands: ", error);
        throw error;
    }
}
export const addNewBrand = async (name) => {
    try {
        const response = await $adminHost.post('api/brand/addNewBrand', name);
        return response;

    } catch (error) {
        console.error("Error addNewBrand: ", error.message);
        throw error;
    }
}
export const deleteBrand = async (id) => {
    try {
        const response = await $adminHost.delete('api/brand/deleteBrand/' + id);
        return response;
    } catch (error) {
        console.error("Error deleteBrand: ", error.message);
        throw error;
    }
}
export const updateBrand = async (data) => {
    try {
        const response = await $adminHost.put('api/brand/updateBrand/' + data.id, {name: data.name});
        return response;
    } catch (error) {
        console.error("Error updateBrand: ", error.message);
        throw error;
    }
}