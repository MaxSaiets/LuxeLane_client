import { $adminHost, $host } from "./index";

export const fetchProducts = async () => {
    try {
        const response = await $host.get('api/products/fetchProducts');

        return response.data;
    } catch (error) {
        console.error("Error fetching products: ", error);
        throw error;
    }
}

export const addNewProduct = async (formData) => {
    try {
        const response = await $adminHost.post('api/products/addNewProduct', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error addNewProduct: ", error.message);
        throw error;
    }
}
export const updateProduct = async (id, formData) => {
    try {
        const response = await $adminHost.put(`api/products/updateProduct/${id}`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
        });
        return response;

    } catch (error) {
        console.error("Error updateProduct: ", error.message);
        throw error;
    }
}
export const deleteProduct = async (id) => {
    try {
        const response = await $adminHost.delete('api/products/deleteProduct/' + id);
        return response;
    } catch (error) {
        console.error("Error deleteProduct: ", error.message);
        throw error;
    }
}

export const getProductsIcons = async () => {
    try {
        const response = await $adminHost.get('api/products/getProductsIcons');
        console.log("GET ICONS", response)
        return response;
    } catch (error) {
        console.error("Error getProductsIcons: ", error.message);
        throw error;
    }
}

export const getProductsNameId = async () => {
    try {
        const response = await $adminHost.get('api/products/getProductsNameId');

        return response;
    } catch (error) {
        console.error("Error getProductsNameId: ", error.message);
        throw error;
    }
}