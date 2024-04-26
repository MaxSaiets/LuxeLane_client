import { $adminHost, $host } from "./index";

export const fetchSubCategories = async () => {
    try {
        const response = await $host.get('api/subCategories/subCategories');

        return response.data;
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw error;
    }
}


export const addNewSubCategory = async (data) => {
    
    try {
        const response = await $adminHost.post('api/subCategories/addSubCategories', data);

        return response;

    } catch (error) {
        console.error("Error addNewSubCategory: ", error.message);
        throw error;
    }
}

export const deleteSubCategory = async (id) => {
    try {
        const response = await $adminHost.delete('api/subCategories/deleteSubCategory/' + id);
       
        return response;
    } catch (error) {
        console.error("Error deleteCategory: ", error.message);
        throw error;
    }
}

export const getSubCategoriesIcons = async () => {
    try {
        const response = await $adminHost.get('api/subCategories/getSubCategoriesIcons');
        
        return response.data;
    } catch (error) {
        console.error("Error addNewCategory: ", error.message);
        throw error;
    }
}

export const deleteImgSubCategory = async (id) => {
    try {
        const response = await $adminHost.delete('api/subCategories/deleteImgSubCategory/' + id);
        return response;
    } catch (error) {
        console.error("Error deleteCategory: ", error.message);
        throw error;
    }
}

export const updateSubCategory = async (id, data) => {
    try {
        const response = await $adminHost.put(`api/subCategories/updateSubCategory/${id}`, data);
        
        return response.data;
    } catch (error) {
        console.error("Error updating category: ", error);
        throw error;
    }
}