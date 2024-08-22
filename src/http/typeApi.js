import { $adminHost, $host } from "./index";

export const fetchTypes = async () => {
    try {
        const response = await $host.get('api/type/fetchTypes');

        return response.data;
    } catch (error) {
        console.error("Error fetching types: ", error);
        throw error;
    }
}
export const addNewType = async (data) => {
    try {
        const response = await $adminHost.post('api/type/addNewType', {
            name: data.name,
            subCategories: data.subCategories || []
        });
        
        return response;
    } catch (error) {
        console.error("Error addNewType: ", error.message);
        throw error;
    }
}
export const deleteType = async (id) => {
    try {
        const response = await $adminHost.delete('api/type/deleteType/' + id);
        return response;
    } catch (error) {
        console.error("Error deleteType: ", error.message);
        throw error;
    }
}
export const updateType = async (id, data) => {
    try {
        const response = await $adminHost.put(`api/type/updateType/${id}`, {
            name: data.name,
            subCategories: data.subCategories || []
        });

        return response;
    } catch (error) {
        console.error("Error updateType: ", error.message);
        throw error;
    }
}

export const getCategoryTypes = async (categoryData) => {
    try {
        const response = await $host.post('api/type/getCategoryTypes', {categoryData: categoryData});

        return response.data;
    } catch (error) {
        console.error("Error updateType: ", error.message);
        throw error;
    }
}

