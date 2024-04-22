import { $adminHost, $host } from "./index";

export const fetchCategories = async () => {
    try {
        const response = await $host.get('api/categories/categories');

        return response.data;
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw error;
    }
}

export const addNewCategory = async (formData) => {
    
    try {
        const response = await $adminHost.post('api/upload/category', formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
        });
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
        console.log("GET ICONS", response)
        return response;
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