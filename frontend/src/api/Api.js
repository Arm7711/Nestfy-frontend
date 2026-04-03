import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

class Api {
    static instance = axios.create({
        baseURL: 'http://localhost:4000/api',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });

    static isRefreshing = false;
    static refreshSubscribers = [];

    static setupInterceptors() {
        Api.instance.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;

                if (error.response.status !== 401) return Promise.reject(error);

                try {
                    const { data } = await Api.instance.post('/auth/refresh');

                    if (data.guest) {
                        return Promise.reject(error);
                    }

                    Api.instance.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                    return Api.instance(originalRequest);
                } catch (err) {
                    return Promise.reject(error);
                }
            }
        );
    }

    // ==== AUTH ====
    static async login(identifier, password) {
        return (await Api.instance.post('/auth/login', { identifier, password })).data;
    }
    static async register(email, password, username) {
        const payload = { email, password };
        if (username && username.trim()) payload.username = username;
        return (await Api.instance.post('/auth/register', payload)).data;
    }
    
    static async checkUserAuthStatus(email) {
            return await Api.instance.post('/auth/check-email', {email});
    }

}
Api.setupInterceptors();

export default Api;