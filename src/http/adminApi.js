import { $adminHost } from "./index";

export const updateUsersInDB = async (updatedData, id) => {

    const {data} = await $adminHost.put('api/usersInfo/updateUser/' + id, updatedData)
    return data
}
export const createUsersInDB = async (updatedData) => {
    
    const {data} = await $adminHost.post('api/usersInfo/createNewUser', updatedData)
    return data
}
export const deleteUsersInDB = async (id) => {

    const {data} = await $adminHost.delete('api/usersInfo/deleteUser/' + id)
    console.log("data", data)
    return data
}