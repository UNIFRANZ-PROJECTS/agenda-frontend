import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables()

const cafeApi = axios.create({
    baseURL: `${VITE_API_URL}/api`
});

// Todo: configurar interceptores
cafeApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : localStorage.getItem('tokenStudent')}`
    }

    return config;
})


export default cafeApi;



