import { $host, $authHost } from "./index";
import jwt_decode from "jwt-decode";

export const getOrsaveUserInDatabase = async (email, token, userData) => {
    const {data} = await $host.post('api/user/getOrsaveNewUserInDatabase', {email, token, userData})

    return data;
}
export const getUserFromDatabase = async () => {
    const {data} = await $authHost.post('api/user/getUserFromDatabase')
    
    return data;
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
