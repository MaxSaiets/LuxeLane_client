import { $host, $authHost } from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}
// отримання типів
export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}


export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}
// отримання брендів
export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}


export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}
// отримання девайсів
export const fetchDevices = async (typeId, brandId, page, limit=5) => {
    const {data} = await $host.get('api/device', {params: {
        typeId, brandId, page, limit
    }})
    return data
}
// отримання конкретного девайса
export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    // const { data } = await $host.get(`api/device/${id}`);

    return data
}