import axios from 'axios';
import store from '../redux/store';
import { setAuth, setToken, setGuest } from "../redux/reducers/authReducer";

let accessToken = null;
let authInitialized = false;

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

    static refreshPromise = null;

    static refreshApi = axios.create({
        baseURL: 'http://localhost:4000/api',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });

    static setupInterceptors() {
        Api.instance.interceptors.request.use((config) => {
            const token = getAccessToken();
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        Api.instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status !== 401) return Promise.reject(error);
                if (!originalRequest || originalRequest._retry) return Promise.reject(error);
                if (originalRequest.url?.includes('/auth/refresh')) {
                    setAccessToken(null);
                    store.dispatch(setGuest());
                    return Promise.reject(error);
                }

                originalRequest._retry = true;

                try {
                    const token = await Api.getFreshAccessToken();
                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return Api.instance(originalRequest);
                } catch (err) {
                    setAccessToken(null);
                    store.dispatch(setGuest());
                    return Promise.reject(err);
                }
            }
        );
    }

    static getFreshAccessToken() {
        if (this.refreshPromise) return this.refreshPromise;

        this.refreshPromise = this.refreshApi
            .post('/auth/refresh')
            .then(({ data }) => {
                setAccessToken(data.accessToken);
                store.dispatch(setToken(data.accessToken));
                return data.accessToken;
            })
            .finally(() => {
                this.refreshPromise = null;
            });

        return this.refreshPromise;
    }

    static async initAuth() {
        if (authInitialized) return false;
        authInitialized = true;

        try {
            const accessToken = await Api.getFreshAccessToken();
            const { data: meData } = await Api.instance.get('/auth/me');
            store.dispatch(setAuth({ user: meData.user, accessToken }));
            return true;
        } catch {
            authInitialized = false;
            setAccessToken(null);
            store.dispatch(setGuest());
            return false;
        }
    }

    static async getUserSettings() {
        const { data } = await Api.instance.get('/settings/profile');
        return data;
    }

    static async editUserSettings(body) {
        const { data } = await Api.instance.put('/settings/profile', { ...body });
        return data;
    }

    static async updateAvatar(file) {
        const formData = new FormData();
        formData.append('avatar', file);

        const { data } = await Api.instance.patch('/settings/profile/avatar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data.data;
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