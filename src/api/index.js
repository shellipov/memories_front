import axios from "axios";

// let config = {
//   headers: {
//     'Permissions-Policy': 'interest-cohort=()',
//   }
// }

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    config.headers['Permissions-Policy'] = 'interest-cohort=()'
    return config
}

const interceptor = config => {
    config.headers['Permissions-Policy'] = 'interest-cohort=()'
    return config
}

$authHost.interceptors.request.use(authInterceptor)
$host.interceptors.request.use(interceptor)

export {
    $host,
    $authHost
}
