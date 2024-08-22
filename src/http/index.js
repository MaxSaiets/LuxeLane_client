import axios from "axios"; // для виконання http запросов з браузера або з node.js

// для обичних запросов яким не треба авторизаціх
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// автоматично буде підставляться header autorization і туди буде добавляться токен
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// параметром приймає config щоб витягнути token
// при авторизації token помещається в localStorage
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

// буде отрабатавать при кожному запросе і підставляти token
$authHost.interceptors.request.use(authInterceptor)


const $adminHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
// параметром приймає config щоб витягнути token
// при авторизації token помещається в localStorage
const adminInterceptor = config => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Припустимо, що роль користувача зберігається в localStorage

    if (userRole !== 'ADMIN') {
        throw new Error('Unauthorized: Only admins can make this request');
    }

    config.headers.authorization = `Bearer ${token}`
    return config
}

// буде отрабатавать при кожному запросе і підставляти token
$adminHost.interceptors.request.use(adminInterceptor)

export{
    $host,
    $authHost,
    $adminHost
}