import { $adminHost } from "./index";

export const fetchAllUsers = async () => {
    try {
        const response = await $adminHost.get('api/usersInfo/allUsers');
        return response.data;
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw error;
    }
}