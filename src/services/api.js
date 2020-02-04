import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://192.168.1.101:3333'
    baseURL: 'https://tindev-app-backend.herokuapp.com'
});

export default api;