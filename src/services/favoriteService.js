import axios from 'axios';
import { getToken } from './userService';

const api = axios.create({
    baseURL: 'https://v1.slashapi.com/viet8/mongodb/s4YAwvhEaT',
    withCredentials: false,
});

api.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const fetchFavorites = async (userId) => {
    try {
        const response = await api.get(`/favorites?q={"userId":"${userId}"}`);
        const { data } = response.data

        return data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Unauthorized error handling
            throw new Error('Unauthorized. Please log in again.');
        }
        return [];
    }
};

export const getFavoritesDetail = async (bookId) => {
    try {
        const response = await api.get(`/favorites?q={"bookId":"${bookId}"}`);
        const { data } = response.data;
        return {
            data
        }
    } catch (error) {
        return error
    }
}

export const addBookToFavorites = async (userId, bookId) => {
    const params = {
        data: {
            userId,
            bookId,
        }
    };
    try {
        const response = await api.post('/favorites', params);
        const { data } = response.data
        return data
    } catch (error) {
        return error
    }
};

export const deleteFavorite = async (favoriteId) => {
    try {
        const response = await api.delete(`/favorites/${favoriteId}`);
        const { data } = response.data;
        return data
    } catch (error) {
        return error;
    }
}
