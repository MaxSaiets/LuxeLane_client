import { $adminHost, $host } from "./index";

export const updateCategory = async (id, data) => {
    try {
        const response = await $adminHost.put(`api/categories/updateCategory/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating category: ", error);
        throw error;
    }
}

export const fetchCategoriesData = async () => {
    try {
        const response = await $host.get('api/categories/categoriesData');
        return response.data;
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw error;
    }
}

export const addNewCategory = async (data) => {

    try {
        const response = await $adminHost.post('api/categories/addCategory', data);

        return response;

    } catch (error) {
        console.error("Error addNewCategory: ", error.message);
        throw error;
    }
}

export const deleteImgCategory = async (id) => {
    try {
        const response = await $adminHost.delete('api/categories/deleteImgCategory/' + id);
        return response;
    } catch (error) {
        console.error("Error deleteCategory: ", error.message);
        throw error;
    }
}
export const deleteCategory = async (id) => {
    try {
        const response = await $adminHost.delete('api/categories/deleteCategory/' + id);
        return response;
    } catch (error) {
        console.error("Error deleteCategory: ", error.message);
        throw error;
    }
}

export const getCategoriesIcons = async () => {
    try {
        const response = await $adminHost.get('api/categories/getCategoriesIcons');
        console.log("GET ICONS", response.data)
        return response.data;
    } catch (error) {
        console.error("Error addNewCategory: ", error.message);
        throw error;
    }
}
export const getCategoriesNameId = async () => {
    try {
        const response = await $adminHost.get('api/categories/getCategoriesNameId');

        return response;
    } catch (error) {
        console.error("Error addNewCategory: ", error.message);
        throw error;
    }
}