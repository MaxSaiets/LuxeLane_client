import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const optionalAuthInterceptor = config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
}
$host.interceptors.request.use(optionalAuthInterceptor);

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
// параметром приймає config щоб витягнути token
// при авторизації token в localStorage
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

const $adminHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// параметром приймає config щоб витягнути token
// при авторизації token в localStorage
const adminInterceptor = config => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (userRole !== 'ADMIN') {
        throw new Error('Unauthorized: Only admins can make this request');
    }

    config.headers.authorization = `Bearer ${token}`
    return config
}

$adminHost.interceptors.request.use(adminInterceptor)

export{
    $host,
    $authHost,
    $adminHost
}