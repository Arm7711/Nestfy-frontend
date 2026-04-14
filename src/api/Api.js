import axios from 'axios';
import store from '../redux/store';
import { setAuth, setToken, setGuest } from "../redux/reducers/authReducer";

let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
};

export const getAccessToken = () => accessToken;

class Api {
    static instance = axios.create({
        baseURL: 'http://localhost:4000/api',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });

    static isRefreshing = false;
    static subscribers = [];

    static setupInterceptors() {
        Api.instance.interceptors.request.use((config) => {
            const token = getAccessToken();
            if (token) config.headers.Authorization = `Bearer ${token}`;
            return config;
        });

        Api.instance.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;

                if (error.response?.status !== 401) return Promise.reject(error);
                if (originalRequest._retry) return Promise.reject(error);

                if (originalRequest.url?.includes('/auth/refresh')) {
                    store.dispatch(setGuest());
                    return Promise.reject(error);
                }

                originalRequest._retry = true;

                if (Api.isRefreshing) {
                    return new Promise((resolve) => {
                        Api.subscribers.push((newToken) => {
                            originalRequest.headers.Authorization = `Bearer ${newToken}`;
                            resolve(Api.instance(originalRequest));
                        });
                    });
                }

                Api.isRefreshing = true;

                try {
                    const { data } = await Api.instance.post('/auth/refresh');

                    setAccessToken(data.accessToken);
                    store.dispatch(setToken(data.accessToken));

                    Api.subscribers.forEach(cb => cb(data.accessToken));
                    Api.subscribers = [];
                    Api.isRefreshing = false;

                    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                    return Api.instance(originalRequest);

                } catch (err) {
                    Api.isRefreshing = false;
                    setAccessToken(null);
                    store.dispatch(setGuest());
                    return Promise.reject(err);
                }
            }
        );
    }

    static async initAuth() {
        try {
            const { data } = await Api.instance.post('/auth/refresh');
            setAccessToken(data.accessToken);

            const { data: meData } = await Api.instance.get('/auth/me');
            store.dispatch(setAuth({ user: meData.user, accessToken: data.accessToken }));

            return true;
        } catch {
            setAccessToken(null);
            store.dispatch(setGuest());
            return false;
        }
    }

    static async logout() {
        await Api.instance.post('/auth/logout');
        setAccessToken(null);
        store.dispatch(setGuest());
    }

    static async authUser(email, code, flow) {
        return (await Api.instance.post(`/auth/${flow}`, { email, code })).data;
    }

    static async userVerfiyAuth(email, code) {
        return Api.instance.post('/auth/verify-code', { email, code });
    }

    static async checkUserAuthStatus(email) {
        return Api.instance.post('/auth/check-email', { email });
    }

    static async loginWithGoogle(credential) {
        return Api.instance.post('/auth/google', { credential });
    }

    static async loginWithApple(identityToken, user) {
        return Api.instance.post('/auth/apple', { identityToken, user });
    }
}

Api.setupInterceptors();

export default Api;